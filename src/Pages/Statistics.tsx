import { useEffect, useState } from "react"
import "../css/statistics.css"
import axios from "axios"

interface Issue {
  issueId: string;
  issuename: string;
  votes: Vote[];
  startTime: string;
  endTime: string;
  estimatedTime: number;
  actualTime: string;
  averageVotes: number;
}
interface Vote {
  voteId: string;
  projectId: string;
  issueId: string;
  userId: string;
  vote: number;
}

interface Props {
  onBackToHome: () => void;
  url: string;
  selectedProject: string;
  selectedIssue: string;
  setSelectedIssue: Function;
  updateIssueList: boolean;
  setUpdateIssueList: Function;
}

function Statistics(props: Props) {
  const [] = useState<number>(0);
  const [] = useState<number>(0);
  const [issues, setIssues] = useState<Issue[]>([]);
  const token = localStorage.getItem("auth_token");

  function extractTimeFromString(dateTimeString: string): string {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    return `${hours}:${minutes}`;
  }

  const fetchAverageVote = async () => {
    const updatedIssues = await Promise.all(
      issues.map(async (issue) => {
        try {
          const response = await axios.get(
            `${props.url}/vote/averagevote/${props.selectedProject}/${issue.issueId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return { ...issue, averageVotes: response.data };
        } catch (error) {
          console.error(
            `Error fetching average vote for issue ${issue.issueId}:`,
            error
          );
          return issue;
        }
      })
    );
    setIssues(updatedIssues);
  };

  const fetchIssues = async () => {
    const response = await axios.get(
      props.url + "/issue/" + props.selectedProject,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setIssues(response.data);
  };

  useEffect(() => {
    fetchIssues();
  }, [props.selectedProject]);

  useEffect(() => {
    if (issues.length > 0) {
      fetchAverageVote();
    }
  }, [issues]);

  return (
    <div>
      <div>
        <h1>Statistics</h1>
        <button className="poker-btn" onClick={props.onBackToHome} >
          Play poker
        </button>
        {issues.length > 0 ? (
          <ul className="issues-container">
            {issues.map((issue) => (
              <li key={issue.issueId} className="issue-item">
                <h3>Averige vote: {issue.averageVotes}</h3>
                <p>Issue Name: {issue.issuename}</p>
                <p>Estimated Time: {issue.estimatedTime}</p>
                <p>Actual Time: {issue.actualTime}</p>
                <p>Start Time: {extractTimeFromString(issue.startTime)}</p>
                <p>End Time: {extractTimeFromString(issue.endTime)}</p>
                <p>Votes:</p>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {issue.votes.map((vote) => (
                    <li key={vote.voteId}>{vote.vote}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No issues found</p>
        )}

        {/* <IssueList
        projectId={props.selectedProject}
        url={props.url}
        selectedIssue={props.selectedIssue}
        setSelectedIssue={props.setSelectedIssue}
        updateIssueList={props.updateIssueList}
        setUpdateIssueList={props.setUpdateIssueList}
      /> */}
      </div>
    </div>
  );
}

export default Statistics;
