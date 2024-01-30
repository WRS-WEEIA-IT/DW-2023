import { Timestamp } from '@firebase/firestore';

export default interface CardInterface {
  eventType: 'workshops' | 'lectures';
  imageSrc: string;
  timeEnd: Timestamp;
  timeStart: Timestamp;
  title: string;
  partner: string;
}
