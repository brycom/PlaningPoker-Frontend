import { useState } from "react";
import "./App.css";
import Home from "./Pages/home";


function App() {
  const [url ] = useState<string>("https://seal-app-3ryxu.ondigitalocean.app");
  const [selectedProject, setSelectedProject] = useState<string>("wogeli boogeli");

  return (
    <>
    <Home url ={url} selectedProject={selectedProject} setSelectedProject= {setSelectedProject}/>
    </>
  );
}

export default App;
