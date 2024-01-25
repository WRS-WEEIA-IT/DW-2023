import Navbar from '../Navbar/Navbar';
import './HomePage.scss';
// import WelcomeSection from '../Sections/WelcomeSection/WelcomeSection';
// import EventsSection from '../Sections/EventsSection/EventsSection';
// import AboutSection from '../Sections/DescriptionSection/AboutSection';
// import PartnersSection from '../Sections/PartnersSection/PartnersSection';
// import Footer from '../Footer/Footer';
import Button from '../../styles/Button.module.scss';
import { domAnimation, LazyMotion } from 'framer-motion';

const HomePage = () => {
  const setCustomViewportHeightVariable = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setCustomViewportHeightVariable();

  return (
    <LazyMotion features={domAnimation}>
      {/* <div id="homepage-container"> */}
      {/* <div id="backgroud-photo" /> */}
      {/* <Navbar /> */}
      <div>
        <button className={`${Button.button} ${Button.filled} ${Button.square}`}>Zapisz się</button>
        <button className={`${Button.button} ${Button.outlined} ${Button.round}`}>
          Zapisz się
        </button>
      </div>
      {/* <WelcomeSection />
        <AboutSection />
        <EventsSection />
        <PartnersSection />
        <Footer /> */}
      {/* </div> */}
    </LazyMotion>
  );
};

export default HomePage;
