import React from 'react';
import Card from '../Card/Card';
import '../../styles/CardGrid.scss'



const CardGrid = ({ CardsName }: { CardsName: string[] }) => {
  return (
    <div className='cards-container'>
      {CardsName.map((name: string, index: number) => (
        <Card key={index} imageSrc='../../assets/worshopImage2.png' eventType="training" title={name} />
      ))}
    </div>
  );
};

export default CardGrid;
