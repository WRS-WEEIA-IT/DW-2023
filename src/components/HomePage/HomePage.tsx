import Card from '../Card/Card';
import Navbar from '../Navbar/Navbar';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="background">
      <Navbar />
      <div id="homepage-content">
        <div id="card-grid">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
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
