import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerList from "./playerList";
import TimeCardSelector from "./timeCardSelector";

interface Player {
  userId: number;
  username: string;
}
interface Props {
  projectId: string;
  url: string;
}

const PokerTable: React.FC<Props> = ({ projectId, url }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    axios
      .get(url + `/project/${projectId}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setPlayers(response.data))
      .catch((error) => console.error("Error fetching players:", error));
  }, []);

  return (
    <div>
      <h1>Poker Table</h1>
      <PlayerList players={players} />
      <TimeCardSelector url={url} />
    </div>
  );
};

export default PokerTable;
