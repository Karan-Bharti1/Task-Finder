import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Link } from "react-router-dom"
import { fetchTasks } from "../features/taskSlice"
const Tasks=()=>{
    {
        const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"))
        const token=localStorage.getItem("adminToken")
        const [tasksData,setTasksData]=useState([])
        const navigate=useNavigate()
    const handleLogout=()=>{
      localStorage.removeItem("adminToken")
      setIsAuthenticated(false)
    }
    const dispatch=useDispatch()
    const tasks=useSelector(state=>state.tasks)
    useEffect(()=>{
    const curentToken=localStorage.getItem("adminToken")
    if(!curentToken){
        setIsAuthenticated(false)
        navigate("/")
    }else{
       dispatch( fetchTasks({token:curentToken}))
    }
    },[isAuthenticated,navigate,dispatch])
    console.log(tasks)
        return(<>
        <Header/>
        <div className="row">
        <div className='col-md-2 bg-white-50' id='sidebar-block'>
    
    <div id='sidebar'>
    <Link className='bg-success text-light' to={"/"} id="navs">Back to Dashboard</Link>
    </div>
    </div>
    <div className="col-md-10">
    <div id='heading-box'>
    <h2>View Tasks</h2>
    
    <button className='btn btn-success' onClick={handleLogout}>Log Out</button>
    </div>
    <div>
        <ul>
    {tasks?.tasks?.map(task=>(<li>{task.name}</li>))}
    </ul>
    </div>
    </div>
    
        </div>
        </>)
    }
    
}
export default Tasks;