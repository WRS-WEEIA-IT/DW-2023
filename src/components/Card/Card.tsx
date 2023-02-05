import Button from '../../styles/Button.module.scss';
import './Card.scss';
import React, { useContext } from 'react';
import { LanguageModeContext } from '../../contexts/LanguageContext';

interface CardProps {
  imageSrc: string;
  eventType: 'workshop' | 'training';
  title: string;
}

const Card = ({imageSrc, eventType, title} : CardProps) => {
  const language = useContext(LanguageModeContext);
  return (
    <div id="workshop-container" style={{ backgroundImage: `url(${imageSrc})` }}>
      <div id="workshop-content">
        {language === 'polish' ? <h6 id="workshop-eventType">{eventType === 'training' ? 'Szkolenie' : 'Warsztat'}</h6>:
        <h6 id="workshop-eventType">{eventType === 'training' ? 'Training' : 'Workshop'}</h6>}
        <h4 id="workshop-title">{title}</h4>
        <button
          className={`${Button.button} ${Button.round} ${Button.filled}`}
          style={{ marginLeft: '0', marginTop: '0' }}>
          {language === 'polish' ? 'Zapisz Się' : 'Sign Up'} 
          </button>
      </div>
    </div>
  );
};

export default Card;
