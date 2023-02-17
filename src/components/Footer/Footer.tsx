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

const Footer = () => {
  const language = useContext(LanguageModeContext);

  const contactSection = () => {
    return (
      <div className="contact-section">
        <div>
          <h4>
            {language
              ? 'Masz jakieś pytania do organizatorów?'
              : 'Have you got any questions to organizers?'}
          </h4>
          <p id="no-margin-bot">{language ? 'Skontaktuj się z nami!' : 'Contact with us!'}</p>
        </div>
        <button className={` ${Button.button} ${Button.square} ${Button.filled}`}>Kontakt</button>
      </div>
    );
  };

  const footerSection = () => {
    return (
      <div className="footer-section">
        <div className="information-column" id="basic-column">
          <h4>{language ? 'Informacje' : 'Informations'}</h4>
          <p>{language ? 'O wydarzeniu' : 'About Event'}</p>
          <p>{language ? 'Szkolenia' : 'Training'}</p>
        </div>
        <div className="sponsors-column" id="basic-column">
          <h4>{language ? 'Sponsorzy' : 'Sponsors'}</h4>
          <p>HTD</p>
          <p>Commerzbank</p>
        </div>
        <div className="contact-column">
          <h4 id="column-span-2">{language ? 'Kontakt' : 'Contact'}</h4>
          <div className="column">
            <img src={CALL_ICON} className="icon" id="contact-icon"></img>
            <img src={LOCATION_ICON} className="icon" id="contact-icon"></img>
            <img src={MAIL_ICON} className="icon" id="contact-icon"></img>
          </div>
          <div className="column">
            <p>(48) 123 456 789</p>
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
        <p>Dzień Wydziału EEIA 2023 - ALL Rights Reserved</p>
        <div className="social-media-icon">
          <img src={FACEBOOK_ICON}></img>
          <img src={INSTAGRAM_ICON}></img>
        </div>
      </div>
    </div>
  );
};

export default Footer;
