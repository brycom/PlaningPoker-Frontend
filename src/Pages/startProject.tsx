import { useState } from "react"
import axios from "axios"
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
        <div>
            <h1>Starta projekt</h1>



        <form action="" onSubmit={(e)=>{
            e.preventDefault();
            createProject();
            setUpdateList(true);

            }}>
            <input type="text" placeholder="Projectnamn" value={projectname} onChange={(e) => setProjectname(e.target.value)}/>
            <button type="submit">Skapa</button>
            
        </form>
        <button onClick={() => {
            setShowStartProject(false)
            setUpdateList(true)}}>
                Stäng
            </button>

        </div>
        
    )
}
export default StartProject

