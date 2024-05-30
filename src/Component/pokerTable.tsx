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
  updatePlayers:boolean
  setUpdatePlayers:Function;
}

const PokerTable: React.FC<Props> = ({ projectId, url,setUpdatePlayers,updatePlayers }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const token = localStorage.getItem("auth_token");

  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [updateIssueList, setUpdateIssueList] = useState<boolean>(false);
  

  useEffect(() => {
    axios
      .get(url + `/project/${projectId}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPlayers(response.data)
        setUpdatePlayers(false);
      })
      .catch((error) => console.error("Error fetching players:", error));
  }, [projectId, updatePlayers]);
  

  return (
    <div className="poker-table">
      {selectedIssue&&<button className="navbarButton" id="close-btn" onClick={()=>setSelectedIssue("")}>X</button>}
      <h1>Poker Table</h1>
      <PlayerList players={players} />
      {selectedIssue && (
        <TimeCardSelector
        setUpdatePlayers={setUpdatePlayers}
          url={url}
          projectId={projectId}
          issueId={selectedIssue}
          
           updateIssueList={updateIssueList}
            setUpdateIssueList={setUpdateIssueList}  />
      )}
      <IssueList
        projectId={projectId}
        url={url}
        selectedIssue={selectedIssue}
        setSelectedIssue={setSelectedIssue}
        updateIssueList={updateIssueList}
        setUpdateIssueList={setUpdateIssueList}
      />
    </div>
  );
};

export default PokerTable;
