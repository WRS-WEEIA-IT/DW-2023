import React from 'react';
import Card from '../Card/Card';
import '../../styles/CardGrid.scss';

const CardGrid = ({ CardsName }: { CardsName: string[] }) => {
  const moreThanFour = true;
  const CARDS_IN_ROW = 4;

  return (
    <div className="grid-container">
      {CardsName.map(
        (name: string, index: number) =>
          (index < CARDS_IN_ROW && (
            <Card
              key={index}
              imageSrc="../../assets/worshopImage2.png"
              eventType="training"
              title={name}
            />
          )) ||
          (index >= CARDS_IN_ROW && moreThanFour && (
            <Card
              key={index}
              imageSrc="../../assets/worshopImage2.png"
              eventType="training"
              title={name}
            />
          ))
      )}
    </div>
  );
};

export default CardGrid;
