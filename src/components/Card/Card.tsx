import Button from '../../styles/Button.module.scss';
import './Card.scss';
import { useContext } from 'react';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import CardInterface from './CardInterface';

const Card = ({ imageSource, eventType, title }: CardInterface) => {
  const language = useContext(LanguageModeContext);
  const eventTypeText =
    eventType === 'lecture'
      ? language === 'polish'
        ? 'Szkolenie'
        : 'Lecture'
      : language === 'polish'
      ? 'Warsztat'
      : 'Workshop';

  return (
    <div className="card-container" style={{ backgroundImage: `url(images/${imageSource}.jpg)` }}>
      <h6 className="card-eventType">{eventTypeText}</h6>
      <h5 className="card-title">{title}</h5>
      <button
        className={`card-signup-button ${Button.button} ${Button.round} ${Button.filled}`}
        style={{ marginLeft: '0', marginTop: '0' }}>
        {language === 'polish' ? 'Zapisz Się' : 'Sign Up'}
      </button>
    </div>
  );
};

export default Card;
