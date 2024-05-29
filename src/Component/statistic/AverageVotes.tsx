/* import React, { useEffect, useState } from 'react';


interface AverageVotesProps {
  projectId: string;
}

const AverageVotes: React.FC<AverageVotesProps> = ({ projectId }) => {
  const [averageVotes, setAverageVotes] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAverageVotes(projectId);
      setAverageVotes(result);
    };
    fetchData();
  }, [projectId]);

  return (
    <div>
      <h3>Average Votes per Issue</h3>
      <p>{averageVotes !== null ? averageVotes : 'Loading...'}</p>
    </div>
  );
};

export default AverageVotes; */