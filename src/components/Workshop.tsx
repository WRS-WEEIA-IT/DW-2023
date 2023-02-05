import Button from '../styles/Button.module.scss';
import WorkshopCard from '../styles/WorkshopCard.module.scss';
import React, {useContext} from 'react';
import { LanguageModeContext } from '../contexts/LanguageContext';

interface workshopProps {
    imageSrc:string;
    workshopOrTraining:boolean;
    title:string;
} 

const Workshop = (workshopProps) => {
  const language = useContext(LanguageModeContext);
  return(
    <>
    <div className={`${WorkshopCard.background}`} style={{backgroundImage: `url(${workshopProps.imageSrc})`}}>
        <div className={`${WorkshopCard.content}`}>
            {language === 'polish' && <h6>{workshopProps.workshopOrTraining ? "Szkolenie": "Warsztat"}</h6>}
            {language === 'english' && <h6>{workshopProps.workshopOrTraining ? "Training": "Workshop"}</h6>}
            <h4>{workshopProps.title}</h4>
            <button className={`${Button.button} ${Button.round} ${Button.filled}`} style={{ marginLeft:'0', marginTop:'0'}}>Zapisz się</button>
        </div>
    </div>
    </>
  )
};

export default Workshop;