import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import './App.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { baseUrl } from './url'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from './features/projectSlice'
function App() {
const [user,setUser]=useState({
  email:"",password:""
})

const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"))
const dispatch=useDispatch()
const projects=useSelector(state=>state.projects)
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
  console.log(currentToken)
  if (currentToken) {
    dispatch(fetchProjects({token: currentToken}))  
  }
}, [dispatch, isAuthenticated])
console.log(projects)
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
</div>}
</div>
{
  token && <>
  
  <div className='row'>
<div className='col-md-2 bg-white-50' id='sidebar-block'>

<div id='sidebar'>
<Link className='bg-success text-light' to={"/projects"} id="navs">Projects</Link>

<Link className='bg-success text-light' id="navs">Teams</Link>
<Link className='bg-success text-light'id="navs">Reports</Link>
<Link className='bg-success text-light' id='navs'>Settings</Link>
</div>
</div>
<div className='col-md-10' id='content-box'>
<div id='heading-box'>
<h2>Dashboard Screen</h2>
<button className='btn btn-success' onClick={handleLogout}>Log Out</button>
</div>
<div>
  <h3>Projects</h3>
  {projects.status==="loading" && (<>
    <div className="text-center">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div></>)}
  <div id='card-container'>
{projects?.projects?.map(project=>(<div key={project._id} className="card" >
  <div  className="card-body">
    <h5 className="card-title" >{project.name}</h5>

    <p className="card-text">{project.description}</p>
  
  </div>
</div>))}
</div>
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
