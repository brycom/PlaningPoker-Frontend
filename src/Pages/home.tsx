import Navbar from "../Component/navbar";
import "../Component/home.css"
import { useState, useEffect } from "react";

interface Props{
    url: string
}
const Home:React.FC<Props> = ({url}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        let token = localStorage.getItem("auth_token");
        if (token !== null) {
            setIsAuthenticated(true);
        }
    });
    console.log(isAuthenticated);

    return (
        <>
         <div className="homeContainer">
        <Navbar url={url}/>
        <h1 className="homeHeader">Planing Poker</h1>
        {!isAuthenticated && <h1>Logga in!</h1>}
       
       </div>
       
      
            </>
    )
}
export default Home