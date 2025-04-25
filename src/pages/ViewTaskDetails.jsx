import { useParams,useNavigate,Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useState,useEffect } from "react";

import Filters from "../components/Filters";
const ViewTaskDetails=()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"))
    const token=localStorage.getItem("adminToken")
    const navigate=useNavigate()
const handleLogout=()=>{
  localStorage.removeItem("adminToken")
  setIsAuthenticated(false)
}
const {id,name,project,team,owners,tags,timeToComplete,status,updatedAt}=useLocation().state
useEffect(()=>{
const curentToken=localStorage.getItem("adminToken")
if(!curentToken){
    setIsAuthenticated(false)
    navigate("/")
}

},[isAuthenticated])
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
<h2>Task Details</h2>
<Link className="btn btn-success"  state={{id,name,project,team,owners,tags,timeToComplete,status,updatedAt}} to={`/edittask/${id}`}>Edit Details</Link>
<button className='btn btn-success' onClick={handleLogout}>Log Out</button>
</div>
<div>
<h5 className="mt-4 mb-3">Task Name: {name}</h5>
<h5 className="my-3">Status: {status} </h5>
<h5 className="my-3">Time To Complete: {timeToComplete} days</h5>
<h5 className="my-3">Owners: {owners.map(owner=>owner.name).join(", ")}</h5>
<h5 className="my-3">Tags: {tags.map(tag=><button key={tag._id} className="mx-2 btn btn-danger">{tag.name}</button>)}</h5>
<h5 className="my-3">Updated At: {updatedAt}</h5>
<div className="details-container my-4">
<div className="card p-3">
    <h4 className="card-title">Project Details</h4>
    <h5 className="card-subtitle mb-2 text-body-secondary">{project.name}</h5>
    <p className="card-body">{project.description}</p>
</div>
<div className="card p-3">
<h4 className="card-title">Team Details</h4>
<h5 className="card-subtitle mb-2 text-body-secondary">{team.name}</h5>
<p className="card-body">{team.description}</p>
</div>
</div>

</div>
</div>

    </div>
    </>)
}

export default ViewTaskDetails