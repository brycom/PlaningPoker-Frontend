import axios from "axios";
import React, { useState } from "react";

interface Props{
  url: string
}

function InvitePlayers(props: Props) {
  const [userName, setUserName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("auth_token");

  const handleAddUser = async () => {
    if (!userName) {
      setError("Ange ett giltigt användar-ID");
      return;
    }
    try {
      await axios.post(props.url+"/project/projects/addUser", { userName, 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       });
      
      setResponseMessage("Användare " + userName + " tillagd!");
      setUserName("");
    } catch {
      setError("Funkar inte! ");
    }
  };

   return (
  //   <div>
  //     <input
  //       type="text"
  //       placeholder="Användarnamn"
  //       value={userName}
  //       onChange={(e) => setUserName(e.target.value)}
  //     />
  //     <button onClick={handleAddUser}>Invite Player</button>
  //     {responseMessage && <div>{responseMessage}</div>}
  //     {error && <div>Error: {error}</div>}
  //   </div>
  <ul className='invitePlayer-ul'>
  <li className='invitePlayer-li' >Nytt projekt +
  <InvitePlayers url={props.url} />
  </li>
</ul>
  );
}

export default InvitePlayers;
