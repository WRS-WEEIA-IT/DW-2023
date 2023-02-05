import React from 'react';
import { useState } from 'react';
import '../../styles/Clock.scss';

const Clock = () => {
  const ONE_MINUTE = 60000;
  const DW_FINAL_DATE = '2023-03-31';
  const ONE_HOUR = 3600000;
  const ONE_DAY = 86400000;
  const finalDate = new Date(DW_FINAL_DATE);

  const countDaysLeft = () => {
    const currentDate = new Date();
    const counterResult: number = Math.floor(
      (+finalDate.getTime() - +currentDate.getTime() + ONE_HOUR) / ONE_DAY + 1
    );
    if (counterResult > 0) {
      return counterResult;
    } else if (counterResult === 0) {
      return 0;
    } else {
      return counterResult;
    }
  };

  const [DaysLeft, setDaysLeft] = useState(countDaysLeft());

  setInterval(() => {
    setDaysLeft(countDaysLeft());
  }, ONE_MINUTE);

  const setCounterInfo = () => {
    const isCounterValid = countDaysLeft();
    if (isCounterValid > 0) {
      return (
        <>
          <p className="date-label">31 MARCA 2023</p>
          <h1 className="date-counter">{DaysLeft}</h1>
          <p className="counter-label">DNI DO WYDARZENIA</p>
        </>
      );
    } else if (isCounterValid === 0) {
      return (
        <>
          <h3 className="date-counter-actual">Wydarzenie</h3>
          <h2 className="counter-label-actual">Trwa</h2>
        </>
      );
    } else {
      return (
        <>
          <p className="date-label">Wydarzenie odbyło się</p>
          <h1 className="date-counter">{-DaysLeft}</h1>
          <p className="counter-label">DNI TEMU</p>
        </>
      );
    }
  };

  return <div className="counter-container">{setCounterInfo()}</div>;
};

export default Clock;
