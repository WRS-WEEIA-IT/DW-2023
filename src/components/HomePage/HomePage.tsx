import Navbar from '../Navbar/Navbar';
import './HomePage.scss';
import WelcomeSection from '../Sections/WelcomeSection/WelcomeSection';
import DescriptionSection from '../Sections/DescriptionSection/DescriptionSection';
import EventsSection from '../Sections/EventsSection/EventsSection';

const HomePage = () => {
  return (
    <>
      <div id="homepage-container">
        <Navbar />
        <WelcomeSection />
        <DescriptionSection />
        <EventsSection />
      </div>
    </>
  );
};

export default HomePage;
