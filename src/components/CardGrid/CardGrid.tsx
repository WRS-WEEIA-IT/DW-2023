import Card from '../Card/Card';
import './CardGrid.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { useContext } from 'react';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import useFetchEvents from '../../hooks/useFetchEvents';

const CardGrid = () => {
  const { languageMode } = useContext(LanguageModeContext);
  const { events, loading, error } = useFetchEvents();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="grid-container">
      <Swiper
        direction="horizontal"
        id="card-slider"
        slidesPerView={'auto'}
        spaceBetween={20}
        grabCursor>
        {events && events.length > 0 ? (
          events.map((event, index: number) => (
            <SwiperSlide key={index}>
              <Card
                imageSrc={event.imageSrc}
                eventType={event.eventType}
                title={event.title}
                timeStart={event.timeStart}
                timeEnd={event.timeEnd}
                partner={event.partner}
                room={event.room}
              />
            </SwiperSlide>
          ))
        ) : languageMode === 'polish' ? (
          <p className="no-events-paragraph">Wkrótce pojawią się nowe szkolenia</p>
        ) : (
          <p className="no-events-paragraph">New workshops will appear soon</p>
        )}
      </Swiper>
    </div>
  );
};

export default CardGrid;
