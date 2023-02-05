import Button from '../styles/Button.module.scss';
import Workshop from '../components/Workshop.tsx';

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
      {/* Trzeba dać jakiś imageSrc, żeby działało */}
      <Workshop workshopOrTraining title="Workshop Title" />
      <div>

      </div>
    </>
  );
};

export default HomePage;
