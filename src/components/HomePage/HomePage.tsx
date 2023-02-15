import Navbar from '../Navbar/Navbar';
import './HomePage.scss';
import WelcomeSection from '../Sections/WelcomeSection/WelcomeSection';
import EventsSection from '../Sections/EventsSection/EventsSection';
import AboutSection from '../Sections/DescriptionSection/AboutSection';
import PartnersSection from '../Sections/PartnersSection/PartnersSection';

const HomePage = () => {
  return (
    <div id="homepage-container">
      <Navbar />
      <WelcomeSection />
      <AboutSection />
      <EventsSection />
      <PartnersSection />
    </div>
  );
};

export default HomePage;
