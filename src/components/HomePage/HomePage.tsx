import Navbar from '../Navbar/Navbar';
import './HomePage.scss';
import { firebaseCollectionName, firebaseDb } from '../../FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, Query } from 'firebase/firestore';
import CardInterface from './../Card/CardInterface';
import Card from '../Card/Card';

const HomePage = () => {
  const [events] = useCollectionData<CardInterface>(
    collection(firebaseDb, firebaseCollectionName) as Query<CardInterface>
  );
  if (!events) return <> </>;
  const event = events[0];

  return (
    <div className="background">
      <Navbar />
      <div id="homepage-content">
        <Card
          title={event.title}
          eventType={event.eventType}
          imageSource={event.imageSource}
          timeStart={event.timeStart}
          timeEnd={event.timeEnd}
        />
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
      </div>
    </div>
  );
};

export default HomePage;
