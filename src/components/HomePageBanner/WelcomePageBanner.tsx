import Clock from '../Clock/Clock';
import './WelcomePageBanner.scss';
import Button from '../../styles/Button.module.scss';
import DW_LOGO_IMG from '../../../public/images/dw_logo.png';
import { useContext } from 'react';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import { m } from 'framer-motion';
import { cardViewportProperties, createAnimateOnScroll } from '../../animations/animateOnScroll';
import { FORM_LINK } from '../../services/FormLink';

const WelcomePageBanner = () => {
  const { languageMode } = useContext(LanguageModeContext);

  const BANNER_TEXT =
    languageMode == 'polish' ? 'Twoja nowa perspektywa na EEIA' : 'Your new perspective on EEIA';

  return (
    <div id="welcome-page-banner">
      <div id="left-banner-side">
        <img id="dw-logo" src={DW_LOGO_IMG} />
        <m.h4
          initial="hidden"
          whileInView="visible"
          viewport={cardViewportProperties}
          variants={createAnimateOnScroll(0.4)}
          id="banner-text">
          {BANNER_TEXT}
        </m.h4>
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={cardViewportProperties}
          variants={createAnimateOnScroll(0.7)}
          id="banner-buttons">
          <a href={FORM_LINK} target="_blank" rel="noopener noreferrer" className="button-link">
            <button className={`${Button.button} ${Button.filled} ${Button.round}`}>
              {languageMode === 'polish' ? 'Zapisz się' : 'Sign up'}
            </button>
          </a>
          <a
            href="https://www.facebook.com/events/660013089462906/"
            target="_blank"
            rel="noopener noreferrer">
            <button className={`${Button.button} ${Button.outlined} ${Button.round}`}>
              {languageMode === 'polish' ? 'Dowiedz się więcej' : 'Find out more'}
            </button>
          </a>
        </m.div>
      </div>
      <Clock />
    </div>
  );
};

export default WelcomePageBanner;
