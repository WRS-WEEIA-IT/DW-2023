import './Advertisements.scss';
import { m } from 'framer-motion';
import { useEffect, useState } from 'react';
import useFetchAdvertisements from '../../hooks/useFetchAdvertisements';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

const Advertisements = () => {
  const { advertisements, loading, error } = useFetchAdvertisements();
  const { windowWidth } = useWindowDimensions();

  const visibleCount = windowWidth <= 800 ? 1 : 2;
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (!advertisements || advertisements.length <= visibleCount) return;

    const interval = setInterval(() => {
      setStartIndex(i => (i + 1) % advertisements.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [advertisements, visibleCount]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const visibleAds = [];
  for (let i = 0; i < visibleCount; i++) {
    const adIndex = (startIndex + i) % advertisements.length;
    visibleAds.push(advertisements[adIndex]);
  }

  return (
    <div id="advertisement-section">
      {visibleCount === 1 ? (
        <m.div id="advertisement-container">
          {visibleAds.map(ad => {
            const imageUrl = ad.imageSrc || (ad as any).link || '';
            return (
              <img
                key={ad.id}
                id={ad.name}
                src={imageUrl}
                className="advertisement-image"
                alt={ad.name}
              />
            );
          })}
        </m.div>
      ) : (
        <>
          <m.div className="advertisement-container">
            {visibleAds[0] && (
              <img
                key={visibleAds[0].id}
                id={visibleAds[0].name}
                src={visibleAds[0].imageSrc || (visibleAds[0] as any).link || ''}
                className="advertisement-image"
                alt={visibleAds[0].name}
              />
            )}
          </m.div>
          <m.div className="advertisement-container">
            {visibleAds[1] && (
              <img
                key={visibleAds[1].id}
                id={visibleAds[1].name}
                src={visibleAds[1].imageSrc || (visibleAds[1] as any).link || ''}
                className="advertisement-image"
                alt={visibleAds[1].name}
              />
            )}
          </m.div>
        </>
      )}
    </div>
  );
};

export default Advertisements;