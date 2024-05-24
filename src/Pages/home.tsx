import Navbar from "../Component/navbar";
import "../Component/home.css"

interface Props{
    url: string
}
const Home:React.FC<Props> = ({url}) => {

    return (
        <>
         <div className="homeContainer">
        <Navbar url={url}/>
        <h1 className="homeHeader">Planing Poker</h1>
       
       </div>
      
            </>
    )
}
export default Home