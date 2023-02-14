import { useContext } from 'react';
import { LanguageModeContext } from '../../../contexts/LanguageContext';
import './PartnersSection.scss';

const PartnersSection = () => {
  const languageMode = useContext(LanguageModeContext);

  return (
    <>
      <div id="partners-header-container">
        <h2 id="partners-header">{languageMode == 'polish' ? 'Partnerzy' : 'Partners'}</h2>
      </div>
    </>
  );
};

export default PartnersSection;
