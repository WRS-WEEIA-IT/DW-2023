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
      ? "Przed uczestnictwem w naszym wydarzeniu, prosimy o zapoznanie się z regulaminem."
      : "Before participating in our event, please read our terms and conditions.";

  const regulations = [
    {
      date: languageMode === "polish" ? "18 marca - Dzień Wydziału" : "March 18 - Department Day",
      link: "https://zosayoqrngvrydnexaek.supabase.co/storage/v1/object/public/DW-files/regulamin.pdf",
    },
    {
      date: languageMode === "polish" ? "19 marca - Dzień Szkół" : "March 19 - Schools Day",
      link: "https://zosayoqrngvrydnexaek.supabase.co/storage/v1/object/public/DW-files/regulamin_szkoly.pdf",
    },
  ];

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
        <div className="regulamin-buttons-container">
          {regulations.map((regulation) => (
            <a
              key={regulation.date}
              href={regulation.link}
              className="regulamin-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              {regulation.date}
            </a>
          ))}
        </div>
      </m.div>
    </section>
  );
};

export default RegulaminSection;
