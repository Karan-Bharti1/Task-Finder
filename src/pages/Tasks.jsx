import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Link } from "react-router-dom"
import { fetchTasks } from "../features/taskSlice"
import { current } from "@reduxjs/toolkit"
import { fetchProjects } from "../features/projectSlice"
import { fetchAllUsers } from "../features/userslice"
import { fetchTeams } from "../features/teamsSlice"
import { fetchTags } from "../features/tagsSlice"
import Filters from "../components/Filters"
const Tasks=()=>{
    
        const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"))
        const token=localStorage.getItem("adminToken")
        const [tasksData,setTasksData]=useState([])
        const navigate=useNavigate()
    const handleLogout=()=>{
      localStorage.removeItem("adminToken")
      setIsAuthenticated(false)
    }
    const dispatch=useDispatch()
    const [filters,setFilters]=useState({
        status:"",
        tag:"",
        owner:"",
        team:"",
        project:""

    })
    const handleFilterChange=e=>{
        const {name,value}=e.target
        const token=localStorage.getItem("adminToken")
        const updatedFilters={...filters,[name]:value}
        setFilters(updatedFilters)
        dispatch(fetchTasks({token:token,key:"status",value:updatedFilters.status,key1:"tag",value1:updatedFilters.tag,key2:"owner",value2:updatedFilters.owner,key3:"project",value3:updatedFilters.project,key4:"team",value4:updatedFilters.team}))
    }
    const tasks=useSelector(state=>state.tasks)
    const projectsData=useSelector(state=>state.projects)
    const ownersData=useSelector(state=>state.user)
    const tagsData=useSelector(state=>state.tags)
    const teams=useSelector(state=>state.teams)
    useEffect(()=>{
    const curentToken=localStorage.getItem("adminToken")
 console.log(curentToken)
    if(!curentToken){
        setIsAuthenticated(false)
        navigate("/")
    }else{
       dispatch(fetchTasks({token:curentToken,key:"status",value:filters.status,key1:"tag",value1:filters.tag,key2:"owner",value2:filters.owner,key3:"project",value3:filters.project,key4:"team",value4:filters.team}))
       dispatch(fetchProjects({token:curentToken}))
       dispatch(fetchAllUsers({token:curentToken}))
       dispatch(fetchTeams({token:curentToken}))
       dispatch(fetchTags({token:curentToken}))
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
    <Link className="btn btn-success" to={"/addtask"}>+ New Task</Link>
    <button className='btn btn-success' onClick={handleLogout}>Log Out</button>
    </div>
  <Filters handleFilterChange={handleFilterChange} filters={filters} teams={teams} projectsData={projectsData} tagsData={tagsData} ownersData={ownersData}/>
    <div className="me-3">
    {tasks?.status=="loading" && (<>
    <div className="text-center mt-4">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div></>)}
        <ul className="list-group mt-3">
    {tasks?.tasks?.map(task=>(<li key={task._id} className="list-group-item"><div className="task-flex"><p >🎯{task.name}</p><p >~{task?.team?.name}</p></div></li>))}
    </ul>
    </div>
    </div>
    
        </div>
        </>)
    
    
}
export default Tasks;