import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD20kknNO2dQxy__4KUKx0CGqXvfi4NQmE',
  authDomain: 'dw-2023.firebaseapp.com',
  projectId: 'dw-2023',
  storageBucket: 'dw-2023.appspot.com',
  messagingSenderId: '884985117616',
  appId: '1:884985117616:web:19748f8896a0fb9edc7475',
  measurementId: 'G-B4TX37VV4P',
};

//setup firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseCollectionName = 'events';

//example of fetching all events from firebase database
// const [events, loading, error] = useCollectionData(collection(firebaseDb, firebaseCollectionName));
