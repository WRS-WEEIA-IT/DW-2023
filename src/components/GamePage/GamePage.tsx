import { useRef, useState } from 'react';
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseConfig';
import { useAuth } from '../../contexts/AuthContext';
import './GamePage.scss';

interface KnownCode {
  code: string;
  points: number;
  hasQuestions: boolean;
  questions: string[] | null;
}

type ModalType = 'notFound' | 'points' | 'question' | 'alreadyUsed' | null;

const GamePage = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [points, setPoints] = useState<number | null>(null);
  const [question, setQuestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const getRandomQuestion = (questions: string[]): string => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex] || '';
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
          .select('code, points, hasQuestions, questions')
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
            // Krok 4: Ten użytkownik nie skanował jeszcze tego kodu - zapisz
            if (userData) {
              // Użytkownik już istnieje - zaktualizuj
              const updatedCodes = [...userData.usedCode, code];
              const updatedPoints = (userData.points || 0) + knownCode.points;

              const { error: updateError } = await supabase
                .from('used_codes')
                .update({
                  usedCode: updatedCodes,
                  points: updatedPoints
                })
                .eq('userID', userId);

              if (updateError) {
                console.error('Błąd aktualizacji punktów:', updateError);
                setModalType('notFound');
                return;
              }
            } else {
              // Nowy użytkownik - utwórz rekord
              const { error: insertError } = await supabase
                .from('used_codes')
                .insert({
                  userID: userId,
                  usedCode: [code],
                  points: knownCode.points
                });

              if (insertError) {
                console.error('Błąd dodawania punktów:', insertError);
                setModalType('notFound');
                return;
              }
            }

            // Krok 5: Pokaż pytanie lub punkty
            if (knownCode.hasQuestions && knownCode.questions && knownCode.questions.length > 0) {
              const randomQuestion = getRandomQuestion(knownCode.questions);
              setQuestion(randomQuestion);
              setPoints(knownCode.points);
              setModalType('question');
            } else {
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
    setIsScanning(true);
  };

  return (
    <div className="game-page">
      <div className="scanner-header">
        <h1>Scanner</h1>
        <button 
          onClick={async () => {
            await signOut();
            navigate('/');
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
          />
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
                <p className="points-info">Odpowiedź na pytanie daje Ci <strong>{points} {points === 1 ? 'punkt' : (points || 0) < 5 ? 'punkty' : 'punktów'}</strong></p>
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
