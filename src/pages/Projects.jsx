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
        if (!currentToken) {
            setIsAuthenticated(false)
            navigate("/")
        } else {
            setIsAuthenticated(true)
            
            dispatch(fetchProjects({ token: currentToken }))
        }
        
     
    },[dispatch,isAuthenticated,navigate])
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
<Link className="btn btn-success" to="/newproject">+ New Project</Link>
<button className='btn btn-success' onClick={handleLogout}>Log Out</button>
</div>
<div>
{projects?.status==="loading" && (<>
    <div className="text-center mt-4">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div></>)}

{projects?.status=="error" && (<>
  <h2 className="text-danger my-2">Error: failed to fetch projects data</h2></>)}
    <div id='card-container'>
   
{projects?.projects?.map(project=>(<div  key={project?._id} className="card" >
  <div className="card-body">
    <Link  state={{name:project.name,description:project.description}} to={`/viewproject/${project?._id}`}>{project?.name}</Link>

    <p className="card-text">{project?.description}</p>
  
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