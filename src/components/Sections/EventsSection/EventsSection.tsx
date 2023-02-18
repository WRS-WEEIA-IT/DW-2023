import { useContext } from 'react';
import { LanguageModeContext } from '../../../contexts/LanguageContext';
import CardGrid from '../../CardGrid/CardGrid';
import './EventsSection.scss';
import { animateOnScroll, viewportProperties } from '../../../animations/animateOnScroll';
import { m } from 'framer-motion';

const EventsSection = () => {
  const { languageMode } = useContext(LanguageModeContext);

  const HEADER_TEXT = languageMode == 'polish' ? 'Szkolenia i warsztaty' : 'Lectures and workshops';
  const DESCRIPTION_TEXT =
    languageMode == 'polish'
      ? 'Zapisz się na najciekawsze szkolenia i warsztaty!'
      : 'Choose the events that suit you the most and sign up for them!';
  const SHOW_MORE_LINK = languageMode == 'polish' ? 'Kliknij i sprawdź więcej!' : 'Find out more!';

  return (
    <section id="events-section">
      <div id="events-content">
        <h2 id="events-header">{HEADER_TEXT}</h2>
        <p id="events-description">{DESCRIPTION_TEXT}</p>
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportProperties}
          variants={animateOnScroll}>
          <CardGrid />
        </m.div>
        <h4 id="events-show-more-link">{SHOW_MORE_LINK}</h4>
      </div>
    </section>
  );
};

export default EventsSection;
