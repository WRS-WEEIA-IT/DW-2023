import { useContext } from 'react';
import { LanguageModeContext } from '../../../contexts/LanguageContext';
import './PartnersSection.scss';

const PartnersSection = () => {
  const { languageMode } = useContext(LanguageModeContext);

  return (
    <section id="partners-section">
      <h2 id="partners-header">{languageMode == 'polish' ? 'Partnerzy' : 'Partners'}</h2>
    </section>
  );
};

export default PartnersSection;
