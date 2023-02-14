import CardGrid from '../../CardGrid/CardGrid';
import './EventsSection.scss';

const EventsSection = () => {
  return (
    <section id="events-section">
      <div id="events-content">
        <h2 id="events-header">Szkolenia i warsztaty</h2>
        <p id="events-description">Zapisuj sie kurwo</p>
        <CardGrid />
        <h4 id="events-show-more-link">Kliknij i sprawdź więcej!</h4>
      </div>
    </section>
  );
};

export default EventsSection;
