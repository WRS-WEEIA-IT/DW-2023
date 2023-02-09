import Card from '../Card/Card';
import './CardGrid.scss';
import { firebaseCollectionName, firebaseDb } from '../../FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, Query } from 'firebase/firestore';
import CardInterface from './../Card/CardInterface';

const CardGrid = ({ showAllCards = false }: { showAllCards?: boolean }) => {
  const DEFAULT_VISIBLE_CARDS_COUNT = 4;
  const [events] = useCollectionData<CardInterface>(
    collection(firebaseDb, firebaseCollectionName) as Query<CardInterface>
  );

  return (
    <div className="grid-container">
      {events &&
        events.map(
          (event, index: number) =>
            (index < DEFAULT_VISIBLE_CARDS_COUNT && (
              <Card
                key={index}
                imageSource={event.imageSource}
                eventType={event.eventType}
                title={event.title}
                timeStart={event.timeStart}
                timeEnd={event.timeEnd}
              />
            )) ||
            (index >= DEFAULT_VISIBLE_CARDS_COUNT && showAllCards && (
              <Card
                key={index}
                imageSource={event.imageSource}
                eventType={event.eventType}
                title={event.title}
                timeStart={event.timeStart}
                timeEnd={event.timeEnd}
              />
            ))
        )}
    </div>
  );
};

export default CardGrid;
