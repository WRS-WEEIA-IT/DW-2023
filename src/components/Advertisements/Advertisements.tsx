import './Advertisements.scss';
import { m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import useFetchAdvertisements from '../../hooks/useFetchAdvertisements';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

const Advertisements = () => {
  const { advertisements, loading, error } = useFetchAdvertisements();
  const { windowWidth } = useWindowDimensions();

  const visibleCount = windowWidth <= 800 ? 1 : 2;
  const [startIndex, setStartIndex] = useState(0);
  const isInitialIndexSet = useRef(false);

  useEffect(() => {
    if (isInitialIndexSet.current || advertisements.length === 0) return;

    const randomStartIndex = Math.floor(Math.random() * advertisements.length);
    setStartIndex(randomStartIndex);
    isInitialIndexSet.current = true;
  }, [advertisements.length]);

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

  if (advertisements.length === 0) {
    return <div id="advertisement-section" />;
  }

  const visibleAds = [];
  for (let i = 0; i < Math.min(visibleCount, advertisements.length); i++) {
    const adIndex = (startIndex + i) % advertisements.length;
    const advertisement = advertisements[adIndex];

    if (advertisement) {
      visibleAds.push(advertisement);
    }
  }

  const renderAd = (ad: (typeof advertisements)[number]) => {
    const image = (
      <img
        id={ad.name}
        src={ad.imageSrc || ''}
        className="advertisement-image"
        alt={ad.name}
      />
    );

    if (!ad.link) {
      return image;
    }

    return (
      <a href={ad.link} target="_blank" rel="noopener noreferrer">
        {image}
      </a>
    );
  };

  return (
    <div id="advertisement-section">
      {visibleCount === 1 ? (
        <m.div className="advertisement-container">
          {visibleAds.map(ad => (
            <div key={ad.id}>{renderAd(ad)}</div>
          ))}
        </m.div>
      ) : (
        <>
          <m.div className="advertisement-container">
            {visibleAds[0] && (
              <div key={visibleAds[0].id}>{renderAd(visibleAds[0])}</div>
            )}
          </m.div>
          <m.div className="advertisement-container">
            {visibleAds[1] && (
              <div key={visibleAds[1].id}>{renderAd(visibleAds[1])}</div>
            )}
          </m.div>
        </>
      )}
    </div>
  );
};

export default Advertisements;