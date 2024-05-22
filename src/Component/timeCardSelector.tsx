import React, { useState } from "react";

const timeCards: string[] = ["1", "2", "3", "5", "8", "13", "21"];

const TimeCardSelector: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleSelectCard = (card: string) => {
    setSelectedCard(card);
  };

  return (
    <div>
      <h2>Select Time Card</h2>
      <ul>
        {timeCards.map((card) => (
          <li key={card} onClick={() => handleSelectCard(card)}>
            {card}
          </li>
        ))}
      </ul>
      {selectedCard && <p>Selected Card: {selectedCard}</p>}
    </div>
  );
};

export default TimeCardSelector;
