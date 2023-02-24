import Navbar from '../Navbar/Navbar';
import './HomePage.scss';
import WelcomeSection from '../Sections/WelcomeSection/WelcomeSection';
import EventsSection from '../Sections/EventsSection/EventsSection';
import AboutSection from '../Sections/DescriptionSection/AboutSection';
import PartnersSection from '../Sections/PartnersSection/PartnersSection';
import Footer from '../Footer/Footer';
<<<<<<< HEAD
import { domAnimation, LazyMotion } from 'framer-motion';

const HomePage = () => {
  return (
    <LazyMotion features={domAnimation}>
      <div id="homepage-container">
        <Navbar />
        <WelcomeSection />
        <AboutSection />
        <EventsSection />
        <PartnersSection />
        <Footer />
      </div>
    </LazyMotion>
=======

const HomePage = () => {
  return (
    <div id="homepage-container">
      <Navbar />
      <WelcomeSection />
      <AboutSection />
      <EventsSection />
      <PartnersSection />
      <Footer />
    </div>
>>>>>>> 5291e98 (Add modal to page)
  );
};

export default HomePage;
