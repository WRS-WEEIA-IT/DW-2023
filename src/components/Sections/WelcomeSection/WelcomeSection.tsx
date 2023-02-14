import HomePageBanner from '../../HomePageBanner/HomePageBanner';
import WAVE_IMG from '../../../../public/background/homepage-wave.svg';
import './WelcomeSection.scss';

const WelcomeSection = () => {
  return (
    <section id="welcome-section">
      <HomePageBanner />
      <img src={WAVE_IMG} id="homepage-wave-img" />
    </section>
  );
};

export default WelcomeSection;
