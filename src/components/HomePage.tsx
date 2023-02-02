import Button from '../styles/Button.module.scss';

const HomePage = () => {
  return (
    <>
      HomePage
      <div className={`${Button.background}`}>
        <button className={`${Button.button} ${Button.square} ${Button.filled}`}>Zapisz się</button>
        <button className={`${Button.button} ${Button.round} ${Button.filled}`}>Zapisz się</button>
        <button className={`${Button.button} ${Button.round} ${Button.outlined}`}>Dowiedz się więcej</button>
      </div>
    </>
  );
};

export default HomePage;