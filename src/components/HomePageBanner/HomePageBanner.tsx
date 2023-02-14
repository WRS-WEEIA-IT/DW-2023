import Clock from '../Clock/Clock';
import './HomePageBanner.scss';
import Button from '../../styles/Button.module.scss';
import DW_LOGO_IMG from '../../../public/images/dw_logo.png';
import { useContext } from 'react';
import { LanguageModeContext } from '../../contexts/LanguageContext';

const HomePageBanner = () => {
  const languageMode = useContext(LanguageModeContext);

  const BANNER_TEXT =
    languageMode == 'polish' ? 'Twoja nowa perspektywa na EEIA' : 'Your new perspective on EEIA';

  return (
    <div id="home-page-banner">
      <div id="left-banner-side">
        <img id="dw-logo" src={DW_LOGO_IMG} />
        <h4 id="banner-text">{BANNER_TEXT}</h4>
        <div id="banner-buttons">
          <button className={`${Button.button} ${Button.filled} ${Button.round}`}>
            {languageMode === 'polish' ? 'Zapisz się' : 'Sign up'}
          </button>
          <button className={`${Button.button} ${Button.outlined} ${Button.round}`}>
            {languageMode === 'polish' ? 'Dowiedz się więcej' : 'Find out more'}
          </button>
        </div>
      </div>
      <Clock />
    </div>
  );
};

export default HomePageBanner;
