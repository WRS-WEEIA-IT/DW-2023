import Navbar from '../Navbar/Navbar';
import './HomePage.scss';
import WelcomeSection from '../Sections/WelcomeSection/WelcomeSection';
import EventsSection from '../Sections/EventsSection/EventsSection';
import AboutSection from '../Sections/DescriptionSection/AboutSection';
import PartnersSection from '../Sections/PartnersSection/PartnersSection';
import RegulaminSection from '../Sections/RegulaminSection/RegulaminSection';
import GameSection from '../Sections/GameSection/GameSection';
import Footer from '../Footer/Footer';
import Advertisements from '../Advertisements/Advertisements';
import { LazyMotion, domAnimation } from 'framer-motion';

const HomePage = () => {
  const setCustomViewportHeightVariable = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setCustomViewportHeightVariable();

  return (
    <LazyMotion features={domAnimation}>
      <div>
        <div id="backgroud-photo" />
        <Navbar />
        <WelcomeSection />
        <AboutSection />
        <RegulaminSection />
        <GameSection />
        <EventsSection />
        <PartnersSection />
        <Footer />
        <Advertisements />
      </div>
    </LazyMotion>
  );
};

export default HomePage;
