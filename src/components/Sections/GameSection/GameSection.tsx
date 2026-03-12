import { Link } from 'react-router-dom';
import { GAME_PATH } from '../../../constants/RouterConstants';
import './GameSection.scss';

const GameSection = () => {
  return (
    <section id="game-section" className="game-section">
      <div className="game-section__container">
        <div className="game-section__content">
          <h2 className="game-section__title">Gra terenowa</h2>
          <p className="game-section__description">
            Przejdź na stronę gry terenowej, skanuj QR-kody i zgarniaj nagrody!
          </p>
          <Link to={GAME_PATH} className="game-section__button">
            <span className="game-section__button-text">Rozpocznij grę</span>
            <span className="game-section__button-icon">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GameSection;
