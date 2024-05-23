import IssueList from "../Component/issueList"
interface Props{
    onBackToHome: () => void}
const StartProject:React.FC<Props> = ({onBackToHome}) => {
    return (
        <div>
            <h1>Starta projekt</h1>

        <IssueList projectId = "664f152a0c75153fccb0d3b7"/>

        <button onClick={onBackToHome} className="backButton">Back to Home</button>
        </div>
        
    )
}
export default StartProject