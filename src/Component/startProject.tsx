import { useState } from "react"
import axios from "axios"
import "../css/navbar.css"
interface Props{

    setUpdateList: Function;
    setShowStartProject:Function
    url: string;

}

interface NewProject{
    projectname: string
    active: boolean
}
const StartProject:React.FC<Props> = ({url,setUpdateList,setShowStartProject}) => {
    const [projectname, setProjectname] = useState<string>("");
    const token = localStorage.getItem("auth_token");


    const createProject = async () => {
        try {

            let newProject:NewProject = {
                projectname: projectname,
                active: true
            }

            const response = await axios.post(url + '/project/project',newProject, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response)
            setProjectname("");


            

        
        } catch (error) {
            console.error(error);
        }
    };




    return (
        <>
            <h1>Start project</h1>



        <form action="" onSubmit={(e)=>{
            e.preventDefault();
            createProject();
            setUpdateList(true);

            }}>
            <input className="projectlist-li"type="text" placeholder="Projectnamn" value={projectname} onChange={(e) => setProjectname(e.target.value)}/>
            <div className="btn-container">
            <button className="projectlist-li" type="submit">Create</button>
        <button className="projectlist-li" onClick={(e) => {
            e.preventDefault();
            setShowStartProject(false)
            setUpdateList(true)}}>
                Close
            </button>
            </div>
            
        </form>

        </>
        
    )
}
export default StartProject

