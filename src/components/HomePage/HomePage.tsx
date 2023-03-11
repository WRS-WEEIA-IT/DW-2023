import Navbar from '../Navbar/Navbar';
import './HomePage.scss';
import WelcomeSection from '../Sections/WelcomeSection/WelcomeSection';
import EventsSection from '../Sections/EventsSection/EventsSection';
import AboutSection from '../Sections/DescriptionSection/AboutSection';
import PartnersSection from '../Sections/PartnersSection/PartnersSection';
import Footer from '../Footer/Footer';
import { domAnimation, LazyMotion } from 'framer-motion';

const HomePage = () => {
  return (
    <LazyMotion features={domAnimation}>
      <div id="homepage-container">
        <div id="backgroud-photo" />
        <Navbar />
        <WelcomeSection />
        <AboutSection />
        <EventsSection />
        <PartnersSection />
        <Footer />
      </div>
    </LazyMotion>
  );
};

export default HomePage;
