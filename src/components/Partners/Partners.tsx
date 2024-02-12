import './Partners.scss';
import { useContext, useEffect, useState } from 'react';
import { LanguageModeContext } from '../../contexts/LanguageContext';
import { m } from 'framer-motion';
import { cardViewportProperties, createAnimateOnScroll } from '../../animations/animateOnScroll';
import { STRATEGIC_PARTNERS as strategicPartners } from './PartnersData';
import { firebaseDb } from '../../FirebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

type Partner = {
  imageSrc: string;
  name: string;
  package: string;
  url: string;
};

type Patron = {
  name: string;
  url: string;
};

const Partners = () => {
  const { languageMode } = useContext(LanguageModeContext);
  const storage = getStorage();
  const partnersRef = collection(firebaseDb, 'partners');
  const [silverPartners, setSilverPartners] = useState<Partner[]>([]);
  const [goldPartners, setGoldPartners] = useState<Partner[]>([]);
  const [diamondPartners, setDiamondPartners] = useState<Partner[]>([]);
  const [patrons, setPatrons] = useState<Patron[]>([]);

  useEffect(() => {
    const getPartners = async () => {
      try {
        const data = await getDocs(partnersRef);
        const partnersArray: Partner[] = [];

        const promises = data.docs.map(async (doc) => {
          const partner = { ...doc.data() };
          const imgRef = ref(storage, `partnerzy/${partner.name.toLowerCase()}.png`);

          try {
            const url = await getDownloadURL(imgRef);
            partner.url = url;
          } catch (error) {
            console.error(error);
          }

          partnersArray.push(partner as Partner);
        });

        await Promise.all(promises);

        const diamondPartners = partnersArray.filter((partner) => partner.package === 'diamond');
        const goldPartners = partnersArray.filter((partner) => partner.package === 'gold');
        const silverPartners = partnersArray.filter((partner) => partner.package === 'silver');

        setDiamondPartners(
          diamondPartners.sort((a, b) => a.name.localeCompare(b.name)) as Partner[]
        );
        setGoldPartners(goldPartners.sort((a, b) => a.name.localeCompare(b.name)) as Partner[]);
        setSilverPartners(silverPartners.sort((a, b) => a.name.localeCompare(b.name)) as Partner[]);
      } catch (error) {
        console.error(error);
      }
    };

    const getPatrons = async () => {
      try {
        const patronsArray: Patron[] = [];
        const data = await getDocs(collection(firebaseDb, 'patrons'));
        const patronsPromises = data.docs.map(async (doc) => {
          const patron = { ...doc.data() };
          const imgRef = ref(
            storage,
            `patrons/${patron.name.replaceAll(' ', '_').toLowerCase()}.png`
          );

          try {
            const url = await getDownloadURL(imgRef);
            patron.url = url;
          } catch (error) {
            console.error(error);
          }

          patronsArray.push(patron as Patron);
        });

        await Promise.all(patronsPromises);

        setPatrons(patronsArray.sort((a, b) => a.name.localeCompare(b.name)) as Patron[]);
      } catch (error) {
        console.error(error);
      }
    };

    getPartners();
    getPatrons();
  }, []);

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
          {diamondPartners &&
            diamondPartners.map((partner, index) => (
              <div key={index} className="diamond-container">
                <img
                  src={`${partner.url}`}
                  className="diamond-logo"
                  id={partner.name.toLowerCase()}></img>
              </div>
            ))}
        </m.div>
        <m.div
          className="gold-section"
          initial="hidden"
          whileInView="visible"
          viewport={cardViewportProperties}
          variants={createAnimateOnScroll(0.1)}>
          {goldPartners &&
            goldPartners.map((partner, index) => (
              <div key={index} className="gold-container">
                <img
                  src={`${partner.url}`}
                  className="gold-logo"
                  id={partner.name.toLowerCase()}></img>
              </div>
            ))}
        </m.div>
        <m.div
          className="silver-section"
          initial="hidden"
          whileInView="visible"
          viewport={cardViewportProperties}
          variants={createAnimateOnScroll(0.1)}>
          {silverPartners &&
            silverPartners.map((partner, index) => (
              <div key={index} className="silver-container">
                <img
                  src={`${partner.url}`}
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
          <div className="patrons-container">
            {patrons &&
              patrons.map((patron) => (
                <img
                  src={patron.url}
                  className="patrons-logo"
                  id={patron.name.replaceAll(' ', '_').toLowerCase()}></img>
              ))}
          </div>
        </m.div>
      </div>
    </>
  );
};

export default Partners;
