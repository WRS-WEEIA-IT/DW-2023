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
  const languageMode = useContext(LanguageModeContext);
  const headerText = languageMode == 'polish' ? headerTextPL : headerTextEN;
  const descriptionText = languageMode == 'polish' ? descriptionTextPL : descriptionTextEN;

  return (
    <section id="about-section">
      <h4 id="about-header">{headerText}</h4>
      <p id="about-description">{descriptionText}</p>
    </section>
  );
};

export default AboutSection;
