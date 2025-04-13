import { useParams,useNavigate,Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksForProject } from "../features/taskSlice";
const ViewProject=()=>{
    const {projectId}=useParams()
    console.log(projectId)
    const dispatch=useDispatch()
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"))
    const token=localStorage.getItem("adminToken")
    const navigate=useNavigate()
    const{name,description}=useLocation()?.state||{}
    const tasks=useSelector(state=>state.tasks)
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
}
},[isAuthenticated,navigate,projectId,dispatch])
console.log(tasks)
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
<div>
    <h2 className="text-success">{name}</h2>
    <p className="fs-4">{description}</p>
    <h3>Tasks Assigned</h3>
</div>
</div>

    </div>

    </main>
    </>)
}
export default ViewProject;