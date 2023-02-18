import './Footer.scss';
import Button from '../../styles/Button.module.scss';
import CALL_ICON from '../../assets/icons/call.svg';
import LOCATION_ICON from '../../assets/icons/location.svg';
import MAIL_ICON from '../../assets/icons/mail.svg';
import FACEBOOK_ICON from '../../assets/icons/fb.svg';
import INSTAGRAM_ICON from '../../assets/icons/insta.svg';
import { useContext } from 'react';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import '../../styles/Constants.scss';
import { HashLink as Link } from 'react-router-hash-link';

const Footer = () => {
  const { languageMode } = useContext(LanguageModeContext);

  const contactSection = () => {
    return (
      <div className="contact-section">
        <div>
          <h4>
            {languageMode == 'polish'
              ? 'Masz jakieś pytania do organizatorów?'
              : 'Have you got any questions to organizers?'}
          </h4>
          <p id="contact-text">
            {languageMode == 'polish' ? 'Skontaktuj się z nami!' : 'Contact us!'}
          </p>
        </div>
        <button className={` ${Button.button} ${Button.square} ${Button.filled}`}>
          {languageMode == 'polish' ? 'Skontaktuj się z nami' : 'Contact us'}
        </button>
      </div>
    );
  };

  const footerSection = () => {
    return (
      <div className="footer-section">
        <div className="information-column">
          <h4>{languageMode == 'polish' ? 'Informacje' : 'Information'}</h4>
          <Link to="#about-section" className="footer-link" smooth>
            <p>{languageMode == 'polish' ? 'O wydarzeniu' : 'About event'}</p>
          </Link>
          <Link to="#events-section" className="footer-link" smooth>
            <p>{languageMode == 'polish' ? 'Szkolenia i warsztaty' : 'Lectures and workshops'}</p>
          </Link>
        </div>
        <div className="sponsors-column">
          <h4>{languageMode == 'polish' ? 'Partnerzy' : 'Partners'}</h4>
          <p>HTD</p>
          <p>Commerzbank</p>
        </div>
        <div className="contact-column">
          <h4 id="contact-header">{languageMode == 'polish' ? 'Kontakt' : 'Contact'}</h4>
          <div className="column">
            <img src={CALL_ICON} className="icon" id="contact-icon"></img>
            <img src={LOCATION_ICON} className="icon" id="contact-icon"></img>
            <img src={MAIL_ICON} className="icon" id="contact-icon"></img>
          </div>
          <div className="column">
            <p>(+48) 123 456 789</p>
            <p>Stefanowskiego 18/22, Łódź</p>
            <p>dzien.weeia@samorzad.p.lodz.pl</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="footer-container" id="footer-section">
      {contactSection()}
      {footerSection()}
      <div className="rights-section">
        <p>Dzień Wydziału EEIA 2023 - All Rights Reserved</p>
        <div className="social-media-icons">
          <Link
            className="icon-link"
            target="_blank"
            rel="noopener noreferrer"
            to="https://www.facebook.com/events/660013089462906/">
            <img src={FACEBOOK_ICON} />
          </Link>
          <Link
            className="icon-link"
            target="_blank"
            rel="noopener noreferrer"
            to="https://www.instagram.com/weeia_/">
            <img src={INSTAGRAM_ICON} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
