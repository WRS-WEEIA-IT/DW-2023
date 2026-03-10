import { useRef, useState } from 'react';
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseConfig';
import { useAuth } from '../../contexts/AuthContext';
import { GAME_RANKING_PATH, HOME_PATH } from '../../constants/RouterConstants';
import './GamePage.scss';

interface KnownCode {
  code: string;
  points: number;
  hasQuestions: boolean;
  questions: string[] | null;
  answers: string[] | null;
}

interface UsedCodesRow {
  usedCode: string[];
  points: number | null;
}

interface PendingQuestion {
  userId: string;
  code: string;
  points: number;
  expectedAnswer: string;
}

type ModalType = 'notFound' | 'points' | 'question' | 'alreadyUsed' | 'wrongAnswer' | null;

const GamePage = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [points, setPoints] = useState<number | null>(null);
  const [question, setQuestion] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [answerError, setAnswerError] = useState<string | null>(null);
  const [pendingQuestion, setPendingQuestion] = useState<PendingQuestion | null>(null);
  const [loading, setLoading] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const getRandomQuestionIndex = (questions: string[]): number => {
    return Math.floor(Math.random() * questions.length);
  };

  const normalizeAnswer = (value: string): string => {
    return value
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const saveUsedCodeForUser = async (
    userId: string,
    userData: UsedCodesRow | null,
    code: string,
    pointsToAdd: number
  ): Promise<boolean> => {
    console.log('[saveUsedCodeForUser] Parametry:', { userId, userData, code, pointsToAdd });

    if (userData) {
      const updatedCodes = [...(userData.usedCode || []), code];
      const updatedPoints = (userData.points || 0) + pointsToAdd;

      console.log('[saveUsedCodeForUser] UPDATE - updatedCodes:', updatedCodes, 'updatedPoints:', updatedPoints);

      const { error: updateError, data: updateData } = await supabase
        .from('used_codes')
        .update({
          usedCode: updatedCodes,
          points: updatedPoints
        })
        .eq('userID', userId);

      console.log('[saveUsedCodeForUser] UPDATE result - error:', updateError, 'data:', updateData);

      if (updateError) {
        console.error('Blad aktualizacji punktow:', updateError);
        return false;
      }

      return true;
    }

    console.log('[saveUsedCodeForUser] INSERT - userId:', userId, 'code:', code, 'points:', pointsToAdd);

    const { error: insertError, data: insertData } = await supabase
      .from('used_codes')
      .insert({
        userID: userId,
        usedCode: [code],
        points: pointsToAdd
      });

    console.log('[saveUsedCodeForUser] INSERT result - error:', insertError, 'data:', insertData);

    if (insertError) {
      console.error('Blad dodawania punktow:', insertError);
      return false;
    }

    return true;
  };

  const playScanBeep = async () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      const ctx = audioContextRef.current;

      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const now = ctx.currentTime;

      const createCheckoutBeep = (startAt: number, duration: number, volume: number) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        // Brzmienie zbliżone do skanera przy kasie: jasne i krótkie.
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(2350, startAt);
        oscillator.frequency.exponentialRampToValueAtTime(2050, startAt + duration);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2200, startAt);
        filter.Q.setValueAtTime(2.8, startAt);

        gainNode.gain.setValueAtTime(0.0001, startAt);
        gainNode.gain.exponentialRampToValueAtTime(volume, startAt + 0.004);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start(startAt);
        oscillator.stop(startAt + duration);
      };

      // Charakterystyczny podwójny "beep-beep" jak przy skanowaniu produktu.
      createCheckoutBeep(now, 0.055, 0.22);
      createCheckoutBeep(now + 0.085, 0.05, 0.17);
    } catch (error) {
      console.warn('Nie udało się odtworzyć dźwięku skanowania:', error);
    }
  };

  const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0 && detectedCodes[0]) {
      const code = detectedCodes[0].rawValue;
      void playScanBeep();
      setIsScanning(false);
      setLoading(true);

      try {
        // Krok 1: Sprawdź czy kod istnieje w known_codes
        console.log('Zeskanowany kod:', code);
        console.log('Długość kodu:', code.length);
        
        const { data, error } = await supabase
          .from('known_codes')
          .select('code, points, hasQuestions, questions, answers')
          .eq('code', code)
          .maybeSingle();

        console.log('Zapytanie known_codes - error:', error);
        console.log('Zapytanie known_codes - data:', data);

        if (error || !data) {
          console.error('Kod nie znaleziony w bazie. Error:', error, 'Data:', data);
          setModalType('notFound');
        } else {
          const knownCode = data as KnownCode;
          const userId = session?.user?.id;

          if (!userId) {
            console.error('Brak użytkownika');
            setModalType('notFound');
            return;
          }

          // Krok 2: Pobierz dane tego użytkownika z used_codes
          const { data: userData, error: userError } = await supabase
            .from('used_codes')
            .select('usedCode, points')
            .eq('userID', userId)
            .maybeSingle();

          if (userError && userError.code !== 'PGRST116') {
            console.error('Błąd pobierania danych użytkownika:', userError);
            setModalType('notFound');
            return;
          }

          // Krok 3: Sprawdź czy TEN użytkownik już zeskanował ten kod
          const userAlreadyScannedThisCode = userData?.usedCode?.includes(code);

          if (userAlreadyScannedThisCode) {
            // Ten użytkownik już ten kod zeskanował
            setModalType('alreadyUsed');
          } else {
            // Krok 4: Dla kodów z pytaniem przyznaj punkty dopiero po poprawnej odpowiedzi.
            if (knownCode.hasQuestions && knownCode.questions && knownCode.questions.length > 0) {
              const randomIndex = getRandomQuestionIndex(knownCode.questions);
              const randomQuestion = knownCode.questions[randomIndex] || '';
              const expectedAnswer = knownCode.answers?.[randomIndex] || '';

              if (!randomQuestion || !expectedAnswer) {
                console.error('Brak pary pytanie/odpowiedz dla kodu:', knownCode.code);
                setModalType('notFound');
                return;
              }

              setQuestion(randomQuestion);
              setPoints(knownCode.points);
              setUserAnswer('');
              setAnswerError(null);
              setPendingQuestion({
                userId,
                code,
                points: knownCode.points,
                expectedAnswer
              });
              setModalType('question');
            } else {
              const saved = await saveUsedCodeForUser(
                userId,
                (userData as UsedCodesRow | null) || null,
                code,
                knownCode.points
              );

              if (!saved) {
                setModalType('notFound');
                return;
              }

              setPoints(knownCode.points);
              setModalType('points');
            }
          }
        }
      } catch (err) {
        console.error('Błąd podczas sprawdzania kodu:', err);
        setModalType('notFound');
      } finally {
        setLoading(false);
        setShowModal(true);
      }
    }
  };

  const handleError = (error: unknown) => {
    console.error('Błąd skanera QR:', error);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setPoints(null);
    setQuestion(null);
    setUserAnswer('');
    setAnswerError(null);
    setPendingQuestion(null);
    setIsScanning(true);
  };

  const submitQuestionAnswer = async () => {
    if (!pendingQuestion) {
      return;
    }

    if (!userAnswer.trim()) {
      setAnswerError('Wpisz odpowiedz przed zatwierdzeniem.');
      return;
    }

    setAnswerError(null);
    setLoading(true);

    try {
      const isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(pendingQuestion.expectedAnswer);
      if (!isCorrect) {
        // Przy blednej odpowiedzi nie zapisujemy kodu jako zeskanowanego.
        setAnswerError('Bledna odpowiedz. Sprobuj ponownie.');
        setUserAnswer('');
        return;
      }

      // Pobierz swieze dane uzytkownika tuz przed zapisem punktow.
      const { data: freshUserData, error: freshUserError } = await supabase
        .from('used_codes')
        .select('usedCode, points')
        .eq('userID', pendingQuestion.userId)
        .maybeSingle();

      if (freshUserError && freshUserError.code !== 'PGRST116') {
        console.error('Blad pobierania swiezych danych uzytkownika:', freshUserError);
        setModalType('notFound');
        return;
      }

      const saved = await saveUsedCodeForUser(
        pendingQuestion.userId,
        (freshUserData as UsedCodesRow | null) || null,
        pendingQuestion.code,
        pendingQuestion.points
      );

      if (!saved) {
        setModalType('notFound');
        return;
      }

      setPoints(pendingQuestion.points);
      setModalType('points');

      setPendingQuestion(null);
      setUserAnswer('');
    } catch (error) {
      console.error('Blad podczas sprawdzania odpowiedzi:', error);
      setModalType('notFound');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="game-page">
      <div className="scanner-header">
        <h1>Scanner</h1>
        <div className="header-buttons">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(GAME_RANKING_PATH);
            }}
            type="button"
            className="ranking-button"
            aria-label="Pokaż ranking"
            title="Ranking"
          >
            Ranking
          </button>
          <button 
            onClick={async () => {
              await signOut();
              navigate(HOME_PATH);
            }}
            type="button"
            className="user-icon"
            aria-label="Wyloguj się"
            title="Wyloguj się"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.09 15.59 11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59ZM19 3H8a2 2 0 0 0-2 2v4h2V5h11v14H8v-4H6v4a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"/>
            </svg>
          </button>
        </div>
      </div>

      {isScanning && (
        <div className="scanner-fullscreen">
          <Scanner
            onScan={handleScan}
            onError={handleError}
            components={{
              finder: true,
              torch: true,
              zoom: false,
            }}
            styles={{
              container: {
                width: '100%',
                height: '100%',
              },
              video: {
                objectFit: 'cover',
              },
            }}
          >
            <div className="scanner-outside-blur" aria-hidden="true" />
          </Scanner>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            {loading && (
              <>
                <h2>Sprawdzanie kodu...</h2>
                <div className="loading-spinner"></div>
              </>
            )}

            {!loading && modalType === 'notFound' && (
              <>
                <h2>❌ Nie znaleziono QR-kodu</h2>
                <div className="modal-data">
                  <p>Ten kod QR nie jest zarejestrowany w systemie.</p>
                </div>
              </>
            )}

            {!loading && modalType === 'alreadyUsed' && (
              <>
                <h2>⚠️ Kod już został użyty</h2>
                <div className="modal-data">
                  <p>Zeskanowałeś już ten kod QR wcześniej.</p>
                </div>
              </>
            )}

            {!loading && modalType === 'points' && (
              <>
                <h2>✅ Kod rozpoznany!</h2>
                <div className="modal-data">
                  <p className="points-text">Zdobyłeś:</p>
                  <p className="points-value">{points} {points === 1 ? 'punkt' : (points || 0) < 5 ? 'punkty' : 'punktów'}</p>
                </div>
              </>
            )}

            {!loading && modalType === 'question' && (
              <>
                <h2>❓ Pytanie bonusowe</h2>
                <div className="modal-data question-box">
                  <p>{question}</p>
                </div>
                <p className="points-info">Poprawna odpowiedz daje Ci <strong>{points} {points === 1 ? 'punkt' : (points || 0) < 5 ? 'punkty' : 'punktów'}</strong></p>

                <div className="answer-form">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Wpisz odpowiedz"
                    className="answer-input"
                  />
                  {answerError && <p className="answer-error">{answerError}</p>}
                  <button className="answer-submit" onClick={submitQuestionAnswer}>
                    Sprawdz odpowiedz
                  </button>
                </div>
              </>
            )}

            {!loading && modalType === 'wrongAnswer' && (
              <>
                <h2>❌ Niepoprawna odpowiedz</h2>
                <div className="modal-data">
                  <p>Niestety, ta odpowiedz nie zgadza sie z baza danych.</p>
                </div>
              </>
            )}

            <button className="modal-button" onClick={closeModal}>
              Skanuj ponownie
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
