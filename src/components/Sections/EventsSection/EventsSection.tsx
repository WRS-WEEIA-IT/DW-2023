import { useContext } from "react";
import { LanguageModeContext } from "../../../contexts/LanguageContext";
import CardGrid from "../../CardGrid/CardGrid";
import "./EventsSection.scss";
import {
  cardViewportProperties,
  createAnimateOnScroll,
} from "../../../animations/animateOnScroll";
import { m } from "framer-motion";
import { isInfoHidden } from "../../../supabaseConfig";

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
        >
          {isInfoHidden
            ? (
              languageMode == "polish"
                ? (
                  <p className="text-center" id="info-hidden-text">
                    Informacje o wydarzeniach zostaną udostępnione wkrótce!
                  </p>
                )
                : (
                  <p className="text-center" id="info-hidden-text">
                    Information about events will be available soon!
                  </p>
                )
            )
            : <CardGrid />}
        </m.div>
      </div>
    </section>
  );
};

export default EventsSection;
