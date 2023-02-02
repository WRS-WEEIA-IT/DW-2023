import Button from '../styles/Button.module.scss';

const HomePage = () => {
  return (
    <>
      HomePage
      <div className={`${Button.background}`}>
        <button className={`${Button.button} ${Button.square} ${Button.filled}`}></button>
        <button className={`${Button.button} ${Button.round} ${Button.filled}`}></button>
        <button className={`${Button.button} ${Button.round} ${Button.outlined}`}></button>
      </div>
    </>
  );
};

export default HomePage;
