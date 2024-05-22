import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerList from "./playerList";
import TimeCardSelector from "./timeCardSelector";

interface Player {
  id: number;
  name: string;
}

const PokerTable: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/project/{projectId}/users")
      .then((response) => setPlayers(response.data))
      .catch((error) => console.error("Error fetching players:", error));
  }, []);

  return (
    <div>
      <h1>Poker Table</h1>
      {/* <PlayerList players={players} /> */}
      <TimeCardSelector />
    </div>
  );
};

export default PokerTable;
