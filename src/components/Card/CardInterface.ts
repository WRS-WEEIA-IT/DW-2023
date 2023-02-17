import { Timestamp } from '@firebase/firestore';

export default interface CardInterface {
  eventType: 'workshop' | 'lecture';
  imageSource: string;
  timeEnd: Timestamp;
  timeStart: Timestamp;
  title: string;
}
