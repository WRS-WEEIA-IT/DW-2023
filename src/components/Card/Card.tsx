import Button from "../../styles/Button.module.scss";
import "./Card.scss";
import { useContext } from "react";
import { LanguageModeContext } from "../../contexts/LanguageContext";
import CardInterface from "./CardInterface";
import { FORM_LINK } from "../../services/Links";

const Card = (
  { imageSrc, eventType, title, timeStart, timeEnd, partner, room }:
    CardInterface,
) => {
  const { languageMode } = useContext(LanguageModeContext);
  const eventTypeText = eventType === "lectures"
    ? languageMode === "polish" ? "Prelekcja" : "Lecture"
    : languageMode === "polish"
    ? "Szkolenie"
    : "Workshop";

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const startHour = formatTime(timeStart);
  const endHour = formatTime(timeEnd);

  return (
    <a
      href={FORM_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="button-link"
    >
      <div
        className="card-container"
        style={{ backgroundImage: `url(images/${imageSrc}.jpg)` }}
      >
        <div className="card-event-header">
          <p className="card-event-time">{`${startHour} - ${endHour}`}</p>
          <h6 className="card-event-partner">
            {partner ? partner : "??"},{" "}
            {languageMode === "polish" ? "Sala " : "Room "}
            {room}
          </h6>
        </div>
        <h6 className="card-event-type">{eventTypeText}</h6>
        <h5 className="card-title">{title ? title : "??"}</h5>
      </div>
    </a>
  );
};

export default Card;
