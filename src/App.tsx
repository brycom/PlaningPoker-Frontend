import { useState } from "react";
import "./App.css";
import Home from "./Pages/home";
import PokerTable from "./Component/pokerTable";

function App() {
  const [url] = useState<string>("https://seal-app-3ryxu.ondigitalocean.app");

  return (
    <>
      <Home url={url} />
    </>
  );
}

export default App;
