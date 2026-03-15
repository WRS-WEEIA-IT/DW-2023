import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GAME_PATH } from '../../../constants/RouterConstants';
import { LanguageModeContext } from '../../../contexts/LanguageContext';
import './GameSection.scss';

const GameSection = () => {
  const { languageMode } = useContext(LanguageModeContext);

  const TITLE_TEXT = languageMode === 'polish' ? 'Gra terenowa' : 'Field Game';
  const DESCRIPTION_TEXT =
    languageMode === 'polish'
      ? 'Przejdź na stronę gry terenowej, skanuj QR-kody i zgarniaj nagrody!'
      : 'Go to the field game page, scan QR codes, and win prizes!';
  const BUTTON_TEXT = languageMode === 'polish' ? 'Rozpocznij grę' : 'Start Game';

  return (
    <section id="game-section" className="game-section">
      <div className="game-section__container">
        <div className="game-section__content">
          <h2 className="game-section__title">{TITLE_TEXT}</h2>
          <p className="game-section__description">{DESCRIPTION_TEXT}</p>
          <Link to={GAME_PATH} className="game-section__button">
            <span className="game-section__button-text">{BUTTON_TEXT}</span>
            <span className="game-section__button-icon">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GameSection;
