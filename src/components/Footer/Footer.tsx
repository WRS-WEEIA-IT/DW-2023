import './Footer.scss';
import CALL_ICON from '../../assets/icons/call.svg';
import LOCATION_ICON from '../../assets/icons/location.svg';
import MAIL_ICON from '../../assets/icons/mail.svg';
import FACEBOOK_ICON from '../../assets/icons/fb-purple.svg';
import INSTAGRAM_ICON from '../../assets/icons/insta-purple.svg';
import { useContext } from 'react';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import '../../styles/Constants.scss';
import { HashLink as Link } from 'react-router-hash-link';
import Modal from '../Modal/Modal';
import APP_STORE_ICON_PL from '../../assets/icons/app-store-pl.svg';
import APP_STORE_ICON_EN from '../../assets/icons/app-store-en.svg';
import GOOGLE_PLAY_ICON_PL from '../../assets/icons/google-play-pl.png';
import GOOGLE_PLAY_ICON_EN from '../../assets/icons/google-play-en.png';
import { APP_STORE_APP_LINK, GOOGLE_PLAY_APP_LINK } from '../../services/Links';

const Footer = () => {
  const { languageMode } = useContext(LanguageModeContext);

  const mobileAppsSection = () => {
    return (
      <div id="mobile-apps-section">
        <div>
          <h4 id="mobile-apps-section-label">
            {languageMode == 'polish' ? 'Pobierz naszą aplikację!' : 'Download our app!'}
          </h4>
          <p className="section-description">
            {languageMode == 'polish'
              ? 'Wykonuj zadania i walcz o nagrody!'
              : 'Complete tasks and fight for prizes!'}
          </p>
        </div>
        <div id="mobile-apps-icons-container">
          <a href={APP_STORE_APP_LINK} target="blank">
            <img
              src={languageMode == 'polish' ? APP_STORE_ICON_PL : APP_STORE_ICON_EN}
              id="apple-icon"
            />
          </a>
          <a href={GOOGLE_PLAY_APP_LINK} target="blank">
            <img
              src={languageMode == 'polish' ? GOOGLE_PLAY_ICON_PL : GOOGLE_PLAY_ICON_EN}
              id={languageMode == 'polish' ? 'google-icon-pl' : 'google-icon-en'}
            />
          </a>
        </div>
      </div>
    );
  };

  const contactSection = () => {
    return (
      <div id="contact-section">
        <div>
          <h4 id="contact-section-label">
            {languageMode == 'polish'
              ? 'Masz jakieś pytania do organizatorów?'
              : 'Have you got any questions to organizers?'}
          </h4>
          <p className="section-description">
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
          <h4 className="footer-header">
            {languageMode == 'polish' ? 'Informacje' : 'Information'}
          </h4>
          <Link to="#about-section" className="footer-link" smooth>
            <p className="footer-paragraph">
              {languageMode == 'polish' ? 'O wydarzeniu' : 'About event'}
            </p>
          </Link>
          <Link to="#events-section" className="footer-link" smooth>
            <p>{languageMode == 'polish' ? 'Szkolenia i warsztaty' : 'Lectures and workshops'}</p>
          </Link>
        </div>
        <div id="partners-column">
          <h4 className="footer-header">
            {languageMode == 'polish' ? 'Partnerzy strategiczni' : 'Strategic partners'}
          </h4>
          <div id="partners-grid">
            <a
              className="footer-link"
              href="https://pl.pg.com/"
              target="_blank"
              rel="noopener noreferrer">
              <p className="footer-paragraph">P&G</p>
            </a>
            <a
              className="footer-link"
              href="https://lodz.commerzbank.pl/pl/"
              target="_blank"
              rel="noopener noreferrer">
              <p className="footer-paragraph">Commerzbank</p>
            </a>
          </div>
        </div>
        <div id="contact-column">
          <h4 className="footer-header" id="contact-header">
            {languageMode == 'polish' ? 'Kontakt' : 'Contact'}
          </h4>
          <div id="contact-icons-column">
            <img src={LOCATION_ICON} className="icon" id="contact-icon"></img>
            <img src={MAIL_ICON} className="icon" id="contact-icon"></img>
            <img src={CALL_ICON} className="icon" id="contact-icon"></img>
          </div>
          <div id="contact-text-column">
            <p className="footer-paragraph">Stefanowskiego 18/22, Łódź</p>
            <p className="footer-paragraph">dzien.weeia@samorzad.p.lodz.pl</p>
            <p className="footer-paragraph">(+48) 733 487 452 - Konrad</p>
          </div>
        </div>
      </div>
    );
  };

  const allRightsReservedSection = () => {
    return (
      <div id="all-rights-reserved-section">
        <p>Dzień Wydziału EEIA 2024 - All Rights Reserved</p>
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
      {mobileAppsSection()}
      {contactSection()}
      {mainFooterSection()}
      {allRightsReservedSection()}
    </div>
  );
};

export default Footer;
