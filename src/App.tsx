import { useState } from "react";
import "./App.css";
import InvitePlayers from "./Component/invitePlayers";

function App() {
  const [] = useState(0);

  return (
    <div>
      <h1>test</h1>
      <InvitePlayers />
    </div>
  );
}

export default App;
