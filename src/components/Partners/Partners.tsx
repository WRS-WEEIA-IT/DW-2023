import './Partners.scss';
import { useContext } from 'react';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import { m } from 'framer-motion';
import { cardViewportProperties, createAnimateOnScroll } from '../../animations/animateOnScroll';
import useFetchPartnersAndPatrons from '../../hooks/useFetchPartnersAndPatrons';
import { isInfoHidden } from '../../supabaseConfig';

const Partners = () => {
  const { languageMode } = useContext(LanguageModeContext);
  const {
    silverPartners,
    goldPartners,
    diamondPartners,
    strategicPartners,
    patrons,
    loading,
    error,
  } = useFetchPartnersAndPatrons();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
          {isInfoHidden ? (
            languageMode == 'polish' ? (
              <p className="text-center" id="info-hidden-text">
                Informacje o partnerach zostaną udostępnione wkrótce!
              </p>
            ) : (
              <p className="text-center" id="info-hidden-text">
                Information about partners will be available soon!
              </p>
            )
          ) : (
            strategicPartners.map((partner, index) => (
              <div key={index} className="strategic-container">
                <img
                  src={`${partner.imageSrc}`}
                  className="strategic-logo"
                  id={partner.name.toLowerCase()}></img>
              </div>
            ))
          )}
        </m.div>
        <h2 id="partners-header">{languageMode == 'polish' ? 'Partnerzy' : 'Partners'}</h2>
        <m.div
          className="diamond-section"
          initial="hidden"
          whileInView="visible"
          viewport={cardViewportProperties}
          variants={createAnimateOnScroll(0.1)}>
          {isInfoHidden ? (
            languageMode == 'polish' ? (
              <p className="text-center" id="info-hidden-text">
                Informacje o partnerach strategicznych zostaną udostępnione wkrótce!
              </p>
            ) : (
              <p className="text-center" id="info-hidden-text">
                Information about strategic partners will be available soon!
              </p>
            )
          ) : (
            diamondPartners &&
            diamondPartners.map((partner, index) => (
              <div key={index} className="diamond-container">
                <img
                  src={`${partner.imageSrc}`}
                  className="diamond-logo"
                  id={partner.name.toLowerCase()}></img>
              </div>
            ))
          )}
        </m.div>
        <m.div
          className="gold-section"
          initial="hidden"
          whileInView="visible"
          viewport={cardViewportProperties}
          variants={createAnimateOnScroll(0.1)}>
          {isInfoHidden
            ? null
            : goldPartners &&
              goldPartners.map((partner, index) => (
                <div key={index} className="gold-container">
                  <img
                    src={`${partner.imageSrc}`}
                    className="gold-logo"
                    id={partner.name.replace(' ', '_').toLowerCase()}></img>
                </div>
              ))}
        </m.div>
        <m.div
          className="silver-section"
          initial="hidden"
          whileInView="visible"
          viewport={cardViewportProperties}
          variants={createAnimateOnScroll(0.1)}>
          {isInfoHidden
            ? null
            : silverPartners &&
              silverPartners.map((partner, index) => (
                <div key={index} className="silver-container">
                  <img
                    src={`${partner.imageSrc}`}
                    className="silver-logo"
                    id={partner.name.toLowerCase()}></img>
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
          {isInfoHidden ? (
            languageMode == 'polish' ? (
              <p className="text-center" id="info-hidden-text">
                Informacje o patronach zostaną udostępnione wkrótce!
              </p>
            ) : (
              <p className="text-center" id="info-hidden-text">
                Information about patrons will be available soon!
              </p>
            )
          ) : (
            <div className="patrons-container">
              {patrons &&
                patrons.map((patron) => (
                  <img
                    src={patron.imageSrc}
                    className="patrons-logo"
                    id={patron.name.replaceAll(' ', '_').toLowerCase()}></img>
                ))}
            </div>
          )}
        </m.div>
      </div>
    </>
  );
};

export default Partners;
