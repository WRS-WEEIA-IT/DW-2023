import { useContext } from 'react';
import { LanguageModeContext } from '../../../contexts/LanguageContext';
import './AboutSection.scss';
import {
  headerTextEN,
  headerTextPL,
  descriptionTextEN,
  descriptionTextPL,
} from './DescriptionTexts';

const AboutSection = () => {
  const { languageMode } = useContext(LanguageModeContext);
  const HEADER_TEXT = languageMode == 'polish' ? headerTextPL : headerTextEN;
  const DESCRIPTION_TEXT = languageMode == 'polish' ? descriptionTextPL : descriptionTextEN;

  return (
    <section id="about-section">
      <h4 id="about-header-text">{HEADER_TEXT}</h4>
      <p id="about-description-text">{DESCRIPTION_TEXT}</p>
    </section>
  );
};

export default AboutSection;
