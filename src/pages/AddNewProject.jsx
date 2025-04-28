import Header from "../components/Header"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { addProject, fetchProjects } from "../features/projectSlice"
import { useDispatch, useSelector } from "react-redux"

const AddNewProject=()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"))
   const projects=useSelector(state=>state.projects)
    const dispatch=useDispatch()
    const [messsage,setMessage]=useState("")
    const [projectData,setProjectData]=useState({
        name:"",
        description:""
    })
    const navigate=useNavigate()
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
    dispatch(fetchProjects({token:curentToken}))
}
},[isAuthenticated,navigate])
const handleChange=event=>{
    const{value,name}=event.target
    setProjectData(prev=>({
        ...prev,[name]:value
    }))
}
const handleSubmit=(event)=>{
event.preventDefault()

const currentToken = localStorage.getItem("adminToken")

dispatch(addProject({token:currentToken,postData:projectData})).then(()=>setMessage("Project Added Sucessfully"))
setTimeout(()=>{
    setMessage("")
},1500)
setProjectData({
    name:"",
        description:""
})
}
const isDuplicateName = projectData.name.length > 0 && 
projects?.projects?.some(project => project.name === projectData.name)
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
<h2>Start New Project</h2>

<button className='btn btn-success' onClick={handleLogout}>Log Out</button>
</div>
<div className="content-container">
    <form className="my-4" onSubmit={handleSubmit}>
        <label htmlFor="name" className="fw-medium fs-5 mb-4">Project Name:</label>
        <input id="name" onChange={handleChange} className="form-control" type="text" name="name" value={projectData.name} required/>
      
        <br/>
        {
          isDuplicateName && <p className="text-danger">Caution: You must have a unique project name</p>
        }<br/>
        <label htmlFor="description" className="fw-medium fs-5 mb-4">Project Description:</label>
        <textarea required id="description" onChange={handleChange} rows={"6"} value={projectData.description} className="form-control"  name="description"></textarea>
        <button className="btn btn-success my-4" type="submit">Add New Project</button>
    </form>
    <h2 className="my-2">{messsage}</h2>
    {
        projects?.status=="error" && <h2 className="text-danger my-2">error: failed to post project data</h2>
    }
</div>
</div>

    </div>
    </>)
}
export default AddNewProject;