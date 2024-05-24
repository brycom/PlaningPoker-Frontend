import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Component/issueList.css";

interface Vote {
    voteId: string;
    userId: string;
    vote: number;
}
interface Issue{
    issueId: string;
    issuename: string;
    votes: Vote[];
    startTime: Date | null;
    endTime: Date | null;
    estimatedTime: null;
    actualTime: string;
}
interface IssueListProps{
    projectId: string;
    url:string;
}
const IssueList: React.FC<IssueListProps> = ({projectId,url}) => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [newIssueName, setNewIssueName] = useState<string>("");
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState<boolean>(false);
    const [currentIssue, setCurrentIssue] = useState<Issue | null>(null);
    const [updatedIssueName, setUpdatedIssueName] = useState<string>("");
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const token = localStorage.getItem("auth_token");
    

   

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const res = await axios.get<Issue[]>(url+`/issue/${projectId}`,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                setIssues(res.data);
                console.log("Fetched issues: ",res.data);
               
            } catch (error) {
                console.error(error);
            }
        };
        if(token && projectId){
            fetchIssues();
        }
       
    },[token, projectId]);

   
    const handleAddIssue = async () => {
        if(!newIssueName){
            setError("Please enter an issue name");
            return;
        }
    const newIssue: Partial<Issue> = {
        
        issuename: newIssueName,
        votes: [],
        startTime: new Date(),
        endTime: null,
        estimatedTime: null,
        actualTime:''
    };

    try{
        
        const res = await axios.post<Issue>(url+`/issue/${projectId}`,
        newIssue,
        {
            headers:{
                "Content-Type": "application/json",
                 'Authorization': `Bearer ${token}`
                }
        }
    );
    console.log("Added issue:", res.data);
        setIssues([...issues, res.data]);
        setNewIssueName("");
        setError("");
        setIsFormVisible(false);
        
    }catch(error){
        console.error('Error adding issue',error);
        setError("Error adding issue");
    }
    
    }
        const handleCloseIssue = async (issueId: string) => {
            try{
                
                const res = await axios.put(url+`/issue/${projectId}/${issueId}/close`, null,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                const actualTime = res.data; // Assuming actualTime is directly received from the server
                console.log("Actual time:", actualTime);
               
                setIssues(issues.map(issue =>
                    issue.issueId === issueId
                    ? { ...issue,endTime:new Date(), actualTime:actualTime}
                    : issue
            ));

            }catch(error){
                    console.error('Error closing issue',error);
                    setError("Error closing issue");
                }
            }
            const handleUpdateIssue = (issue: Issue) => {
                setCurrentIssue(issue);
                setUpdatedIssueName(issue.issuename);
                setIsUpdateFormVisible(true);
            };
            const handleUpdateIssueSubmit = async (issueId: string) => {
                if (!currentIssue) return;
                try {
                    const res = await axios.patch<Issue>(url+`/issue/${projectId}/${issueId}`, 
                    {issuename:updatedIssueName}, {
                        
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log("Updated issue:", res.data);
                    setIssues(issues.map(issue =>
                        issue.issueId === issueId ? { ...issue, ...res.data } : issue
                    ));
                    setIsUpdateFormVisible(false);
                    setCurrentIssue(null);
                } catch (error) {
                    console.error('Error updating issue', error);
                    setError("Error updating issue");
                }
            };
            const handleDeleteIssue = async (issueId: string) => {
                console.log("Project id: ", projectId);
                try {
                    await axios.delete(url+`/issue/${projectId}/${issueId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log("Deleted issue:", issueId);
                    setIssues(issues.filter(issue => issue.issueId !== issueId));
                } catch (error) {
                    console.error('Error deleting issue', error);
                    setError("Error deleting issue");
                }
            };
        

    return(
        <div className="issueListContainer">
        <h2>Issue List</h2>
        <ul className="issueList">
            {issues.map(issue => (
                <li  className="issueListItem" key={issue.issueId}>
                    
                    <div>
                        <p>ID: {issue.issueId}</p>
                       <p>Issue Name:  {issue.issuename}</p>
                       <p>Votes: {issue.votes.map(vote => (
                                <span key={vote.voteId}>User {vote.userId}: {vote.vote}</span>
                            ))}</p>
                        <p>Start Time: {issue.startTime ? new Date(issue.startTime).toLocaleString() : 'N/A'}</p>
                        <p>End Time: {issue.endTime ? new Date(issue.endTime).toLocaleString() : 'N/A'}</p>
                        <p>Estimated Time:{issue.estimatedTime}</p>
                        <p>Actual Time:{issue.actualTime}</p>
                        <button onClick={() => handleCloseIssue(issue.issueId)}>Close</button>
                        <button onClick={() => handleUpdateIssue(issue)}>Update</button>
                      <button onClick={() => handleDeleteIssue(issue.issueId)}>Delete</button>
                        
                    </div>
                  
                    
                </li>
            ))}
        </ul>
        
            {isFormVisible && (
                <div>
                    <input
                        type="text"
                        value={newIssueName}
                        onChange={(e) => setNewIssueName(e.target.value)}
                    />
                    <button onClick={handleAddIssue}>Add Issue</button>
                    {error && <p>{error}</p>}
                </div>
            )}
            <button onClick={() => setIsFormVisible(!isFormVisible)}>
                {isFormVisible ? "Cancel" : "+ Issue"}
            </button>
              {isUpdateFormVisible && currentIssue && (
                <div>
                    <h3>Update Issue</h3>
                    <input
                        type="text"
                        value={updatedIssueName}
                        onChange={(e) => setUpdatedIssueName(e.target.value)}
                    />
                    <button onClick={ () => handleUpdateIssueSubmit(currentIssue.issueId)}>Update Issue</button>
                    <button onClick={() => setIsUpdateFormVisible(false)}>Cancel</button>
                    {error && <p>{error}</p>}
                </div>
            )}

        </div>
        
            
    )
}
export default IssueList