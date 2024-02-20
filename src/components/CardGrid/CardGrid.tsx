import Card from '../Card/Card';
import './CardGrid.scss';
import { firebaseDb } from '../../FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, Query } from 'firebase/firestore';
import CardInterface from './../Card/CardInterface';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { useContext } from 'react';
import { LanguageModeContext } from '../../contexts/LanguageContext';

const CardGrid = ({ eventType }: { eventType: 'lectures' | 'workshops' }) => {
  const { languageMode } = useContext(LanguageModeContext);
  // const [events] = useCollectionData<CardInterface>(
  //   collection(firebaseDb, eventType) as Query<CardInterface>
  // );
  const events: CardInterface[] = [];

  // const sortEvents = () => {
  //   events?.sort(
  //     (event1, event2) =>
  //       event1.timeStart.toDate().getHours() - event2.timeStart.toDate().getHours()
  //   );
  // };

  // sortEvents();

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
                eventType={eventType}
                title={event.title}
                timeStart={event.timeStart}
                timeEnd={event.timeEnd}
                partner={event.partner}
                room={event.room}
              />
            </SwiperSlide>
          ))
        ) : languageMode === 'polish' ? (
          <p className="no-events-paragraph">
            Wkrótce pojawią się nowe {eventType === 'lectures' ? 'prelekcje' : 'szkolenia'}
          </p>
        ) : (
          <p className="no-events-paragraph">New {eventType} will appear soon</p>
        )}
      </Swiper>
    </div>
  );
};

export default CardGrid;
