export default interface CardInterface {
  eventType: 'workshops' | 'lectures';
  imageSrc: string;
  timeEnd: string;
  timeStart: string;
  title: string;
  partner: string;
  room: string;
}
