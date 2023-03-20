import './Partners.scss';
import { useContext } from 'react';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import { m } from 'framer-motion';
import { cardViewportProperties, createAnimateOnScroll } from '../../animations/animateOnScroll';
import {
  SILVER_PARTNERS as silverPartners,
  GOLD_PARTNERS as goldPartners,
  DIAMOND_PARTNERS as diamondPartners,
  STRATEGIC_PARTNERS as strategicPartners,
} from './PartnersData';

const Partners = () => {
  const { languageMode } = useContext(LanguageModeContext);

  const getImageUrl = (name: string) => {
    return new URL(`../../../public/logos/${name}.png`, import.meta.url).href;
  };

  return (
    <>
      <div className="partners-container">
        <div className="wave-image">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"></path>
          </svg>
        </div>
        <h2 id="strategic-partners-header">
          {languageMode == 'polish' ? 'Partnerzy strategiczni' : 'Strategic partners'}
        </h2>
        <m.div
          className="strategic-section"
          initial="hidden"
          whileInView="visible"
          viewport={cardViewportProperties}
          variants={createAnimateOnScroll(0.1)}>
          {strategicPartners.map((partner, index) => (
            <div key={index} className="strategic-container">
              <img
                src={getImageUrl(partner.imageSource)}
                className="strategic-logo"
                id={partner.imageSource}></img>
            </div>
          ))}
        </m.div>
        <h2 id="partners-header">{languageMode == 'polish' ? 'Partnerzy' : 'Partners'}</h2>
        <m.div
          className="diamond-section"
          initial="hidden"
          whileInView="visible"
          viewport={cardViewportProperties}
          variants={createAnimateOnScroll(0.1)}>
          {diamondPartners.map((partner, index) => (
            <div key={index} className="diamond-container">
              <img
                src={getImageUrl(partner.imageSource)}
                className="diamond-logo"
                id={partner.imageSource}></img>
            </div>
          ))}
        </m.div>
        <m.div
          className="gold-section"
          initial="hidden"
          whileInView="visible"
          viewport={cardViewportProperties}
          variants={createAnimateOnScroll(0.1)}>
          {goldPartners.map((partner, index) => (
            <div key={index} className="gold-container">
              <img src={getImageUrl(partner.imageSource)} className="gold-logo"></img>
            </div>
          ))}
        </m.div>
        <m.div
          className="silver-section"
          initial="hidden"
          whileInView="visible"
          viewport={cardViewportProperties}
          variants={createAnimateOnScroll(0.1)}>
          {silverPartners.map((partner, index) => (
            <div key={index} className="silver-container">
              <img
                src={getImageUrl(partner.imageSource)}
                className="silver-logo"
                id={partner.imageSource}></img>
            </div>
          ))}
        </m.div>
        <h2 id="patrons-header">{languageMode == 'polish' ? 'Patronat' : 'Patronage'}</h2>
        <m.div
          className="patrons-section"
          initial="hidden"
          whileInView="visible"
          viewport={cardViewportProperties}
          variants={createAnimateOnScroll(0.1)}>
          <div className="patrons-container">
            <img src={getImageUrl('mlodzi_w_lodzi')} className="patrons-logo"></img>
          </div>
        </m.div>
      </div>
    </>
  );
};

export default Partners;
