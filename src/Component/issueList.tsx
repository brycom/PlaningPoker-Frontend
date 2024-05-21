import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Component/issueList.css"

interface Issue{
    issueId: string;
    issuename: string;
    votes: null;
    startTime: Date | null;
    endTime: Date | null;
    estimatedTime: null;
    actualTime: string;
}

const IssueList: React.FC = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [newIssueName, setNewIssueName] = useState<string>("");
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const token = localStorage.getItem("auth_token");

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const res = await axios.get<Issue[]>("http://localhost:8080/issue/issues",{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                setIssues(res.data);
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchIssues();
    },[]);

   
    const handleAddIssue = async () => {

        
        if(!newIssueName){
            setError("Please enter an issue name");
            return;
        }
    const newIssue: Partial<Issue> = {
        issueId: '',
        issuename: newIssueName,
        votes: null,
        startTime: new Date(),
        endTime: null,
        estimatedTime: null,
        actualTime:''
    };

    

    try{
        
        const res = await axios.post<Issue>("http://localhost:8080/issue/",
        newIssue,
        {
            headers:{
                "Content-Type": "application/json",
                 'Authorization': `Bearer ${token}`
                }
        }
    );
    console.log(res.data);


    
        setIssues([...issues, res.data]);
        setNewIssueName("");
        setError("");
        setIsFormVisible(false);
        
    }catch(error){
        console.error('Error adding issue',error);
        setError("Error adding issue");
    }
    

    }
        

    return(
        <div className="issueListContainer">
        <h2>Issue List</h2>
        <ul className="issueList">
            {issues.map(issues => (
                <li  className="issueListItem" key={issues.issueId}>
                    
                    <div>
                        <p>ID: {issues.issueId}</p>
                       <p>Issue Name:  {issues.issuename}</p>
                        <p>Votes: {issues.votes}</p>
                        <p>Start Time: {issues.startTime ? new Date(issues.startTime).toLocaleString() : 'N/A'}</p>
                        <p>End Time: {issues.endTime ? new Date(issues.endTime).toLocaleString() : 'N/A'}</p>
                        <p>Estimated Time:{issues.estimatedTime}</p>
                        <p>Actual Time:{issues.actualTime}</p>
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

        </div>
        
            
    )
}
export default IssueList