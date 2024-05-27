import React, { useState } from "react";
import StartProject from "../Pages/startProject";
import InvitePage from "../Pages/invitePage";
import StatisticsPage from "../Pages/StatisticsPage"; // Uppdaterad import
import Register from "./register";
import Login from "./login";
import "./navbar.css";
import ProjectList from "./projectList";

interface Props {
    url: string;
    selectedProject: string
    setSelectedProject: () => void;
}



const Navbar:React.FC<Props> = ({url,selectedProject,setSelectedProject}) => {
    const[selectedOption, setSelectedOption] = useState<string | null>(null)
    
    

    const handleNavbarOptionClick = (option: string) => {
        setSelectedOption(option)
    }
    const handleBackToHomeClick = () => {
        setSelectedOption(null);
    };
   return(
    <div className="navbarContainer">
         {!selectedOption && (
            <div className="navbarContent">
        
            <div className="navbarButtonContainer">
              
                <button className="navbarButton" onClick={() => handleNavbarOptionClick("StartProject")}>Starta projekt</button>
                <button className = "projectList" onClick={()=> handleNavbarOptionClick("projectList") }>projectList</button>
                <button className="navbarButton" onClick={() => handleNavbarOptionClick("InvitePage")}>Bjuda in</button>
                <button className="navbarButton" onClick={() => handleNavbarOptionClick("StatisticsPage")}>Statistik</button>
            </div>
            <div className="navbarButtonUserContainer">
                <button className="navbarButtonUser" onClick={() => handleNavbarOptionClick("Register")}>Registrera</button> 
                <button className="navbarButtonUser" onClick={() => handleNavbarOptionClick("Login")}>Logga in</button>
            </div>
            </div>
            
            )}
            {/* {selectedOption === "Home" && <Home />} */}
            {selectedOption === "StartProject" && <StartProject selectedProject={selectedProject} url={url} onBackToHome={handleBackToHomeClick}/>}
            {selectedOption === "projectList" && <ProjectList url={url} selectedProject={selectedProject} setSelectedProject= {setSelectedProject}/>}
            {selectedOption === "InvitePage" && <InvitePage url={url} onBackToHome={handleBackToHomeClick} />}
            {selectedOption === "StatisticsPage" && <StatisticsPage url={url} projectId={selectedProject} onBackToHome={handleBackToHomeClick} />}
            {selectedOption === "Register" && <Register url={url}/>}
            {selectedOption === "Login" && <Login url={url} />}

            </div>
            
   )
}
export default Navbar   