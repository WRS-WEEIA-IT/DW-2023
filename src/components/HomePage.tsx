import Button from '../styles/Button.module.scss';
import Card from './Card/Card';

const HomePage = () => {
  return (
    <>
      <div className={`${Button.background}`}>
        <button className={`${Button.button} ${Button.square} ${Button.filled}`}>Zapisz się</button>
        <button className={`${Button.button} ${Button.round} ${Button.filled}`}>Zapisz się</button>
        <button className={`${Button.button} ${Button.round} ${Button.outlined}`}>
          Dowiedz się więcej
        </button>
      </div>
      <Card imageSrc="photo.png" workshopOrTraining title="Workshop " />
    </>
  );
};

export default HomePage;
