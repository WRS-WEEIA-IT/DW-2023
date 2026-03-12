import WAVE_IMG from '../../../../public/background/homepage-wave.svg';
import './WelcomeSection.scss';
import WelcomePageBanner from '../../HomePageBanner/WelcomePageBanner';

const WelcomeSection = () => {
  return (
    <section id="welcome-section">
      <WelcomePageBanner />
      <img src={WAVE_IMG} id="welcome-wave-img" />
    </section>
  );
};

export default WelcomeSection;
