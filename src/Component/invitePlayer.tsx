import axios from "axios";
import  { useState } from "react";
import "../css/navbar.css"

interface Props{
  url: string;
  selectedProject: string;
  setUpdatePlayers: Function;
  visible: boolean;
  setVisible: Function;
}

function InvitePlayers(props: Props) {
  const [userName, setUserName] = useState("");
  const [, setResponseMessage] = useState("");
  const [, setError] = useState("");
  const token = localStorage.getItem("auth_token");

  const handleAddUser = async () => {
    if (!userName) {
      setError("Ange ett giltigt användar-ID");
      return;
    }
    try {   await axios.post(
      `${props.url}/project/projects/addUser`,
      { username: userName, projektId: props.selectedProject },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setResponseMessage(`Användare ${userName} tillagd!`);
    setUserName("");
    props.setUpdatePlayers(true);
  } catch {
    setError("Funkar inte!");
  }
};

   return (
    <>
   {props.visible &&<ul className='invitePlayer-ul'>
   <li className='invitePlayer-li' >Ny Spelare +
   <form onSubmit= { (e) =>{handleAddUser();
    e.preventDefault();
    props.setVisible(false)
    setTimeout(() => {
      props.setVisible(true)
    }, 1000);
   }}>
    <input
     type="text"
     placeholder="Användarnamn"
     onChange={(e) => setUserName(e.target.value)}
     />
     <button>Bjud in</button>
   </form>
      </li>
</ul>}
</>
  );
 }

export default InvitePlayers;
