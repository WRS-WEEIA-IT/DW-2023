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
  const filteredEvents = showAllCards ? events : events?.slice(0, DEFAULT_VISIBLE_CARDS_COUNT);

  return (
    <div className="grid-container">
      {filteredEvents &&
        filteredEvents.map((event, index: number) => (
          <Card
            key={index}
            imageSource={event.imageSource}
            eventType={event.eventType}
            title={event.title}
            timeStart={event.timeStart}
            timeEnd={event.timeEnd}
          />
        ))}
    </div>
  );
};

export default CardGrid;
