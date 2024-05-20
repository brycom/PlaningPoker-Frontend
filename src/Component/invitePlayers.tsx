import axios from "axios";
import React, { useState } from "react";

function invitePlayers() {
  const [userName, setUserName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");

  const handleAddUser = async () => {
    if (!userName) {
      setError("Ange ett giltigt användar-ID");
      return;
    }
    try {
      await axios.post("/project/projects/addUser", { userName });
      setResponseMessage("Användare " + userName + " tillagd!");
      setUserName("");
    } catch {
      setError("Funkar inte! ");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Användarnamn"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={handleAddUser}>Invite Player</button>
      {responseMessage && <div>{responseMessage}</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default invitePlayers;
