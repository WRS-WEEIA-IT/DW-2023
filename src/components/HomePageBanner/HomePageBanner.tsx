import Clock from '../Clock/Clock';
import './HomePageBanner.scss';
import Button from '../../styles/Button.module.scss';
import DW_LOGO_IMG from '../../../public/images/dw_logo.png';

const HomePageBanner = () => {
  return (
    <div id="home-page-banner">
      <div id="left-banner-side">
        <img id="dw-logo" src={DW_LOGO_IMG} />
        <h4 id="banner-text">Twoja nowa perspektywa na EEIA</h4>
        <div id="banner-buttons">
          <button className={`${Button.button} ${Button.filled} ${Button.round}`}>
            Zapisz się
          </button>
          <button className={`${Button.button} ${Button.outlined} ${Button.round}`}>
            Dowiedz się więcej
          </button>
        </div>
      </div>
      <Clock />
    </div>
  );
};

export default HomePageBanner;
