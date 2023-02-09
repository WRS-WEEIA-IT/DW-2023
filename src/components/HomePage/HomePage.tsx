import Navbar from '../Navbar/Navbar';
import './HomePage.scss';
import Clock from '../Clock/Clock';
import CardGrid from '../CardGrid/CardGrid';

const HomePage = () => {
  return (
    <div className="background">
      <Navbar />
      <div id="homepage-content">
        <Clock />
        <CardGrid showAllCards />
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
        <h1>Scroll test</h1>
      </div>
    </div>
  );
};

export default HomePage;
