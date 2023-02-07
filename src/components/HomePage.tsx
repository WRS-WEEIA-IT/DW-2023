import Button from '../styles/Button.module.scss';
import Card from './Card/Card';
import mockImage from '../assets/workshopImage2.png';

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
      <div id="card-grid">
        <Card imageSrc={mockImage} eventType="workshop" title="Workshop " />
        <Card imageSrc={mockImage} eventType="workshop" title="Workshop " />
        <Card imageSrc={mockImage} eventType="workshop" title="Workshop " />
        <Card imageSrc={mockImage} eventType="workshop" title="Workshop" />
      </div>
    </>
  );
};

export default HomePage;
