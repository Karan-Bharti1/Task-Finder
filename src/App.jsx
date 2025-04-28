import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import './App.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { baseUrl } from './url'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from './features/projectSlice'
import { fetchTasks } from './features/taskSlice'
import { fetchAllUsers } from './features/userslice'
import { fetchTeams } from './features/teamsSlice'
import { fetchTags } from './features/tagsSlice'
import Filters from './components/Filters'
function App() {
 
const [user,setUser]=useState({
  email:"",password:""
})
const [filters,setFilters]=useState({
  status:"",
  tag:"",
  owner:"",
  team:"",
  project:""

})

const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"))
const dispatch=useDispatch()

const projects=useSelector(state=>state.projects)
const state=useSelector(state=>state.user)

const handlechange=(event)=>{
const {name,value}=event.target
setUser(prev=>({
  ...prev,[name]:value
}))
}
const handleSubmit=async(event)=>{
  event.preventDefault()
  const response=await fetch(`${baseUrl}login`,{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(user)
  })
const data=await response.json()
localStorage.setItem("adminToken",data.token)
setIsAuthenticated(true)
}
const token=localStorage.getItem("adminToken")

const handleLogout=()=>{
  localStorage.removeItem("adminToken")
  setIsAuthenticated(false)
}
useEffect(() => {
  const currentToken = localStorage.getItem("adminToken")

  if (currentToken) {
    dispatch(fetchProjects({token: currentToken}))  
    dispatch(fetchTasks({token:currentToken,key:"status",value:filters.status,key1:"tag",value1:filters.tag,key2:"owner",value2:filters.owner,key3:"project",value3:filters.project,key4:"team",value4:filters.team}))

        dispatch(fetchAllUsers({token:currentToken}))
        dispatch(fetchTeams({token:currentToken}))
        dispatch(fetchTags({token:currentToken}))
  }else{
    setIsAuthenticated(false)
  }
}, [dispatch, isAuthenticated])

const handleFilterChange=e=>{
  const {name,value}=e.target
  const token=localStorage.getItem("adminToken")
  const updatedFilters={...filters,[name]:value}
  setFilters(updatedFilters)
  dispatch(fetchTasks({token:token,key:"status",value:updatedFilters.status,key1:"tag",value1:updatedFilters.tag,key2:"owner",value2:updatedFilters.owner,key3:"project",value3:updatedFilters.project,key4:"team",value4:updatedFilters.team}))
}


const ownersData=useSelector(state=>state.user)
const tagsData=useSelector(state=>state.tags)
const teams=useSelector(state=>state.teams)
    const tasks=useSelector(state=>state.tasks)

  return (
    <>
<Header/>
<main >
  <div className='container'>
{!token  && <div id="login-form">
  <form onSubmit={handleSubmit} className='border p-5 '>
    <h2 className='py-2 text-success'> User Login</h2>
  <input className="form-control my-3"  type="text" name='email' onChange={handlechange} placeholder="Email Id" />
  <input className="form-control my-3" type="password" name='password' onChange={handlechange} placeholder="Password" />
  <button className="btn btn-success" type='submit'>Login</button>
  </form>
  <p className='my-3'>~ In case you don't have a account <Link to={"/signup"}>Sign up</Link></p>
  {state.status == "error" && <p className="text-danger py-3">Error: Unable to login</p>}
</div>}
</div>
{
  token && <>
 
  <div className='row'>
<div className='col-md-2 bg-white-50' id='sidebar-block'>

<div id='sidebar'>
<Link className='bg-success text-light' to={"/projects"} id="navs">Projects</Link>

<Link className='bg-success text-light' to={"/teams"} id="navs">Teams</Link>
<Link className='bg-success text-light' to="/reports" id="navs">Reports</Link>
<Link className='bg-success text-light' id='navs' to={"/tasks"}>Tasks</Link>
</div>
</div>
<div className='col-md-10' id='content-box'>
<div id='heading-box'>
<h2>Dashboard Screen</h2>
<button className='btn btn-success' onClick={handleLogout}>Log Out</button>
</div>
<div>
{(projects.status==="loading" || tasks.status==="loading") && (<>
    <div className="text-center">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div></>)}
{(projects.status=="error" || tasks.status=="error") && (<>
   <div>
    <h2 className='my-3 text-danger'>error: failed To fetch projects and tasks data</h2></div></>)}
{ (projects.status!="loading" || tasks.status!="loading"  )&& <><h3>Projects</h3>

  <div id='card-container'>
{projects?.projects?.map(project=>(<div key={project?._id} className="card" >
  <div  className="card-body">
  <Link  state={{name:project?.name,description:project?.description}} to={`/viewproject/${project?._id}`}>{project?.name}</Link>

    <p className="card-text">{project?.description}</p>
  
  </div>
</div>))}

</div>
<br/>
<h3>Tasks</h3>
<Filters handleFilterChange={handleFilterChange} filters={filters} teams={teams} projectsData={projects} tagsData={tagsData} ownersData={ownersData}/>
<ul className="list-group my-3 me-3">
{tasks?.tasks?.map(task=>(<li key={task._id} className="list-group-item"><div className="task-flex"><p >🎯<Link state={{id:task._id,status:task.status,name:task.name,project:task.project,team:task.team,owners:task.owners,tags:task.tags,timeToComplete:task.timeToComplete,updatedAt:task.updatedAt}} to={`/viewtask/${task._id}`}>{task.name}</Link></p><p >~{task?.team?.name}</p></div></li>))}
</ul>
{tasks?.status !="loading"&&tasks?.tasks.length===0 && <h2 className="text-center my-2">No Tasks Found</h2>}
</>
}
</div>

</div>

  </div>
  </>
}
</main>
    </>
  )
}

export default App
