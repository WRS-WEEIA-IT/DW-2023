import { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
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
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [points, setPoints] = useState<number | null>(null);
  const [question, setQuestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const getRandomQuestion = (questions: string[]): string => {
    return questions[Math.floor(Math.random() * questions.length)];
  };

  const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      const code = detectedCodes[0].rawValue;
      setScannedData(code);
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
    setScannedData(null);
    setPoints(null);
    setQuestion(null);
    setIsScanning(true);
  };

  return (
    <div className="game-page">
      <div className="game-container">
        <div className="game-header">
          <h1>Game Page</h1>
          <div className="user-info">
            <span>{session?.user?.user_metadata?.display_name || session?.user?.email}</span>
            <button 
              onClick={async () => {
                await signOut();
                navigate('/');
              }}
              className="logout-button"
            >
              Wyloguj się
            </button>
          </div>
        </div>
        <p>Witaj na stronie gry!</p>

        <div className="qr-scanner-section">
          <h2>Skaner kodów QR</h2>
          
          {isScanning && (
            <div className="scanner-container">
              <Scanner
                onScan={handleScan}
                onError={handleError}
                components={{
                  finder: true,
                  torch: true,
                  zoom: true,
                }}
              />
            </div>
          )}
        </div>

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
                    <p className="points-value">{points} {points === 1 ? 'punkt' : points < 5 ? 'punkty' : 'punktów'}</p>
                  </div>
                </>
              )}

              {!loading && modalType === 'question' && (
                <>
                  <h2>❓ Pytanie bonusowe</h2>
                  <div className="modal-data question-box">
                    <p>{question}</p>
                  </div>
                  <p className="points-info">Odpowiedź na pytanie daje Ci <strong>{points} {points === 1 ? 'punkt' : points < 5 ? 'punkty' : 'punktów'}</strong></p>
                </>
              )}

              <button className="modal-button" onClick={closeModal}>
                Skanuj ponownie
              </button>
            </div>
          </div>
        )}

        <Link to="/#game-section" className="back-button" smooth>
          ← Powrót do strony głównej
        </Link>
      </div>
    </div>
  );
};

export default GamePage;
