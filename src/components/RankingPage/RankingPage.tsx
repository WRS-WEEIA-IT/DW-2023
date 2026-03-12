import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseConfig';
import { useAuth } from '../../contexts/AuthContext';
import { GAME_PATH, HOME_PATH } from '../../constants/RouterConstants';
import DW_LOGO_IMG from '../../../public/images/dw_logo.png';
import './RankingPage.scss';

interface RankingUser {
  rank: number;
  name: string;
  points: number;
  medal: 'gold' | 'silver' | 'bronze' | undefined;
}

interface RankingRow {
  username: string;
  points: number;
  rank?: number;
}

const RankingPage = () => {
  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setLoading(true);

        const { data: rankingData, error: rankingError } = await supabase
          .from('ranking')
          .select('*')
          .order('points', { ascending: false })
          .limit(10);

        if (rankingError) throw rankingError;

        if (!rankingData || rankingData.length === 0) {
          setRanking([]);
          return;
        }

        const rankingList: RankingUser[] = (rankingData as RankingRow[]).map((row, index) => {
          let medal: 'gold' | 'silver' | 'bronze' | undefined;
          if (index === 0) medal = 'gold';
          else if (index === 1) medal = 'silver';
          else if (index === 2) medal = 'bronze';

          return {
            rank: row.rank ?? (index + 1),
            name: row.username || 'Nieznany użytkownik',
            points: row.points || 0,
            medal,
          };
        });

        setRanking(rankingList);
      } catch (err) {
        console.error('Błąd pobierania rankingu:', err);
        setError('Nie udało się załadować rankingu');
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div className="ranking-page">
      <div className="ranking-header">
        <button
          onClick={() => navigate(HOME_PATH)}
          type="button"
          className="ranking-logo"
          aria-label="Przejdź do strony głównej"
          title="Strona główna"
        >
          <img src={DW_LOGO_IMG} alt="DW" />
        </button>
        <h1>Ranking</h1>
        <div className="ranking-actions">
          <button
            className="back-button"
            onClick={() => navigate(GAME_PATH)}
            title="Powrót do skanera"
          >
            Powrót
          </button>
          <button
            className="logout-button"
            onClick={async () => {
              await signOut();
              navigate(HOME_PATH);
            }}
            title="Wyloguj się"
          >
            Wyloguj
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Ładowanie rankingu...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {!loading && ranking.length === 0 && !error && (
        <div className="empty-message">
          <p>Brak danych ranking. Zacznij skanować kody!</p>
        </div>
      )}

      {!loading && ranking.length > 0 && (
        <div className="ranking-container">
          <table className="ranking-table">
            <thead>
              <tr>
                <th className="rank-col">Miejsce</th>
                <th className="name-col">Nazwa użytkownika</th>
                <th className="points-col">Punkty</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((user) => (
                <tr key={`${user.rank}`} className={`ranking-row ${user.medal || ''}`}>
                  <td className="rank-col">
                    <span className="rank-number">
                      {user.medal === 'gold' && '🥇'}
                      {user.medal === 'silver' && '🥈'}
                      {user.medal === 'bronze' && '🥉'}
                      {!user.medal && `#${user.rank}`}
                    </span>
                  </td>
                  <td className="name-col">{user.name}</td>
                  <td className="points-col">{user.points} pkt</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RankingPage;
