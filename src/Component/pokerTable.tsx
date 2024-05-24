import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerList from "./playerList";
import TimeCardSelector from "./timeCardSelector";
import IssueList from "./issueList";

interface Player {
  userId: number;
  username: string;
}
interface Props {
  projectId: string;
  issueId: string;
  url: string;
}

const PokerTable: React.FC<Props> = ({ projectId, url }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const token = localStorage.getItem("auth_token");

  const [selectedIssue, setSelectedIssue] = useState<string>("");

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
      <TimeCardSelector
        url={url}
        projectId={projectId}
        issueId={selectedIssue}
      />
      <IssueList
        projectId="664f3b9387a63648a8827229"
        url={url}
        selectedIssue={selectedIssue}
        setSelectedIssue={setSelectedIssue}
      />
    </div>
  );
};

export default PokerTable;
