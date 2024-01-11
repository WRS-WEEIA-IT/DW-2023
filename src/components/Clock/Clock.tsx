import { useState, useContext } from 'react';
import './Clock.scss';
import { LanguageModeContext } from '../../contexts/LanguageContext';

const Clock = () => {
  const ONE_MINUTE = 60000;
  const ONE_HOUR = 3600000;
  const ONE_DAY = 86400000;
  const DW_EVENT_DATE = '2024-03-20';
  const eventDate = new Date(DW_EVENT_DATE);

  const countDaysLeft = () => {
    const currentDate = new Date();
    const counterResult: number = Math.floor(
      (+eventDate.getTime() - +currentDate.getTime() + ONE_HOUR) / ONE_DAY + 1
    );
    return counterResult != 0 ? counterResult : 0;
  };

  const [daysLeft, setDaysLeft] = useState(countDaysLeft());
  const { languageMode } = useContext(LanguageModeContext);

  setInterval(() => {
    setDaysLeft(countDaysLeft());
  }, ONE_MINUTE);

  const setCounterInfo = () => {
    if (daysLeft > 0) {
      return (
        <>
          <p className="date-label">
            {languageMode == 'polish' ? '20 MARCA 2024' : '20 MARCH 2024'}
          </p>
          <h1 className="date-counter">{daysLeft}</h1>
          <p className="counter-label">
            {daysLeft == 1
              ? languageMode == 'polish'
                ? 'DZIEŃ DO WYDARZENIA'
                : 'DAY TO EVENT'
              : languageMode == 'polish'
              ? 'DNI DO WYDARZENIA'
              : 'DAYS TO EVENT'}
          </p>
        </>
      );
    } else if (daysLeft === 0) {
      return (
        <>
          <h3 className="ongoing-event-label">
            {languageMode == 'polish' ? 'Wydarzenie' : 'The event'}
          </h3>
          <h2 className="ongoing-event-header">
            {languageMode == 'polish' ? 'Trwa' : 'Has begun'}
          </h2>
        </>
      );
    } else {
      return (
        <>
          <p className="date-label">
            {languageMode == 'polish' ? 'Wydarzenie odbyło się' : 'The event was'}
          </p>
          <h1 className="date-counter">{-daysLeft}</h1>
          <p className="counter-label">
            {daysLeft == -1
              ? languageMode == 'polish'
                ? 'DZIEŃ TEMU'
                : 'DAY AGO'
              : languageMode == 'polish'
              ? 'DNI TEMU'
              : 'DAYS AGO'}
          </p>
        </>
      );
    }
  };

  return <div className="counter-container">{setCounterInfo()}</div>;
};

export default Clock;
