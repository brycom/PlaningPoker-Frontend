import axios from "axios";
import React, { useState } from "react";

interface Vote {
  userId: string;
  vote: number;
}
interface Prop {
  url: string;
  projectId: string;
  issueId: string;
}

const timeCards: number[] = [1, 2, 3, 5, 8, 13, 21];

const TimeCardSelector: React.FC<Prop> = ({ url, projectId, issueId }) => {
  const [selectedCard, setSelectedCard] = useState<number>();
  console.log(url, projectId, issueId);

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
    console.log(projectId, issueId, url);
    try {
      console.log(issueId);
      const res = await axios.post<Vote>(
        `https://seal-app-3ryxu.ondigitalocean.app/vote/uservote/${projectId}/${issueId}`,
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
      <div className="playercard-container">
        <ul>
          {timeCards.map((card) => (
            <div className="playercard">
              <li key={card} onClick={() => handleSelectCard(card)}>
                {card}
              </li>
            </div>
          ))}
        </ul>
      </div>

      {selectedCard && <p>Selected Card: {selectedCard}</p>}
      <button
        className="Voteknapp"
        onClick={() => handleAddVote(projectId, issueId)}
      >
        Vote
      </button>
    </div>
  );
};

export default TimeCardSelector;
