import { useParams,useNavigate,Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksForProject } from "../features/taskSlice";
import Filters from "../components/Filters";
import { fetchProjects } from "../features/projectSlice";
import { fetchTags } from "../features/tagsSlice";
import { fetchAllUsers } from "../features/userslice";
import { fetchTeams } from "../features/teamsSlice";
fetchTeams
const ViewProject=()=>{
    const {projectId}=useParams()
    const dispatch=useDispatch()
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"))
    const token=localStorage.getItem("adminToken")
    const navigate=useNavigate()
    const{name,description}=useLocation()?.state||{}
    const tasks=useSelector(state=>state.tasks)
    const tags=useSelector(state=>state.tags)
    const ownersData=useSelector(state=>state.user)
    const [tagFilter,setTagFilter]=useState("")
    const [ownerFilter,setOwnerFilter]=useState("")
const handleLogout=()=>{
  localStorage.removeItem("adminToken")
  setIsAuthenticated(false)
}

useEffect(()=>{
const curentToken=localStorage.getItem("adminToken")
if(!curentToken){
    setIsAuthenticated(false)
    navigate("/")
}else{
    dispatch(fetchTasksForProject({token:curentToken,id:projectId}))
          
           dispatch(fetchProjects({token:curentToken}))
           dispatch(fetchAllUsers({token:curentToken}))
           dispatch(fetchTeams({token:curentToken}))
           dispatch(fetchTags({token:curentToken}))
         
}
},[isAuthenticated,navigate,projectId,dispatch])

const filteredTasks = tasks?.tasks?.filter(task => {
    const matchOwner = ownerFilter ? task.owners?.some(owner => owner === ownerFilter) : true;
    const matchTag = tagFilter ? task.tags?.some(tag => tag=== tagFilter) : true;
    return matchOwner && matchTag;
  });
  
    return(<>
    <Header/>
    <main>
    <div className="row">
    <div className='col-md-2 bg-white-50' id='sidebar-block'>

<div id='sidebar'>
<Link className='bg-success text-light' to={"/"} id="navs">Back to Dashboard</Link>
</div>
</div>
<div className="col-md-10">
<div id='heading-box'>
<h2></h2>

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
{tasks.status!="loading" &&<div className="me-4">
    <h2 className="text-success">{name}</h2>
    <p className="fs-4">{description}</p>
    <h3>Tasks Assigned</h3>
    <div className="my-3">
<label>Filters By:</label>
{" "}
<select  name="owner" value={ownerFilter} onChange={(e)=>setOwnerFilter(e.target.value)}>
    <option value="">---Owners---</option>
 {ownersData?.user?.map(tag=>(<option key={tag?._id} value={tag?._id}>{tag?.name}</option>))}
 </select>
{" "}
<select  name="tag" value={tagFilter} onChange={(e)=>setTagFilter(e.target.value)}>
    <option value="">---Tags---</option>
 {tags?.tags?.map(tag=>(<option key={tag?._id} value={tag?._id}>{tag?.name}</option>))}
 </select>
</div>
    <ul className="list-group">
     
    {filteredTasks?.map(task=>(<li key={task?._id} className="list-group-item"><div>🎯 {task?.name}{task?.team?.name}</div></li>))}
    </ul>
</div>}
</div>

    </div>

    </main>
    </>)
}
export default ViewProject;