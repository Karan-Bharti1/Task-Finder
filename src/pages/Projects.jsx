import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProjects } from "../features/projectSlice"
import { Link } from "react-router-dom"
const Projects=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"))
    const projects=useSelector(state=>state.projects)
    useEffect(()=>{
        const currentToken=localStorage.getItem("adminToken")
        if(!currentToken){
            setIsAuthenticated(false)
            navigate("/")
        }
        if(currentToken){
            fetchProjects({token:currentToken})
        }
        
        console.log(currentToken)
    },[dispatch,isAuthenticated])
    const handleLogout=()=>{
        localStorage.removeItem("adminToken")
        setIsAuthenticated(false)
      }
    return(<>
    <Header/>
    <main>
    <div className='row'>
<div className='col-md-2 bg-white-50' id='sidebar-block'>

<div id='sidebar'>
<Link className='bg-success text-light' to={"/"} id="navs">Back to Dashboard</Link>
</div>
</div>
<div className="col-md-10">
<div id='heading-box'>
<h2>Projects</h2>
<Link className="btn btn-success">+ New Project</Link>
<button className='btn btn-success' onClick={handleLogout}>Log Out</button>
</div>
<div>
    <div id='card-container'>
{projects?.projects?.map(project=>(<div class="card" >
  <div class="card-body">
    <h5 class="card-title" key={project._id}>{project.name}</h5>

    <p class="card-text">{project.description}</p>
  
  </div>
</div>))}
</div>
</div>
</div>
</div>
    </main>
    </>)
}
export default Projects