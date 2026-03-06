import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseConfig';
import './LoginPage.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        if (nickname.length > 15) {
          throw new Error('Nickname może mieć maksymalnie 15 znaków');
        }
        if (nickname.trim().length === 0) {
          throw new Error('Nickname jest wymagany');
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: nickname.trim()
            }
          }
        });
        if (error) throw error;
        
        // Automatyczne logowanie po rejestracji
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        
        navigate('/game');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/game');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Błąd podczas logowania');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <button 
          className="close-button"
          onClick={() => navigate('/')}
          title="Powrót na stronę główną"
        >
          ×
        </button>
        
        <h1>{isSignUp ? 'Rejestracja' : 'Logowanie'}</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleAuth}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twój@email.com"
              required
              disabled={loading}
            />
          </div>
          
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="nickname">Nickname (max 15 znaków)</label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value.slice(0, 15))}
                placeholder="Twój nickname"
                required
                disabled={loading}
                maxLength={15}
              />
              <small className="character-count">
                {nickname.length}/15 znaków
              </small>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="password">Hasło</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>
          
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Czekaj...' : isSignUp ? 'Zarejestruj się' : 'Zaloguj się'}
          </button>
        </form>
        
        <button 
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError(null);
            setEmail('');
            setPassword('');
            setNickname('');
          }}
          className="toggle-button"
        >
          {isSignUp ? 'Masz już konto? Zaloguj się' : 'Nie masz konta? Zarejestruj się'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
