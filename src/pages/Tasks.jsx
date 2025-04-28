import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Link } from "react-router-dom"
import { fetchTasks } from "../features/taskSlice"

import { fetchProjects } from "../features/projectSlice"
import { fetchAllUsers } from "../features/userslice"
import { fetchTeams } from "../features/teamsSlice"
import { fetchTags } from "../features/tagsSlice"
import Filters from "../components/Filters"

const Tasks=()=>{
  const [sortData,setSortData]=useState("")
        const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"))
        const token=localStorage.getItem("adminToken")

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
    const handleSortChange=(e)=>{
setSortData(e.target.value)
    }
    const getSortedTasks = () => {
      if (!tasks?.tasks) return [];
      
      if (sortData === "LowToHigh") {
        return [...tasks.tasks].sort((a, b) => a.timeToComplete - b.timeToComplete);
      } else if (setSortData === "HighToLow") {
        return [...tasks.tasks].sort((a, b) => b.timeToComplete - a.timeToComplete);
      }
      
      return tasks.tasks;
    };

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
    {tasks?.status=="loading" && (<>
    <div className="text-center mt-4">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div></>)}
{tasks?.status=="error" && (<>
<h2 className="text-danger my-2">Error: failed to fetch tasks data</h2></>)}
 {tasks.status!="loading" &&   <div>
  <Filters handleFilterChange={handleFilterChange} filters={filters} teams={teams} projectsData={projectsData} tagsData={tagsData} ownersData={ownersData}/>
   <label>Sort By:</label>
   {" "}
   <select value={sortData} onChange={handleSortChange}>
    <option value="">---Time To Complete--</option>
    <option value="LowToHigh">Low To High</option>
    <option value="HighToLow">High To Low</option>
   </select>
    <div className="me-3">
   
        <ul className="list-group my-3">
    {getSortedTasks()?.map(task=>(<li key={task._id} className="list-group-item"><div className="task-flex"><p >🎯<Link state={{id:task._id,status:task.status,name:task.name,project:task.project,team:task.team,owners:task.owners,tags:task.tags,timeToComplete:task.timeToComplete,updatedAt:task.updatedAt}} to={`/viewtask/${task._id}`}>{task.name}</Link></p><p >~{task?.team?.name}</p></div></li>))}
    </ul>
    {tasks?.tasks.length===0 && <h2 className="text-center my-2">No Tasks Found</h2>}
    </div>
    </div>}
    </div>
    
        </div>
        </>)
    
    
}
export default Tasks;