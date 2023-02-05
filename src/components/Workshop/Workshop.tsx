import Button from '../../styles/Button.module.scss';
import './WorkshopCard.scss';
import React, {useContext} from 'react';
import { LanguageModeContext } from '../../contexts/LanguageContext';

interface workshopProps {
    imageSrc:string;
    workshopOrTraining:boolean;
    title:string;
} 

const Workshop = (workshopProps:workshopProps) => {
  const language = useContext(LanguageModeContext);
  return(
    <>
    <div id="workshop-background" style={{backgroundImage: `url(${workshopProps.imageSrc})`}}>
        <div id="workshop-content">
            {language === 'polish' && <h6 id="workshop-h6">{workshopProps.workshopOrTraining ? "Szkolenie": "Warsztat"}</h6>}
            {language === 'english' && <h6 id="workshop-h6">{workshopProps.workshopOrTraining ? "Training": "Workshop"}</h6>}
            <h4 id="workshop-h4">{workshopProps.title}</h4>
            <button className={`${Button.button} ${Button.round} ${Button.filled}`} style={{ marginLeft:'0', marginTop:'0'}}>Zapisz się</button>
        </div>
    </div>
    </>
  )
};

export default Workshop;