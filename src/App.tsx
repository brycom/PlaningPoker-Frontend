import { useState } from "react";
import "./App.css";
import Login from "./Component/login";
import Register from "./Component/register";

function App() {
  const [] = useState(0);

  return (
    <>
    <Login/>
     <Register/>
    </>
  );
}

export default App;
