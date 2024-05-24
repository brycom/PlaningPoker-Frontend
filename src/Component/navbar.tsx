import React, { useState } from "react";
import StartProject from "../Pages/startProject";
import InvitePage from "../Pages/invitePage";
import Statistics from "../Pages/Statistics";
import Register from "./register";
import Login from "./login";
import "./navbar.css";

interface Props {
    url: string;
}


const Navbar:React.FC<Props> = ({url}) => {
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
            {selectedOption === "StartProject" && <StartProject url={url} onBackToHome={handleBackToHomeClick}/>}
            {selectedOption === "InvitePage" && <InvitePage url={url} onBackToHome={handleBackToHomeClick} />}
            {selectedOption === "StatisticsPage" && <Statistics url={url} onBackToHome={handleBackToHomeClick}/>}
            {selectedOption === "Register" && <Register url={url}/>}
            {selectedOption === "Login" && <Login url={url} />}

            </div>
            
   )
}
export default Navbar   