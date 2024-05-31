import Navbar from "../Component/navbar";
import PokerTable from "./pokerTable";
import "../css/home.css";

import { useState, useEffect } from "react";
import Statistics from "./Statistics";

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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  useEffect(() => {
    let token = localStorage.getItem("auth_token");
    if (token !== null) {
      setIsAuthenticated(true);
    }
  });

  const handleBackToHomeClick = () => {
    setSelectedOption(null);
  };

  return (
    <>
      <div className="homeContainer">
        <Navbar
          url={url}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          setUpdatePlayers={setUpdatePlayers}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <h1 className="homeHeader">Planning Poker</h1>
        {!isAuthenticated && <h1>Logga in!</h1>}

        {isAuthenticated && selectedOption !== "StatisticsPage" && (
          <PokerTable
            setUpdatePlayers={setUpdatePlayers}
            updatePlayers={updatePlayers}
            projectId={selectedProject}
            issueId={selectedIssue}
            url={url}
            setSelectedIssue={setSelectedIssue}
            selectedOption={selectedOption}
          />
        )}
        {isAuthenticated && selectedOption === "StatisticsPage" && (
          <Statistics
            onBackToHome={handleBackToHomeClick}
            url={url}
            selectedProject={selectedProject}
            selectedIssue={selectedIssue}
            setSelectedIssue={setSelectedIssue}
            updateIssueList={false}
            setUpdateIssueList={() => {}}
          />
        )}
      </div>
    </>
  );
};
export default Home;
