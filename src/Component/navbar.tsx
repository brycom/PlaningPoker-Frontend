import React, { useEffect, useState } from "react";
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

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        let token = localStorage.getItem("auth_token");
        if (token !== null) {
            setIsAuthenticated(true);
        }
    }, [handleNavbarOptionClick]);
    console.log(isAuthenticated);

    const logout = () => {
        console.log("Logging out");
        setIsAuthenticated(false);
        localStorage.clear();
        window.location.href = "/";
    }
    

   return(
    <div className="navbarContainer">
         {!selectedOption && (
            <div className="navbarContent">
        
            <div className="navbarButtonContainer">
              

            <div className="projectlist-container">
                <button className = "navbarButton" id="projectlist-btn">projectList</button>
                <ProjectList url={url} selectedProject={selectedProject} setSelectedProject= {setSelectedProject} setSelectedOption={setSelectedOption}/>
                </div>
                {isAuthenticated && <button className="navbarButton" onClick={() => handleNavbarOptionClick("InvitePage")}>Bjuda in</button>}
                {isAuthenticated && <button className="navbarButton" onClick={() => handleNavbarOptionClick("StatisticsPage")}>Statistik</button>}

            </div>
            <div className="navbarButtonUserContainer">
                {!isAuthenticated && <button className="navbarButtonUser" onClick={() => handleNavbarOptionClick("Register")}>Registrera</button>} 
                {!isAuthenticated &&<button className="navbarButtonUser" onClick={() => handleNavbarOptionClick("Login")}>Logga in</button>}
                {isAuthenticated && <button className="navbarButtonUser" onClick={logout}>Logga ut</button>}
            </div>
            </div>
            
            )}
            {/* {selectedOption === "Home" && <Home />} */}
            {/* {selectedOption === "StartProject" && <StartProject url={url}/>} */}
            {selectedOption === "InvitePage" && <InvitePage url={url} onBackToHome={handleBackToHomeClick} />}
            {selectedOption === "StatisticsPage" && <StatisticsPage url={url} projectId={selectedProject} onBackToHome={handleBackToHomeClick} />}
            {selectedOption === "Register" && <Register url={url}/>}
            {selectedOption === "Login" && <Login url={url} />}

            </div>
            
   )
}
export default Navbar   