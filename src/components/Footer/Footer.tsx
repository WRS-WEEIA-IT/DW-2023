import './Footer.scss';
import CALL_ICON from '../../assets/icons/call.svg';
import LOCATION_ICON from '../../assets/icons/location.svg';
import MAIL_ICON from '../../assets/icons/mail.svg';
import FACEBOOK_ICON from '../../assets/icons/fb.svg';
import INSTAGRAM_ICON from '../../assets/icons/insta.svg';
import { useContext } from 'react';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import '../../styles/Constants.scss';
<<<<<<< HEAD
import { HashLink as Link } from 'react-router-hash-link';
=======
import Modal from '../Modal/Modal';
>>>>>>> 5291e98 (Add modal to page)

const Footer = () => {
  const { languageMode } = useContext(LanguageModeContext);

  const contactSection = () => {
    return (
      <div id="contact-section">
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
        <Modal />
      </div>
    );
  };

  const mainFooterSection = () => {
    return (
      <div id="main-footer-section">
        <div id="information-column">
          <h4>{languageMode == 'polish' ? 'Informacje' : 'Information'}</h4>
          <Link to="#about-section" className="footer-link" smooth>
            <p>{languageMode == 'polish' ? 'O wydarzeniu' : 'About event'}</p>
          </Link>
          <Link to="#events-section" className="footer-link" smooth>
            <p>{languageMode == 'polish' ? 'Szkolenia i warsztaty' : 'Lectures and workshops'}</p>
          </Link>
        </div>
        <div id="partners-column">
          <h4>{languageMode == 'polish' ? 'Partnerzy' : 'Partners'}</h4>
          <div id="partners-grid">
            <p>B/S/H</p>
            <p>Ericsson</p>
            <p>JTI</p>
            <p>HTD</p>
          </div>
        </div>
        <div id="contact-column">
          <h4 id="contact-header">{languageMode == 'polish' ? 'Kontakt' : 'Contact'}</h4>
          <div id="contact-icons-column">
            <img src={CALL_ICON} className="icon" id="contact-icon"></img>
            <img src={LOCATION_ICON} className="icon" id="contact-icon"></img>
            <img src={MAIL_ICON} className="icon" id="contact-icon"></img>
          </div>
          <div id="contact-text-column">
            <p>(+48) 123 456 789</p>
            <p>Stefanowskiego 18/22, Łódź</p>
            <p>dzien.weeia@samorzad.p.lodz.pl</p>
          </div>
        </div>
      </div>
    );
  };

  const allRightsReservedSection = () => {
    return (
      <div id="all-rights-reserved-section">
        <p>Dzień Wydziału EEIA 2023 - All Rights Reserved</p>
        <div id="social-media-icons-container">
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
    );
  };

  return (
    <div id="footer-section">
      {contactSection()}
      {mainFooterSection()}
      {allRightsReservedSection()}
    </div>
  );
};

export default Footer;
