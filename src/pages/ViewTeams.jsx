import { useParams,useNavigate,Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksForTeams } from "../features/taskSlice";
const ViewTeams=()=>{
    const [sortData,setSortData]=useState("")
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"))
   
    const dispatch=useDispatch()
    const navigate=useNavigate()
const handleLogout=()=>{
  localStorage.removeItem("adminToken")
  setIsAuthenticated(false)
}
const tasks=useSelector(state=>state.tasks)

const {id,name,description}=useLocation().state
useEffect(()=>{
const curentToken=localStorage.getItem("adminToken")
if(!curentToken){
    setIsAuthenticated(false)
    navigate("/")
}else{
    dispatch(fetchTasksForTeams({token:curentToken,id:id}))
}
},[isAuthenticated])
const getSortedTasks = () => {
    if (!tasks?.tasks) return [];
    
    if (sortData === "LowToHigh") {
      return [...tasks.tasks].sort((a, b) => a.timeToComplete - b.timeToComplete);
    } else if (setSortData === "HighToLow") {
      return [...tasks.tasks].sort((a, b) => b.timeToComplete - a.timeToComplete);
    }
    
    return tasks.tasks;
  };
  const handleSortChange=(e)=>{
    setSortData(e.target.value)
        }
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
<h2>Team's View</h2>

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
{tasks?.status!="loading" &&<div>
    <div className="mt-3">
<h4>{name}</h4>
<p className="fs-4">{description}</p>    
</div>
<h4>Tasks Assigned</h4>
<label>Sort By: </label>{" "}
<select value={sortData} onChange={handleSortChange}>
    <option value="">---Time To Complete--</option>
    <option value="LowToHigh">Low To High</option>
    <option value="HighToLow">High To Low</option>
   </select>
    <div className="me-3">
   
        <ul className="list-group mt-3">
    {getSortedTasks()?.map(task=>(<li key={task._id} className="list-group-item"><div className="task-flex"><p >🎯<Link state={{id:task._id,status:task.status,name:task.name,project:task.project,team:task.team,owners:task.owners,tags:task.tags,timeToComplete:task.timeToComplete,updatedAt:task.updatedAt}} to={`/viewtask/${task._id}`}>{task.name}</Link></p><p >~  {task?.status}</p></div></li>))}
    </ul>
    </div>
</div>}
</div>

    </div>
    </>)
}
export default ViewTeams;
