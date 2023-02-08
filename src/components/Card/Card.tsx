import Button from '../../styles/Button.module.scss';
import './Card.scss';
import { useContext } from 'react';
import { LanguageModeContext } from '../../contexts/LanguageContext';

interface CardProps {
  eventType: 'workshop' | 'lecture';
  imageSource: string;
  timeEnd: Date;
  timeStart: Date;
  title: string;
}

const Card = ({ imageSource, eventType, title }: CardProps) => {
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
    <div id="card-container" style={{ backgroundImage: `url(${imageSource})` }}>
      <h6 id="card-eventType">{eventTypeText}</h6>
      <h5 id="card-title">{title}</h5>
      <button
        className={`${Button.button} ${Button.round} ${Button.filled}`}
        style={{ marginLeft: '0', marginTop: '0' }}>
        {language === 'polish' ? 'Zapisz Się' : 'Sign Up'}
      </button>
    </div>
  );
};

export default Card;
