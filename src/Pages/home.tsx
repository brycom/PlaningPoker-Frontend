import Navbar from "../Component/navbar";
import "../Component/home.css";
import PokerTable from "../Component/pokerTable";

interface Props {
  url: string;
}
const Home: React.FC<Props> = ({ url }) => {
  return (
    <>
      <div className="homeContainer">
        <Navbar url={url} />
        <h1 className="homeHeader">Planning Poker</h1>
        <PokerTable
          projectId="664f3b9387a63648a8827229"
          url={url}
          issueId={""}
        />
      </div>
    </>
  );
};
export default Home;
