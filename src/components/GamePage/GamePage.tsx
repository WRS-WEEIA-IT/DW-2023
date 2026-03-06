import { HashLink as Link } from 'react-router-hash-link';
import './GamePage.scss';

const GamePage = () => {
  return (
    <div className="game-page">
      <div className="game-container">
        <h1>Game Page</h1>
        <p>Witaj na stronie gry!</p>
        <Link to="/#game-section" className="back-button" smooth>
          ← Powrót do strony głównej
        </Link>
      </div>
    </div>
  );
};

export default GamePage;
