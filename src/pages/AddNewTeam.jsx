import Header from "../components/Header"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { useDispatch,useSelector } from "react-redux"
import { addTeams, fetchTeams } from "../features/teamsSlice"
const AddNewTeam=()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"))
   
    const dispatch=useDispatch()
    const [messsage,setMessage]=useState("")
    const [teamsData,setTeamsData]=useState({
        name:"",
        description:""
    })
    const teams=useSelector(state=>state.teams)
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
    dispatch(fetchTeams({token:curentToken}))
}
},[isAuthenticated,navigate])
const handleChange=event=>{
    const{value,name}=event.target
    setTeamsData(prev=>({
        ...prev,[name]:value
    }))
}
const handleSubmit=(event)=>{
event.preventDefault()

const currentToken = localStorage.getItem("adminToken")

dispatch(addTeams({token:currentToken,postData:teamsData})).then(()=>{setMessage("Teams Added Sucessfully")

    setTimeout(()=>{
        setMessage("")
    },1500)
})

setTeamsData({
    name:"",
        description:""
})
}
const isDuplicateName = teamsData.name.length > 0 && 
teams?.teams?.some(team => team.name === teamsData.name)
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
<h2>Create New Team</h2>

<button className='btn btn-success' onClick={handleLogout}>Log Out</button>
</div>
<div className="content-container">
    <form className="my-4" onSubmit={handleSubmit}>
        <label htmlFor="name" className="fw-medium fs-5 mb-4">Team Name:</label>
        <input id="name" onChange={handleChange} className="form-control" type="text" name="name" value={teamsData.name} required/>
        <br/>
        {
          isDuplicateName && <p className="text-danger">Caution: You must have a unique task name</p>
        }<br/>
        <label htmlFor="description" className="fw-medium fs-5 mb-4">Team Description:</label>
        <textarea id="description" onChange={handleChange} rows={"6"} value={teamsData.description} className="form-control"  name="description" required></textarea>
        <button className="btn btn-success my-4" type="submit">Add New Team</button>
    </form>
    <h2 className="my-2">{messsage}</h2>
    {
        teams?.status=="error" && <h2 className="text-danger my-2">error: failed to post teams data</h2>
    }
</div>
</div>

    </div>
    </>)
}
export default AddNewTeam;