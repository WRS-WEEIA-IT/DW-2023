export default interface CardInterface {
  eventType: 'workshop' | 'lecture';
  imageSource: string;
  timeEnd: Date;
  timeStart: Date;
  title: string;
}
