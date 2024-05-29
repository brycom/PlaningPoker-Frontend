import React, { useEffect, useState } from 'react';
//import { getIssuesWithHighVotes } from './api/statstic';
import "./statistics.css"

interface Vote {
  voteId: string;
  projectId: string;
  issueId: string;
  userId: string;
  vote: number;
}

interface Issue {
  id: string;
  issuename: string;
  votes: Vote[];
  startTime: string;
  endTime: string;
  estimatedTime: number;
  actualTime: string;
}

interface IssuesWithHighVotesProps {
  projectId: string;
  threshold: number;
  averageVote: number;
  setAverageVote:Function;
  issues: Issue[];

}

const IssuesWithHighVotes: React.FC<IssuesWithHighVotesProps> = ({issues, projectId, threshold,averageVote }) => {
  /* const [issues, setIssues] = useState<Issue[]>([]); */
  const [error, setError] = useState<string | null>(null);

/*   useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getIssuesWithHighVotes(projectId, threshold);
        setIssues(Array.isArray(result) ? result : []);
      } catch (err) {
        setError('Failed to fetch issues');
        console.error('Error fetching issues:', err);
      }
    };
    fetchData();
  }, [projectId, threshold]);

  if (error) {
    return <div>{error}</div>;
  } */

  return (
    <div>
      <h3>Issues with Votes Above {threshold}</h3>
      {issues.length > 0 ? (
        <ul className="issues-container">
          {issues.map((issue) => (
            <li key={issue.id} className="issue-item">
              <h3>Genomsnitlig röst:{averageVote}</h3>
              <p>Issue Name: {issue.issuename}</p>
              <p>Estimated Time: {issue.estimatedTime}</p>
              <p>Actual Time: {issue.actualTime}</p>
              <p>Start Time: {issue.startTime}</p>
              <p>End Time: {issue.endTime}</p>
              <p>Votes:</p>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {issue.votes.map(vote => (
                  <li key={vote.voteId}>{vote.vote}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No issues found</p>
      )}
    </div>
  );
};

export default IssuesWithHighVotes;
