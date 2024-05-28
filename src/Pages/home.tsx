import Navbar from "../Component/navbar";
import PokerTable from "../Component/pokerTable";
import "../Component/home.css";

import { useState, useEffect } from "react";

interface Props {
  url: string;
  selectedProject: string;
  setSelectedProject: Function;
}
const Home: React.FC<Props> = ({
  url,
  selectedProject,
  setSelectedProject,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<string>("");
  const [updatePlayers, setUpdatePlayers] = useState<boolean>(false);
  useEffect(() => {
    let token = localStorage.getItem("auth_token");
    if (token !== null) {
      setIsAuthenticated(true);
    }
  });
  

  return (
    <>
      <div className="homeContainer">
        <Navbar
          url={url}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          setUpdatePlayers={setUpdatePlayers}
        />
        <h1 className="homeHeader">Planning Poker</h1>
        {!isAuthenticated && <h1>Logga in!</h1>}

        {isAuthenticated&&<PokerTable
          setUpdatePlayers={setUpdatePlayers}
          updatePlayers={updatePlayers}
          projectId={selectedProject}
          issueId={selectedIssue}
          url={url}
          setSelectedIssue={setSelectedIssue}
        />}
      </div>
    </>
  );
};
export default Home;
