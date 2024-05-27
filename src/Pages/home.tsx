import Navbar from "../Component/navbar";
import "../Component/home.css"
import { useState } from "react";

interface Props{
    url: string
    selectedProject: string
    setSelectedProject: Function
}
const Home:React.FC<Props> = ({url,selectedProject,setSelectedProject}) => {
    

    return (
        <>
         <div className="homeContainer">
        <Navbar url={url} selectedProject={selectedProject} setSelectedProject= {setSelectedProject}  />
        <h1 className="homeHeader">Planing Poker</h1>
       
       </div>
      
            </>
    )
}
export default Home