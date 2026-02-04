import { useContext } from "react";
import { LanguageModeContext } from "../../../contexts/LanguageContext";
import "./RegulaminSection.scss";
import { m } from "framer-motion";
import {
  createAnimateOnScroll,
  viewportProperties,
} from "../../../animations/animateOnScroll";

const RegulaminSection = () => {
  const { languageMode } = useContext(LanguageModeContext);

  const HEADER_TEXT = languageMode === "polish" ? "Regulamin" : "Terms & Conditions";
  const DESCRIPTION_TEXT =
    languageMode === "polish"
      ? "Przed uczestnictwem w naszym wydarzeniu, prosimy o zapoznanie się z regulaminem. Pobierz dokument i przeczytaj wszystkie warunki."
      : "Before participating in our event, please read our terms and conditions. Download the document to review all the details.";
  const BUTTON_TEXT = languageMode === "polish" ? "Przeczytaj regulamin" : "Read Terms";

  const regulaminLink =
    "https://zosayoqrngvrydnexaek.supabase.co/storage/v1/object/public/DW-files/regulamin.pdf";

  return (
    <section id="regulamin-section">
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportProperties}
        variants={createAnimateOnScroll()}
      >
        <h2 id="regulamin-header">{HEADER_TEXT}</h2>
        <p id="regulamin-description">{DESCRIPTION_TEXT}</p>
        <a
          href={regulaminLink}
          className="regulamin-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          {BUTTON_TEXT}
        </a>
      </m.div>
    </section>
  );
};

export default RegulaminSection;
