import './Partners.scss';
import { firebaseDb } from '../../FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, Query } from 'firebase/firestore';
import PartnersInterface from './PartnersInterface';

const Partners = () => {
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
    <div className="partners-container">
      <h2 id="strategic-partners-header">Partnerzy strategiczni</h2>
      <div className="strategic-section">
        {strategicPackage.map((partner, index) => (
          <div key={index} className="strategic-container">
            <img
              src={`../../../public/logos/${partner.imageSource}.png`}
              className="strategic-logo"></img>
          </div>
        ))}
      </div>
      <h2 id="partners-header">Partnerzy</h2>
      <div className="diamond-section">
        {diamondPackage.map((partner, index) => (
          <div key={index} className="diamond-container">
            <img
              src={`../../../public/logos/${partner.imageSource}.png`}
              className="diamond-logo"></img>
          </div>
        ))}
      </div>
      <div className="gold-section">
        {goldPackage.map((partner, index) => (
          <div key={index} className="gold-container">
            <img
              src={`../../../public/logos/${partner.imageSource}.png`}
              className="gold-logo"></img>
          </div>
        ))}
      </div>
      <div className="silver-section">
        {silverPackage.map((partner, index) => (
          <div key={index} className="silver-container">
            <img
              src={`../../../public/logos/${partner.imageSource}.png`}
              className="silver-logo"></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
