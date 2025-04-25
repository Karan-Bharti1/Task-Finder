
import { useParams,useNavigate,Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useState,useEffect } from "react";import TaskForm from "../components/TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../features/projectSlice";
import { fetchTags } from "../features/tagsSlice";
import { fetchTeams } from "../features/teamsSlice";
import { fetchAllUsers } from "../features/userslice";
import { editTasks } from "../features/taskSlice";
const EditDetails=()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"))
    const token=localStorage.getItem("adminToken")
    const navigate=useNavigate()
    const {id,name,project,team,owners,tags,timeToComplete,status,updatedAt}=useLocation().state
const handleLogout=()=>{

  localStorage.removeItem("adminToken")
  setIsAuthenticated(false)
}
const dispatch=useDispatch()
const [message,setMessage]=useState("")

const [taskData,setTaskData]=useState({
    name:name,
    project:project._id,
    team:team._id,
    owners:owners.map(owner=>({value:owner._id,label:owner.name})),
    tags:tags.map(tag=>({value:tag._id,label:tag.name})),
    timeToComplete:timeToComplete,
    status:status
})

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
        const handleSubmit=(e)=>{
                  e.preventDefault()
                        const curentToken=localStorage.getItem("adminToken")
                        console.log(taskData)
                      const taskDataToBeSubmitted={...taskData,tags:taskData?.tags?.map(tag=>tag.value),owners:taskData?.owners.map(owner=>owner.value)}

                      dispatch(editTasks({token:curentToken,id,task:taskDataToBeSubmitted})).then(()=>{
                        
                        setMessage("Data Submitted Successfuly")
                        setTimeout(()=>{
                            setMessage("")
                            navigate("/tasks")
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
<h2>Edit Task Details</h2>

<button className='btn btn-success' onClick={handleLogout}>Log Out</button>
</div>
<div>
<TaskForm handleSubmit={handleSubmit} taskData={taskData} handleChange={handleChange} projectsData={projectsData} teamsData={teamsData} options={options} handleMultiDropDown={handleMultiDropDown} handleMultiDropDownOwners={handleMultiDropDownOwners} ownersOptions={ownersOptions}/>
<h2>{message}</h2>
</div>
</div>

    </div>
    </>)
}
export default EditDetails