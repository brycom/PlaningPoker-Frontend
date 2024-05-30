/* 
import React, { useEffect, useState } from 'react';
import { getAverageVoteForIssue } from './api/statstic';

interface AverageVoteForIssueProps {
  issueId: string;
}

const AverageVoteForIssue: React.FC<AverageVoteForIssueProps> = ({ issueId }) => {
  const [averageVote, setAverageVote] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAverageVoteForIssue(issueId);
      setAverageVote(result);
    };
    fetchData();
  }, [issueId]);

  return (
    <div>
      <h3>Average Vote for Issue</h3>
      <p>{averageVote !== null ? averageVote : 'Loading...'}</p>
    </div>
  );
};

export default AverageVoteForIssue;
 */