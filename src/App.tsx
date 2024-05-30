import { useState } from "react";
import "./App.css";
import Home from "./Pages/home";


function App() {

  const [url ] = useState<string>( "https://seal-app-3ryxu.ondigitalocean.app" /*"http://localhost:8080"*/);
  const [selectedProject, setSelectedProject] = useState<string>("");

  return (
    <>
    <Home url ={url} selectedProject={selectedProject} setSelectedProject= {setSelectedProject}/>

    </>
  );
}

export default App;
