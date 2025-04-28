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
import TaskForm from "../components/TaskForm"

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
const tasks=useSelector(state=>state.tasks)
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
          const taskDataToBeSubmitted={...taskData,tags:taskData?.tags?.map(tag=>tag.value),owners:taskData?.owners.map(owner=>owner.value)}
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
   <TaskForm handleSubmit={handleSubmit} taskData={taskData} handleChange={handleChange} projectsData={projectsData} teamsData={teamsData} options={options} handleMultiDropDown={handleMultiDropDown} handleMultiDropDownOwners={handleMultiDropDownOwners} ownersOptions={ownersOptions}/>
    <h2 className="my-2">{message}</h2>
{tasks.status=="error" && <h2 className="text-danger my-2">error: failed to add new task data</h2>}
</div>
</div>

    </div>
    </>)
}

export default AddTask