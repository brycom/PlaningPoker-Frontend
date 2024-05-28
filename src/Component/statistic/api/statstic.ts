
import axios from 'axios';

// const BASE_URL = 'http://localhost:8080/statistics';
const BASE_URL = 'https://seal-app-3ryxu.ondigitalocean.app/statistics';

const getToken = () => {
  const token = localStorage.getItem('auth_token');
  console.log('Token:', token); 
  return token;
};

export const getAverageVotes = async (projectId: string) => {
  const token = getToken();
  const response = await axios.get(`${BASE_URL}/averageVotes/${projectId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const getAverageVoteForIssue = async (issueId: string) => {
  const token = getToken();
  const response = await axios.get(`${BASE_URL}/averageVoteForIssue/${issueId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const getIssuesWithHighVotes = async (projectId: string, threshold: number) => {
  const token = getToken();
  const response = await axios.get(`${BASE_URL}/issuesWithHighVotes/${projectId}/${threshold}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};



// import axios from 'axios';

// // const BASE_URL = 'http://localhost:8080/statistics';
// const BASE_URL = 'https://seal-app-3ryxu.ondigitalocean.app/statistics';

// export const getAverageVotes = async (projectId: string) => {
//   const response = await axios.get(`${BASE_URL}/averageVotes/${projectId}`);
//   return response.data;
// };

// export const getAverageVoteForIssue = async (issueId: string) => {
//   const response = await axios.get(`${BASE_URL}/averageVoteForIssue/${issueId}`);
//   return response.data;
// };

// export const getIssuesWithHighVotes = async (projectId: string, threshold: number) => {
//   const response = await axios.get(`${BASE_URL}/issuesWithHighVotes/${projectId}/${threshold}`);
//   return response.data;
// };



// import axios from 'axios';

// // const BASE_URL = 'http://localhost:8080/statistics';
// const BASE_URL = 'https://seal-app-3ryxu.ondigitalocean.app/statistics';

// export const getAverageVotes = async (projectId: string) => {
//   const response = await axios.get(`${BASE_URL}/averageVotes/${projectId}`, {
//     headers: {
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     }
//   });
//   return response.data;
// };

// export const getAverageVoteForIssue = async (issueId: string) => {
//   const response = await axios.get(`${BASE_URL}/averageVoteForIssue/${issueId}`, {
//     headers: {
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     }
//   });
//   return response.data;
// };

// export const getIssuesWithHighVotes = async (projectId: string, threshold: number) => {
//   const response = await axios.get(`${BASE_URL}/issuesWithHighVotes/${projectId}/${threshold}`, {
//     headers: {
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     }
//   });
//   return response.data;
// };

// A. Hämta genomsnittligt antal röster per issue för ett projekt - {projectId} - ex 12345
// http://localhost:8080/statistics/averageVotes/12345

// B. Hämta genomsnittlig röst för en specifik issue - {issueId} - ex 123e4567-e89b-12d3-a456-426614174000
// Get http://localhost:8080/statistics/averageVoteForIssue/123e4567-e89b-12d3-a456-426614174000

// C. Hämta issues med röster över ett visst tröskelvärde för ett projekt -{projectId}/{threshold} - ex 12345/4.0
// http://localhost:8080/statistics/issuesWithHighVotes/12345/4.0
