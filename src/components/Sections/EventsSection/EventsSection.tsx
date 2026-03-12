import { useContext } from "react";
import { LanguageModeContext } from "../../../contexts/LanguageContext";
// import CardGrid from "../../CardGrid/CardGrid";
import "./EventsSection.scss";
import {
  cardViewportProperties,
  createAnimateOnScroll,
} from "../../../animations/animateOnScroll";
import { m } from "framer-motion";
// import { isInfoHidden } from "../../../supabaseConfig";

const EventsSection = () => {
  const { languageMode } = useContext(LanguageModeContext);

  const HEADER_TEXT = languageMode == "polish" ? "Szkolenia" : "Workshops";
  const DESCRIPTION_TEXT = languageMode == "polish"
    ? "Zapisz się na najciekawsze szkolenia!"
    : "Choose the events that suit you the most and sign up for them!";

  return (
    <section id="events-section">
      <div id="events-content">
        <h2 id="events-header">{HEADER_TEXT}</h2>
        <p id="events-description">{DESCRIPTION_TEXT}</p>
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={cardViewportProperties}
          variants={createAnimateOnScroll()}
          className="coming-soon-container"
        >
          <div className="coming-soon-card">
            <div className="coming-soon-icon">⏰</div>
            <h3 className="coming-soon-title">
              {languageMode == "polish" ? "Wkrótce dostępne" : "Coming Soon"}
            </h3>
            <p className="coming-soon-text">
              {languageMode == "polish"
                ? "Szkolenia będą dostępne wkrótce. Obserwuj nas na Facebooku, aby być na bieżąco!"
                : "Workshops will be available soon. Follow us on Facebook to stay updated!"}
            </p>
            <div className="coming-soon-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default EventsSection;
