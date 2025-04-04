import Header from "../components/Header"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import { addTeams } from "../features/teamsSlice"
const AddNewTeam=()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"))
   
    const dispatch=useDispatch()
    const [messsage,setMessage]=useState("")
    const [teamsData,setTeamsData]=useState({
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
console.log("Teams Data",teamsData)
const currentToken = localStorage.getItem("adminToken")
console.log(currentToken,teamsData)
dispatch(addTeams({token:currentToken,postData:teamsData})).then(()=>setMessage("Teams Added Sucessfully"))
setTimeout(()=>{
    setMessage("")
},1500)
setTeamsData({
    name:"",
        description:""
})
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
<h2>Create New Team</h2>

<button className='btn btn-success' onClick={handleLogout}>Log Out</button>
</div>
<div className="content-container">
    <form className="my-4" onSubmit={handleSubmit}>
        <label htmlFor="name" className="fw-medium fs-5 mb-4">Team Name:</label>
        <input id="name" onChange={handleChange} className="form-control" type="text" name="name" value={teamsData.name}/>
        <br/><br/>
        <label htmlFor="description" className="fw-medium fs-5 mb-4">Team Description:</label>
        <textarea id="description" onChange={handleChange} rows={"6"} value={teamsData.description} className="form-control"  name="description"></textarea>
        <button className="btn btn-success my-4" type="submit">Add New Team</button>
    </form>
    <h2 className="text-success">{messsage}</h2>
</div>
</div>

    </div>
    </>)
}
export default AddNewTeam;