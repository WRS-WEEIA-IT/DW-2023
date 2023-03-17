import Button from '../../styles/Button.module.scss';
import './Card.scss';
import { useContext } from 'react';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import CardInterface from './CardInterface';
import { Timestamp } from '@firebase/firestore';
import { FORM_LINK } from '../../services/FormLink';

const Card = ({ imageSource, eventType, title, timeStart, timeEnd, partner }: CardInterface) => {
  const { languageMode } = useContext(LanguageModeContext);
  const eventTypeText =
    eventType === 'lectures'
      ? languageMode === 'polish'
        ? 'Prelekcja'
        : 'Lecture'
      : languageMode === 'polish'
      ? 'Szkolenie'
      : 'Workshop';

  const convertToClockTime = (time: Timestamp) =>
    `${time.toDate().getHours()}:${
      time.toDate().getMinutes() < 10
        ? '0' + time.toDate().getMinutes()
        : time.toDate().getMinutes()
    }`;

  const startHour = convertToClockTime(timeStart);
  const endHour = convertToClockTime(timeEnd);

  return (
    <div className="card-container" style={{ backgroundImage: `url(images/${imageSource}.jpg)` }}>
      <div className="card-event-header">
        <p className="card-event-time">{`${startHour} - ${endHour}`}</p>
        <h6 className="card-event-partner">{partner}</h6>
      </div>
      <h6 className="card-event-type">{eventTypeText}</h6>
      <h5 className="card-title">{title}</h5>
      <a href={FORM_LINK} target="_blank" rel="noopener noreferrer" className="button-link">
        <button
          className={`card-signup-button ${Button.button} ${Button.round} ${Button.filled}`}
          style={{ marginLeft: '0', marginTop: '0' }}>
          {languageMode === 'polish' ? 'Zapisz Się' : 'Sign Up'}
        </button>
      </a>
    </div>
  );
};

export default Card;
