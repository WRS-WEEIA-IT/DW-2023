import { useContext, useRef, useState } from "react";
import { LanguageModeContext } from "../../../contexts/LanguageContext";
import "./EventsSection.scss";
import {
  cardViewportProperties,
  createAnimateOnScroll,
} from "../../../animations/animateOnScroll";
import { m } from "framer-motion";
import useFetchEvents from "../../../hooks/useFetchEvents";

const EventsSection = () => {
  const { languageMode } = useContext(LanguageModeContext);

  const HEADER_TEXT = languageMode == "polish" ? "Szkolenia" : "Workshops";
  const DESCRIPTION_TEXT = languageMode == "polish"
    ? "Zapisz się na najciekawsze szkolenia!"
    : "Choose the events that suit you the most and sign up for them!";

  const APPLICATION_LINK = "https://forms.cloud.microsoft.com/e/nT2GaMp8jP";
  const { events, loading, error } = useFetchEvents();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const orbitRef = useRef<HTMLDivElement>(null);
  const dragPointerIdRef = useRef<number | null>(null);
  const dragStartClientXRef = useRef(0);
  const initialScrollLeftRef = useRef(0);

  const scrollRight = () => {
    if (!events || activeIndex >= events.length - 1) {
      return;
    }

    const newIndex = activeIndex + 1;
    setActiveIndex(newIndex);

    const orbit = orbitRef.current;
    if (!orbit) {
      return;
    }

    const element = orbit.children[newIndex] as HTMLElement;
    element.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const scrollLeft = () => {
    if (activeIndex <= 0) {
      return;
    }

    const newIndex = activeIndex - 1;
    setActiveIndex(newIndex);

    const orbit = orbitRef.current;
    if (!orbit) {
      return;
    }

    const element = orbit.children[newIndex] as HTMLElement;
    element.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const handleScroll = () => {
    const orbit = orbitRef.current;
    if (!orbit) {
      return;
    }

    const orbitRect = orbit.getBoundingClientRect();
    const orbitCenter = orbitRect.left + orbitRect.width / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    Array.from(orbit.children).forEach((child, index) => {
      const rect = (child as HTMLElement).getBoundingClientRect();
      const childCenter = rect.left + rect.width / 2;
      const distance = Math.abs(orbitCenter - childCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  const handleOrbitPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) {
      return;
    }

    const target = event.target as HTMLElement;
    if (target.closest("a, button")) {
      return;
    }

    const orbit = orbitRef.current;
    if (!orbit) {
      return;
    }

    dragPointerIdRef.current = event.pointerId;
    setIsDragging(true);
    dragStartClientXRef.current = event.clientX;
    initialScrollLeftRef.current = orbit.scrollLeft;
    orbit.setPointerCapture(event.pointerId);
  };

  const handleOrbitPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragPointerIdRef.current !== event.pointerId) {
      return;
    }

    event.preventDefault();

    const orbit = orbitRef.current;
    if (!orbit) {
      return;
    }

    const dragDistance = event.clientX - dragStartClientXRef.current;
    orbit.scrollLeft = initialScrollLeftRef.current - dragDistance;
  };

  const stopOrbitDrag = (event?: React.PointerEvent<HTMLDivElement>) => {
    if (event && dragPointerIdRef.current !== event.pointerId) {
      return;
    }

    if (event) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragPointerIdRef.current = null;
    setIsDragging(false);
  };

  const formatDate = (timestamp: string) => {
    if (!timestamp) {
      return "";
    }

    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return timestamp;
    }

    return date.toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  const formatTime = (timestamp: string) => {
    if (!timestamp) {
      return "??";
    }

    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return "??";
    }

    return date.toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
      hour12: false,
    });
  };

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
          className="events"
        >
          {loading && <p>Loading...</p>}

          {error && <p>{error}</p>}

          {!loading && events?.length > 0 && (
            <div className="OrbitWrapper">
              <button className="arrow left" type="button" onClick={scrollLeft}>
                &lt;
              </button>
              <div
                className={`Orbit ${isDragging ? "dragging" : ""}`}
                ref={orbitRef}
                onScroll={handleScroll}
                onPointerDown={handleOrbitPointerDown}
                onPointerMove={handleOrbitPointerMove}
                onPointerUp={stopOrbitDrag}
                onPointerCancel={stopOrbitDrag}
              >
                {events.map((event, index) => (
                  <div
                    className={`Card ${index === activeIndex ? "active" : ""}`}
                    style={{ backgroundImage: `url(/images/${event.imageSrc}.jpg)` }}
                    key={`${event.title}-${event.timeStart}-${index}`}
                  >
                    <div className="CardContent">
                      <h3 className="CardTitle">{event.title}</h3>
                      <div className="CardBottom">
                        <div className="CardMeta">
                          <div className="CardDate">
                            {formatDate(event.timeStart)}, {formatTime(event.timeStart)} - {formatTime(event.timeEnd)}
                          </div>
                          <div className="CardLocationRow">
                            <div className="CardLocation">{event.room}</div>
                            <div className="CardCompany">{event.partner}</div>
                          </div>
                        </div>
                      </div>
                      <a
                        href={APPLICATION_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-button"
                      >
                        {languageMode === "polish" ? "Aplikuj" : "Apply"}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <button className="arrow right" type="button" onClick={scrollRight}>
                &gt;
              </button>
            </div>
          )}
        </m.div>
      </div>
    </section>
  );
};

export default EventsSection;
