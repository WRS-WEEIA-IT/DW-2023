import Navbar from '../Navbar/Navbar';
import './HomePage.scss';
import CardGrid from '../CardGrid/CardGrid';
import HomePageBanner from '../HomePageBanner/HomePageBanner';

const HomePage = () => {
  return (
    <>
      <div id="homepage-container">
        <Navbar />
        <div id="homepage-welcome-content">
          <HomePageBanner />
        </div>
        <div id="homepage-content">
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
          <h1>Scroll test</h1>
          <h1>Scroll test</h1>
          <h1>Scroll test</h1>
          <h1>Scroll test</h1>
          <h1>Scroll test</h1>
        </div>
      </div>
    </>
  );
};

export default HomePage;
