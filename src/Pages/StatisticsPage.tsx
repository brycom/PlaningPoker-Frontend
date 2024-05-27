import React, { useEffect, useState } from 'react';
import { getAverageVotes, getAverageVoteForIssue, getIssuesWithHighVotes } from '../Component/statistic/api/statstic';

interface Vote {
  voteId: string;
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

interface StatisticsPageProps {
  url: string;
  projectId: string;
  onBackToHome: () => void;
}

const StatisticsPage: React.FC<StatisticsPageProps> = ({ url, projectId, onBackToHome }) => {
  const [averageVotes, setAverageVotes] = useState<number | null>(null);
  const [averageVoteForIssue, setAverageVoteForIssue] = useState<number | null>(null);
  const [issuesWithHighVotes, setIssuesWithHighVotes] = useState<Issue[]>([]);
  const [threshold, setThreshold] = useState<number>(4.0); // Example threshold

  useEffect(() => {
    const fetchAverageVotes = async () => {
      const result = await getAverageVotes(projectId);
      setAverageVotes(result);
    };

    const fetchAverageVoteForIssue = async () => {
      // Replace with actual issue ID
      const issueId = "some-issue-id";
      const result = await getAverageVoteForIssue(issueId);
      setAverageVoteForIssue(result);
    };

    const fetchIssuesWithHighVotes = async () => {
      const result = await getIssuesWithHighVotes(projectId, threshold);
      setIssuesWithHighVotes(result);
    };

    fetchAverageVotes();
    fetchAverageVoteForIssue();
    fetchIssuesWithHighVotes();
  }, [projectId, threshold]);

  return (
    <div>
      <button onClick={onBackToHome}>Back to Home</button>
      <h2>Statistics for Project: {projectId}</h2>
      <div>
        <h3>Average Votes per Issue</h3>
        <p>{averageVotes !== null ? averageVotes : 'Loading...'}</p>
      </div>
      <div>
        <h3>Average Vote for Issue: </h3>
        <p>{averageVoteForIssue !== null ? averageVoteForIssue : 'Loading...'}</p>
      </div>
      <div>
        <h3>Issues with Votes Above: {threshold} - tröskelvärde</h3>
        {issuesWithHighVotes.length > 0 ? (
          <ul>
            {issuesWithHighVotes.map((issue) => (
              <li key={issue.id}>
                <p>Issue Name: {issue.issueName}</p>
                <p>Estimated Time: {issue.estimatedTime}</p>
                <p>Actual Time: {issue.actualTime}</p>
                <p>Start Time: {issue.startTime}</p>
                <p>End Time: {issue.endTime}</p>
                <p>Votes:</p>
                <ul>
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
      </div>
    </div>
  );
};

export default StatisticsPage;