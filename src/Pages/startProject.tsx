import IssueList from "../Component/issueList"
interface Props{
    onBackToHome: () => void
    url: string
}
const StartProject:React.FC<Props> = ({onBackToHome,url}) => {
    return (
        <div>
            <h1>Starta projekt</h1>

        <IssueList url={url} projectId="66504c6a4cc47431f1fb5d4a" />

        <button onClick={onBackToHome} className="backButton">Back to Home</button>
        </div>
        
    )
}
export default StartProject