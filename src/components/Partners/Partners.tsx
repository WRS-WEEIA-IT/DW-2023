import './Partners.scss';
import { firebaseDb } from '../../FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, Query } from 'firebase/firestore';
import PartnersInterface from './PartnersInterface';
import { number } from 'prop-types';

const Partners = () => {
  const [partners, loading] = useCollectionData<PartnersInterface>(
    collection(firebaseDb, 'partners') as Query<PartnersInterface>
  );

  if (loading) {
    return <h1>loading</h1>;
  }

  let diamondPackage: PartnersInterface[] = [];

  const renderPartners = () => {
    diamondPackage = partners!.filter((partner) => partner.package == 'diamond');
  };

  renderPartners();

  return (
    <div className="partners-container">
      {diamondPackage.map((partner, index) => (
        <div key={index}>
          <h2>{partner.name}</h2>
          <h3>{partner.package}</h3>
        </div>
      ))}
    </div>
  );
};

export default Partners;
