import React from 'react';
import { useState } from 'react';
import '../../styles/Clock.scss';

const Clock = () => {
  const ONE_MINUTE = 60000;
  const DW_FINAL_DATE = '2023-03-31';
  const ONE_HOUR = 3600000;
  const finalDate = new Date(DW_FINAL_DATE);

  const countDaysLeft = () => {
    const currentDate = new Date();
    return Math.floor((+finalDate.getTime() - +currentDate.getTime() + ONE_HOUR) / 86400000 + 1);
  };

  const [DaysLeft, setDaysLeft] = useState(countDaysLeft());

  setInterval(() => {
    setDaysLeft(countDaysLeft());
  }, ONE_MINUTE);

  return (
    <div className="counter-container">
      <p className="date-label">31 MARCA 2023</p>
      <h1 className="date-counter">{DaysLeft}</h1>
      <p className="counter-label">DNI DO WYDARZENIA</p>
    </div>
  );
};

export default Clock;
