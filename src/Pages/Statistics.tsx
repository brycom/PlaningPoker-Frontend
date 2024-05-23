import { AverageVotes, AverageVoteForIssue, IssuesWithHighVotes } from "../Component/statistic"


interface Props{
    onBackToHome: () => void}
const Statistics:React.FC<Props> = ({onBackToHome}) => {
    return (
        <div>
             <h1>Statistik</h1>
             <button onClick={onBackToHome} className="backButton">Back to Home</button>
       
       
            <AverageVotes projectId="12345" />
            <AverageVoteForIssue issueId="abcde-12345-67890-fghij" />
            <IssuesWithHighVotes projectId="12345" threshold={4.0} />


        </div>
       

    )

}
export default Statistics