import { useContext } from 'react';
import { LanguageModeContext } from '../../../contexts/LanguageContext';
import CardGrid from '../../CardGrid/CardGrid';
import './EventsSection.scss';
import { createAnimateOnScroll, cardViewportProperties } from '../../../animations/animateOnScroll';
import { m } from 'framer-motion';

const EventsSection = () => {
  const { languageMode } = useContext(LanguageModeContext);

  const HEADER_TEXT = languageMode == 'polish' ? 'Szkolenia i warsztaty' : 'Lectures and workshops';
  const DESCRIPTION_TEXT =
    languageMode == 'polish'
      ? 'Zapisz się na najciekawsze szkolenia i warsztaty!'
      : 'Choose the events that suit you the most and sign up for them!';

  return (
    <section id="events-section">
      <div id="events-content">
        <h2 id="events-header">{HEADER_TEXT}</h2>
        <p id="events-description">{DESCRIPTION_TEXT}</p>
        <h4 className="card-swiper-label">{languageMode == 'polish' ? 'Szkolenia' : 'Lectures'}</h4>
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={cardViewportProperties}
          variants={createAnimateOnScroll()}>
          <CardGrid eventType="lectures" />
        </m.div>
        <h4 className="card-swiper-label">
          {languageMode == 'polish' ? 'Warsztaty' : 'Workshops'}
        </h4>
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={cardViewportProperties}
          variants={createAnimateOnScroll()}>
          <CardGrid eventType="workshops" />
        </m.div>
      </div>
    </section>
  );
};

export default EventsSection;
