import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';

interface Props {
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
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (token) {
            projectListFetch();
        }
    }, [token]);

    return (
        <div>
            <Navbar url={props.url}selectedProject={props.selectedProject} setSelectedProject= {props.setSelectedProject}/>
            <h1>Här under borde det vara?</h1>
            <ul>
                {projectList.map(project => (
                    <li key={project.projectId} onClick={()=>{
                         props.setSelectedProject(project.projectId)
                        }}>{project.projectname}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;
