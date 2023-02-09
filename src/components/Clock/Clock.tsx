import { useState, useContext } from 'react';
import './Clock.scss';
import { LanguageModeContext } from '../../contexts/LanguageContext';

const Clock = () => {
  const ONE_MINUTE = 60000;
  const ONE_HOUR = 3600000;
  const ONE_DAY = 86400000;
  const DW_FINAL_DATE = '2023-02-09';
  const finalDate = new Date(DW_FINAL_DATE);

  const countDaysLeft = () => {
    const currentDate = new Date();
    const counterResult: number = Math.floor(
      (+finalDate.getTime() - +currentDate.getTime() + ONE_HOUR) / ONE_DAY + 1
    );
    return counterResult != 0 ? counterResult : 0;
  };

  const [daysLeft, setDaysLeft] = useState(countDaysLeft());
  const language = useContext(LanguageModeContext);

  setInterval(() => {
    setDaysLeft(countDaysLeft());
  }, ONE_MINUTE);

  const setCounterInfo = () => {
    if (daysLeft > 0) {
      return (
        <>
          <p className="date-label">{language == 'polish' ? '31 MARCA 2023' : '31 MARCH 2023'}</p>
          <h1 className="date-counter">{daysLeft}</h1>
          <p className="counter-label">
            {language == 'polish' ? 'DNI DO WYDARZENIA' : 'DAYS TO EVENT'}
          </p>
        </>
      );
    } else if (daysLeft === 0) {
      return (
        <>
          <h3 className="ongoing-event-label">
            {language == 'polish' ? 'Wydarzenie' : 'The event'}
          </h3>
          <h2 className="ongoing-event-header">{language == 'polish' ? 'Trwa' : 'Has begun'}</h2>
        </>
      );
    } else {
      return (
        <>
          <p className="date-label">
            {language == 'polish' ? 'Wydarzenie odbyło się' : 'The event was'}
          </p>
          <h1 className="date-counter">{-daysLeft}</h1>
          <p className="counter-label">{language == 'polish' ? 'DNI TEMU' : 'DAYS AGO'}</p>
        </>
      );
    }
  };

  return <div className="counter-container">{setCounterInfo()}</div>;
};

export default Clock;
