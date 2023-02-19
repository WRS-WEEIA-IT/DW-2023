import { useContext } from 'react';
import { LanguageModeContext } from '../../../contexts/LanguageContext';
import './AboutSection.scss';
import {
  headerTextEN,
  headerTextPL,
  descriptionTextEN,
  descriptionTextPL,
} from './DescriptionTexts';
import { createAnimateOnScroll, viewportProperties } from '../../../animations/animateOnScroll';
import { m } from 'framer-motion';

const AboutSection = () => {
  const { languageMode } = useContext(LanguageModeContext);
  const HEADER_TEXT = languageMode == 'polish' ? headerTextPL : headerTextEN;
  const DESCRIPTION_TEXT = languageMode == 'polish' ? descriptionTextPL : descriptionTextEN;

  return (
    <section id="about-section">
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportProperties}
        variants={createAnimateOnScroll()}>
        <h4 id="about-header-text">{HEADER_TEXT}</h4>
        <p id="about-description-text">{DESCRIPTION_TEXT}</p>
      </m.div>
    </section>
  );
};

export default AboutSection;
