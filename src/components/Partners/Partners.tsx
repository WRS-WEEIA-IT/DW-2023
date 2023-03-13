import './Partners.scss';
import { firebaseDb } from '../../FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, Query } from 'firebase/firestore';
import PartnersInterface from './PartnersInterface';
import { useContext } from 'react';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import { m } from 'framer-motion';
import { cardViewportProperties, createAnimateOnScroll } from '../../animations/animateOnScroll';

const Partners = () => {
  const { languageMode } = useContext(LanguageModeContext);

  const [partners, loading] = useCollectionData<PartnersInterface>(
    collection(firebaseDb, 'partners') as Query<PartnersInterface>
  );

  if (loading) {
    return <h1>loading</h1>;
  }

  let diamondPackage: PartnersInterface[] = [];
  let goldPackage: PartnersInterface[] = [];
  let silverPackage: PartnersInterface[] = [];
  let strategicPackage: PartnersInterface[] = [];

  const filterPartners = () => {
    diamondPackage = partners!.filter((partner) => partner.package == 'diamond');
    goldPackage = partners!.filter((partner) => partner.package == 'gold');
    silverPackage = partners!.filter((partner) => partner.package == 'silver');
    strategicPackage = partners!.filter((partner) => partner.package == 'strategic');
  };

  filterPartners();

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
          {strategicPackage.map((partner, index) => (
            <div key={index} className="strategic-container">
              <img
                src={`../../../public/logos/${partner.imageSource}.png`}
                className="strategic-logo"></img>
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
          {diamondPackage.map((partner, index) => (
            <div key={index} className="diamond-container">
              <img
                src={`../../../public/logos/${partner.imageSource}.png`}
                className="diamond-logo"></img>
            </div>
          ))}
        </m.div>
        <m.div
          className="gold-section"
          initial="hidden"
          whileInView="visible"
          viewport={cardViewportProperties}
          variants={createAnimateOnScroll(0.1)}>
          {goldPackage.map((partner, index) => (
            <div key={index} className="gold-container">
              <img
                src={`../../../public/logos/${partner.imageSource}.png`}
                className="gold-logo"></img>
            </div>
          ))}
        </m.div>
        <m.div
          className="silver-section"
          initial="hidden"
          whileInView="visible"
          viewport={cardViewportProperties}
          variants={createAnimateOnScroll(0.1)}>
          {silverPackage.map((partner, index) => (
            <div key={index} className="silver-container">
              <img
                src={`../../../public/logos/${partner.imageSource}.png`}
                className="silver-logo"></img>
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
            <img src="../../../public/logos/mlodzi_w_lodzi.png" className="patrons-logo"></img>
          </div>
        </m.div>
      </div>
    </>
  );
};

export default Partners;
