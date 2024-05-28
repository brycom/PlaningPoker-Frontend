import React, { useState, useEffect } from 'react';
import axios from 'axios';

import StartProject from '../Pages/startProject';

interface Props {
    setSelectedOption: Function;
    selectedProject: string;
    setSelectedProject: Function;
    url: string;
}

interface Project {
    active: boolean;
    averageVotesPerIssue: number;
    issues: Array<any>;
    projectname: string;
    projektId: string;
    userIds: Array<string>;
}

interface ModifiedProject {
    projectId: string;
    projectname: string;
}

const ProjectList: React.FC<Props> = (props) => {
    const [projectList, setProjectList] = useState<ModifiedProject[]>([]);
    const [showStartProject, setShowStartProject] = useState<boolean>(false);
    const[updateList, setUpdateList] =useState<boolean>(false);
    const token = localStorage.getItem("auth_token");

    const projectListFetch = async () => {
        try {
            const response = await axios.get<Project[]>(props.url + '/project/projects', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const dataModifier: ModifiedProject[] = response.data.map((project: Project) => ({
                projectId: project.projektId,
                projectname: project.projectname
            }));

            setProjectList(dataModifier);
            setUpdateList(false);
            setShowStartProject(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (token) {
            projectListFetch();
        }
    }, [token,updateList]);

    useEffect(() => {
        console.log(showStartProject)
        
    }, [showStartProject]);

    return (
            
            <ul className='projectlist-ul'>
                {projectList.map(project => (
                    <li className='projectlist-li' key={project.projectId} onClick={()=>{
                         props.setSelectedProject(project.projectId)
                         props.setSelectedOption("StartProject")
                        }}>{project.projectname}</li>
                ))}
                <li className='projectlist-li' onClick={() => setShowStartProject(true)}>Nytt projekt +
                {showStartProject&&<StartProject url={props.url} setShowStartProject={setShowStartProject} setUpdateList={setUpdateList}/>}
                </li>
            </ul>
    );
};

export default ProjectList;
