import { useState,useEffect } from "react"
import { useNavigate ,Link} from "react-router-dom"
import Header from "../components/Header"
import { useDispatch, useSelector } from "react-redux"
import { fetchProjects } from "../features/projectSlice"
import { addTasks, fetchTasks } from "../features/taskSlice"
import { fetchTags } from "../features/tagsSlice"
import { fetchTeams } from "../features/teamsSlice"
import Select from "react-select"
import { fetchAllUsers } from "../features/userslice"

const AddTask=()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"))
    const token=localStorage.getItem("adminToken")
    const dispatch=useDispatch()
    const [message,setMessage]=useState("")
    const [taskData,setTaskData]=useState({
        name:'',
        project:'',
        team:'',
        owners:[],
        tags:[],
        timeToComplete:'',
        status:''
    })
    const navigate=useNavigate()
const handleLogout=()=>{
  localStorage.removeItem("adminToken")
  setIsAuthenticated(false)
}
const projectsData=useSelector(state=>state.projects)
const tagsData=useSelector(state=>state.tags)
const teamsData=useSelector(state=>state.teams)
const ownersData=useSelector(state=>state.user)
useEffect(()=>{
const curentToken=localStorage.getItem("adminToken")
if(!curentToken){
    setIsAuthenticated(false)
    navigate("/")
}else{
    dispatch(fetchProjects({token:curentToken}))
dispatch(fetchTags({token:curentToken}))
dispatch(fetchTeams({token:curentToken}))
dispatch(fetchAllUsers({token:curentToken}))
}
},[isAuthenticated])
console.log(ownersData)
const handleChange=(event)=>{
    const {value,name}=event.target
    setTaskData(()=>({...taskData,[name]:name==="timeToComplete"?parseFloat(value):value}))

}
const handleMultiDropDown=(selectedOptions)=>{
    setTaskData(prev=>({...prev,tags:selectedOptions}))
        }
        const handleMultiDropDownOwners=(selectedOptions)=>{
            setTaskData(prev=>({...prev,owners:selectedOptions}))
                }
       
        const options=tagsData?.tags?.map(tag=>({value:tag._id,label:tag.name}))
        const ownersOptions=ownersData?.user?.map(u=>({value:u._id,label:u.name}))
        const handleSubmit=e=>{
            e.preventDefault()
            const curentToken=localStorage.getItem("adminToken")
            console.log (taskData)
          const taskDataToBeSubmitted={...taskData,tags:taskData?.tags?.map(tag=>tag.value),owners:taskData?.owners.map(owner=>owner.value)}
          console.log(taskDataToBeSubmitted)
          dispatch(addTasks({token:curentToken,postData:taskDataToBeSubmitted})).then(()=>{
            setTaskData(  {name:'',
                project:'',
                team:'',
                owners:[],
                tags:[],
                timeToComplete:'',
                status:''})
            setMessage("Data Submitted Successfuly")
            setTimeout(()=>{
                setMessage("")
            },2000)
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
<h2>Assign New Task</h2>

<button className='btn btn-success' onClick={handleLogout}>Log Out</button>
</div>
<div>
    <form className="me-3" onSubmit={handleSubmit}>
        <label className="fw-medium fs-5 mb-4" htmlFor="name">Task Name:</label>
 <input required type="text" className="form-control" name="name" id="name"  value={taskData.name} onChange={handleChange}/>
 <br/>
 <label className="fw-medium fs-5 mb-4" htmlFor="project">Project :</label>
 <select required className="form-control" name="project" id="project" value={taskData?.project} onChange={handleChange}>
    <option value="">Select Project</option>
 {projectsData?.projects?.map(project=>(<option key={project?._id} value={project?._id}>{project?.name}</option>))}
 </select>
 <br/>
 <label  className="fw-medium fs-5 mb-4" htmlFor="team">Team :</label>
 <select required className="form-control" name="team" id="team" value={taskData.team} onChange={handleChange}>
    <option value="">Select Team</option>
 {teamsData?.teams?.map(team=>(<option key={team?._id} value={team?._id}>{team?.name}</option>))}
 </select>
 <br/>
 <label className="fw-medium fs-5 mb-4" htmlFor="timeToComplete">Time To Complete(In Days):</label>
 <input required type="number" className="form-control" name="timeToComplete" id="timeToComplete"  value={taskData.timeToComplete} onChange={handleChange}/>
 <br/>
 <label className="fw-medium fs-5 mb-4" htmlFor="status">Status :</label>
 <select required className="form-control" name="status" id="status" value={taskData.status} onChange={handleChange}>
    <option value="">Select Status</option>
    <option value="To Do">To Do</option>
    <option value="In Progress">In Progress</option>
<option value="Completed">Completed</option>
<option value="Blocked">Blocked</option>
 </select>
 <br/>
 <label htmlFor="tags" className="fw-medium fs-5 mb-4">Select Multiple Tags:</label>
<Select className="multi" options={options} value={taskData?.tags||""} isMulti onChange={handleMultiDropDown}
/>
<br/>
<label htmlFor="tags" className="fw-medium fs-5 mb-4">Select Owners for the Task (multiple owners can be selected):</label>
<Select className="multi" options={ownersOptions} value={taskData?.owners||""} isMulti onChange={handleMultiDropDownOwners}
/>
<br/>
 <button className="btn btn-success" type="submit">Submit</button>
    </form>
    <h2>{message}</h2>
</div>
</div>

    </div>
    </>)
}

export default AddTask