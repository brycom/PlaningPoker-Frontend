import React, { useEffect, useState } from "react";
import Register from "./register";
import Login from "./login";
import "../css/navbar.css";
import ProjectList from "./projectList";
import InvitePlayers from "./invitePlayer";


interface Props {
  url: string;
  selectedProject: string;
  setSelectedProject: Function;
  setUpdatePlayers: Function;
  selectedOption: string | null;
  setSelectedOption:Function
}

const Navbar: React.FC<Props> = ({
  url,
  selectedProject,
  setSelectedProject,
  setUpdatePlayers,
  selectedOption,
  setSelectedOption
}) => {
  
  const[visible,setVisible]= useState(true);
  

  const handleNavbarOptionClick = (option: string) => {
    setSelectedOption(option);
    if (option === "Login" || option === "Register") {
    }
  };


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("auth_token");
    if (token !== null) {
      setIsAuthenticated(true);
    }
  }, [handleNavbarOptionClick]);


  const logout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="navbarContainer">
      {
        <div className="navbarContent">
          <div className="navbarButtonContainer">
            {isAuthenticated && (
              <div className="projectlist-container">
                <button className="navbarButton" id="projectlist-btn">
                  projectList
                </button>
                <ProjectList
                  url={url}
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
                  setSelectedOption={setSelectedOption} setVisible={setVisible} visible={visible}                />
              </div>
            )}
            
            {isAuthenticated && (
              <div className="projectlist-container">
              <button
                className="navbarButton" id="projectlist-btn"              >
                Bjuda in
              </button>
              <InvitePlayers visible={visible} setVisible={setVisible} setUpdatePlayers={setUpdatePlayers} url={url} selectedProject={selectedProject} />
              </div>
            )}

           
           
            {isAuthenticated && (
              <button
                className="navbarButton"
                onClick={() => handleNavbarOptionClick("StatisticsPage")}
              >
                Statistik
              </button>
            )}
          </div>
          <div className="navbarButtonUserContainer">
            {!isAuthenticated &&  (
              <button
                className="navbarButtonUser"
                onClick={() => handleNavbarOptionClick("Register")}
              >
                Registrera
              </button>
            )}
            {!isAuthenticated &&  (
              <button
                className="navbarButtonUser"
                onClick={() => handleNavbarOptionClick("Login")}
              >
                Logga in
              </button>
            )}
            {isAuthenticated && (
              <button className="navbarButtonUser" onClick={logout}>
                Logga ut
              </button>
            )}
          </div>
        </div>
      }
      {selectedOption === "Register" && <Register selectedOption={selectedOption} setSelectedOption={setSelectedOption} url={url} />}
      {selectedOption === "Login" && <Login url={url} />}
    </div>
  );
};
export default Navbar;
