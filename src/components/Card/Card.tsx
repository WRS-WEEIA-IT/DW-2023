import Button from '../../styles/Button.module.scss';
import './Card.scss';
import { useContext } from 'react';
import { LanguageModeContext } from '../../contexts/LanguageContext';

interface CardProps {
  imageSrc: string;
  eventType: 'workshop' | 'training';
  title: string;
}

const Card = ({ imageSrc, eventType, title }: CardProps) => {
  const language = useContext(LanguageModeContext);
  const eventTypeText =
    eventType === 'training'
      ? language === 'polish'
        ? 'Szkolenie'
        : 'Training'
      : language === 'polish'
      ? 'Warsztat'
      : 'Workshop';
  return (
    <div id="card-container" style={{ backgroundImage: `url(${imageSrc})` }}>
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
