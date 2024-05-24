import React from "react";

interface Player {
  userId: number;
  username: string;
}

interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  return (
    <div>
      <h2>Players</h2>
      <ul>
        {players.map((player) => (
          <li key={player.userId}>{player.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
