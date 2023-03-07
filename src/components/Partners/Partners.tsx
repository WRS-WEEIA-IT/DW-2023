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

  const filterPartners = () => {
    diamondPackage = partners!.filter((partner) => partner.package == 'diamond');
    goldPackage = partners!.filter((partner) => partner.package == 'gold');
    silverPackage = partners!.filter((partner) => partner.package == 'silver');
  };

  filterPartners();

  const consoleLog = (name: string) => {
    console.log(name.replace('/', ' '));
  };

  return (
    <div className="partners-container">
      <div className="diamond-section">
        {diamondPackage.map((partner, index) => (
          <div key={index} className="diamond-container">
            <img src={`../../../public/logos/${partner.name}.png`} className="diamond-logo"></img>
            {/* <h3 className="diamond-name">{partner.name}</h3> */}
          </div>
        ))}
      </div>
      <div className="gold-section">
        {goldPackage.map((partner, index) => (
          <div key={index} className="gold-container">
            <img
              src={`../../../public/logos/${partner.name.replaceAll('/', ' ')}.png`}
              className="gold-logo"></img>
            {/* <h4 className="gold-name">{partner.name}</h4> */}
          </div>
        ))}
      </div>
      <div className="silver-section">
        {silverPackage.map((partner, index) => (
          <div key={index} className="silver-container">
            <img src={`../../../public/logos/${partner.name}.png`} className="silver-logo"></img>
            {/* <h5 className="silver-name">{partner.name}</h5> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
