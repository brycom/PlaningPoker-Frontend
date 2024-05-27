import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerList from "./playerList";
import TimeCardSelector from "./timeCardSelector";
import IssueList from "./issueList";
import "./pokertable.css";

interface Player {
  userId: number;
  username: string;
}
interface Props {
  projectId: string;
  issueId: string;
  url: string;
  setSelectedIssue: Function;
}

const PokerTable: React.FC<Props> = ({ projectId, url }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const token = localStorage.getItem("auth_token");

  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(url + `/project/${projectId}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setPlayers(response.data))
      .catch((error) => console.error("Error fetching players:", error));
  }, [projectId]);

  return (
    <div className="poker-table">
      <h1>Poker Table</h1>
      <PlayerList players={players} />
      {selectedIssue && (
        <TimeCardSelector
          url={url}
          projectId={projectId}
          issueId={selectedIssue}
        />
      )}
      <IssueList
        projectId={projectId}
        url={url}
        selectedIssue={selectedIssue}
        setSelectedIssue={setSelectedIssue}
      />
    </div>
  );
};

export default PokerTable;
