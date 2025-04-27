import Header from "../components/Header"
import { useState,useEffect } from "react"
import { useNavigate,Link } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import { fetchTeams } from "../features/teamsSlice"
const Teams=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"))
    const teams=useSelector(state=>state.teams)
    console.log(teams)
    useEffect(()=>{
        const currentToken=localStorage.getItem("adminToken")
        if (!currentToken) {
            setIsAuthenticated(false)
            navigate("/")
        } else {
            setIsAuthenticated(true)
            
            dispatch(fetchTeams({token: currentToken }))
        }},[navigate,isAuthenticated,dispatch])
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
<h2>Teams</h2>
<Link className="btn btn-success" to="/addteam">+ New Team</Link>
<button className='btn btn-success' onClick={handleLogout}>Log Out</button>
</div>
<div>
{teams?.status==="loading" && (<>
    <div className="text-center mt-4">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div></>)}
    <div id='card-container'>
{teams?.teams?.map(team=>(<div  key={team?._id} className="card" >
  <div className="card-body">
    <h5 className="card-title"><Link to={`/viewteam/${team._id}`} state={{id:team._id,name:team.name,description:team.description}}>{team?.name} 👥</Link></h5>
<p className="card-text">🧑‍💼🎯🧑‍💼🫂🧑‍💼 </p>
    <p className="card-text">{team?.description}</p>
  
  </div>
</div>))}
</div>
</div>
</div>
</div>
    </main>
    </>)
}

export default Teams;