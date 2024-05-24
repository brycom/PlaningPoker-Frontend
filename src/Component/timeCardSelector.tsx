import axios from "axios";
import React, { useState } from "react";

interface Vote {
  userId: string;
  vote: number;
}
interface Prop {
  url: string;
}

const timeCards: number[] = [1, 2, 3, 5, 8, 13, 21];

const TimeCardSelector: React.FC<Prop> = (url) => {
  const [selectedCard, setSelectedCard] = useState<number>();

  const [vote, setVote] = useState<Vote[]>([]);

  const token = localStorage.getItem("auth_token");

  const handleSelectCard = (card: number) => {
    setSelectedCard(card);
  };

  const newVote: Partial<Vote> = {
    userId: "664f3bf387a63648a882722a",
    vote: selectedCard,
  };

  const handleAddVote = async (projectId: string, issueId: string) => {
    console.log(projectId, issueId);
    try {
      const res = await axios.post<Vote>(
        url + `/vote/uservote/${projectId}/${issueId}`,
        newVote,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data: " + res.data);
      setVote([...vote, res.data]);
    } catch (error) {
      console.error("Error adding issue", error);
    }
  };

  return (
    <div>
      <h2>Select Time Card</h2>
      <ul>
        {timeCards.map((card) => (
          <li key={card} onClick={() => handleSelectCard(card)}>
            {card}
            <button
              onClick={() =>
                handleAddVote(
                  "664f3b9387a63648a8827229",
                  "eca7382b-b660-42e9-acdb-9d7ac6bfe2f0"
                )
              }
            >
              Post
            </button>
          </li>
        ))}
      </ul>
      {selectedCard && <p>Selected Card: {selectedCard}</p>}
    </div>
  );
};

export default TimeCardSelector;
