import Card from '../Card/Card';
import './CardGrid.scss';
import { firebaseCollectionName, firebaseDb } from '../../FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, Query } from 'firebase/firestore';
import CardInterface from './../Card/CardInterface';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

const CardGrid = () => {
  const [events] = useCollectionData<CardInterface>(
    collection(firebaseDb, firebaseCollectionName) as Query<CardInterface>
  );

  return (
    <div className="grid-container">
      <Swiper
        direction="horizontal"
        id="card-slider"
        slidesPerView={'auto'}
        spaceBetween={20}
        grabCursor>
        {events &&
          events.map((event, index: number) => (
            <SwiperSlide key={index}>
              <Card
                imageSource={event.imageSource}
                eventType={event.eventType}
                title={event.title}
                timeStart={event.timeStart}
                timeEnd={event.timeEnd}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default CardGrid;
