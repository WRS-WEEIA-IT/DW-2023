import { useContext } from 'react';
import { LanguageModeContext } from '../../../contexts/LanguageContext';
import Partners from '../../Partners/Partners';
import './PartnersSection.scss';

const PartnersSection = () => {
  const { languageMode } = useContext(LanguageModeContext);

  return (
    <section id="partners-section">
      <h2 id="partners-header">{languageMode == 'polish' ? 'Partnerzy' : 'Partners'}</h2>
      <Partners />
    </section>
  );
};

export default PartnersSection;
