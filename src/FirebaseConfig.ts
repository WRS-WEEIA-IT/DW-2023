import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: 'AIzaSyD20kknNO2dQxy__4KUKx0CGqXvfi4NQmE',
//   authDomain: 'dw-2023.firebaseapp.com',
//   projectId: 'dw-2023',
//   storageBucket: 'dw-2023.appspot.com',
//   messagingSenderId: '884985117616',
//   appId: '1:884985117616:web:19748f8896a0fb9edc7475',
//   measurementId: 'G-B4TX37VV4P',
// };

//setup firebase
// export const firebaseApp = initializeApp(firebaseConfig);
// export const firebaseDb = getFirestore(firebaseApp);

//example of fetching all events from firebase database
// const [events, loading, error] = useCollectionData(collection(firebaseDb, firebaseCollectionName));

// DW 2024

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC0t2yPnbwvRBVq6WAkIqrWzDfpHmgkTE0',
  authDomain: 'dw-2024.firebaseapp.com',
  projectId: 'dw-2024',
  storageBucket: 'dw-2024.appspot.com',
  messagingSenderId: '826660190047',
  appId: '1:826660190047:web:b00ad2eb79d82a7265e8ea',
  measurementId: 'G-6X5HEVXDXB',
};

// // Initialize Firebase

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
