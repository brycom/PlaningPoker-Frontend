import React, { useEffect, useState } from 'react';
import { getIssuesWithHighVotes } from './api/statstic';

interface Vote {
  voteId: string;
  projectId: string;
  issueId: string;
  userId: string;
  vote: number;
}

interface Issue {
  id: string;
  issueName: string;
  votes: Vote[];
  startTime: string;
  endTime: string;
  estimatedTime: number;
  actualTime: string;
}

interface IssuesWithHighVotesProps {
  projectId: string;
  threshold: number;
}

const IssuesWithHighVotes: React.FC<IssuesWithHighVotesProps> = ({ projectId, threshold }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }

  return (
    <div>
      <h3>Issues with Votes Above {threshold}</h3>
      {issues.length > 0 ? (
        <ul>
          {issues.map((issue) => (
            <li key={issue.id}>
              <p>Issue Name: {issue.issueName}</p>
              <p>Estimated Time: {issue.estimatedTime}</p>
              <p>Actual Time: {issue.actualTime}</p>
              <p>Start Time: {issue.startTime}</p>
              <p>End Time: {issue.endTime}</p>
              <p>Votes:</p>
              <ul>
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
