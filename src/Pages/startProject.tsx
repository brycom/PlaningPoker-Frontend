
import IssueList from "../Component/issueList"
interface Props{
    onBackToHome: () => void
    url: string
    selectedProject: string
}
const StartProject:React.FC<Props> = ({onBackToHome,url,selectedProject}) => {
    return (
        <div>
            <h1>Starta projekt</h1>

        <IssueList url={url} projectId={selectedProject} />

        <button onClick={onBackToHome} className="backButton">Back to Home</button>
        </div>
        
    )
}
export default StartProject

