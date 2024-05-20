import Navbar from "../Component/navbar";
import "../Component/home.css"

const Home = () => {

    return (
        <>
              <div>
        <Navbar/>
        <h1 className="homeHeader">Planing Poker</h1>
        <div className="cardsPicWrapper">
        <img src="src/Component/cards.jpg" alt="Asses" className="cardsPic" />
        </div>
       
        </div>
            </>
    )
}
export default Home