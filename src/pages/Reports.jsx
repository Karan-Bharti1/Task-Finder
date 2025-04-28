import { useParams,useNavigate,Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useState,useEffect } from "react";
import { Chart as ChartJs,Legend,Tooltip,ArcElement,CategoryScale,LinearScale,BarElement,Title } from "chart.js";
import { Pie,Bar } from "react-chartjs-2";
import { fetchTasks } from "../features/taskSlice";
import { useDispatch, useSelector } from "react-redux";

import { fetchTotalTasksClosedInLastWeek } from "../features/reportsSlice";
import { baseUrl } from "../url";
import { getHeaders, projectSlice } from "../features/projectSlice";
ChartJs.register(Legend,Tooltip,ArcElement,CategoryScale,LinearScale,BarElement,Title)
const Reports=()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"))
    const token=localStorage.getItem("adminToken")
    const [pendingTasksData, setPendingTasksData] = useState({})
    const navigate=useNavigate()
    const [filters,setFilters]=useState({
        status:"",
        tag:"",
        owner:"",
        team:"",
        project:""

    })
    const dispatch=useDispatch()
    const [taskData,setTaskData]=useState([])
    const tasks=useSelector(state=>state.tasks)
    const tasksClosedInLastWeek=useSelector(state=>state.reports)
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
    const curentToken=localStorage.getItem("adminToken")
dispatch(fetchTotalTasksClosedInLastWeek({token:curentToken}))
dispatch(fetchTasks({token:token,key:"status",value:filters.status,key1:"tag",value1:filters.tag,key2:"owner",value2:filters.owner,key3:"project",value3:filters.project,key4:"team",value4:filters.team}))
}

},[isAuthenticated])
useEffect(()=>{
setTaskData(tasks.tasks)
},[dispatch,tasks.tasks])
useEffect(() => {
    const fetchPendingTasksReport = async () => {
        try {
            const currentToken = localStorage.getItem("adminToken")
            const response = await fetch(`${baseUrl}report/pending`, {
                headers: getHeaders(currentToken)
            })
            const data = await response.json()
            setPendingTasksData(data)
        } catch (error) {
            console.log("Error while fetching number of total days left to complete all tasks:", error)
        }
    }
    
    fetchPendingTasksReport()
}, [token])

const closedTasks=taskData?.filter(task=>task.status==="Completed")
const pendingTasks=taskData?.filter(task=>task.status!="Completed")
const tasksClosedReportsLastWeek=tasksClosedInLastWeek.tasks

const pieChartData={
    labels:["Closed Tasks","In Pipeline"],
    datasets:[{
        label:"Total Number",
        data:[closedTasks.length,pendingTasks.length],
        backgroundColor:[  "#E6E6FA",
            "#90EE90"],
            hoverOffset: 4,
        }]}
        const options={
            responsive:true,
            plugins: {
                legend: {
                  display: true,
                  position: 'bottom'
                },
              
              }
        }
        const PieChart=({data})=>{
            return(<>
            <Pie options={options} data={data}/></>)
        }
  
        console.log(taskData)
        const barChartData = {
            labels: pendingTasks?.map(task => task.name) || [],
            datasets: [{
                label: "Time to Complete (Days)",
                data: pendingTasks?.map(task => task.timeToComplete) || [],
                maintainAspectRatio: false,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1
            }]
        }
        const barChartData2={
            labels: tasksClosedReportsLastWeek?.map(task => task.name) || [],
            datasets: [{
                label: "Time Taken to Complete (Days)",
                data: tasksClosedReportsLastWeek?.map(task => task.timeToComplete) || [],
                maintainAspectRatio: false,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1
            }]
        }
        
        const projectTaskSummary = closedTasks.reduce((acc, task) => {
            const projectName = task.project.name;
          
            const existingProject = acc.find(p => p.projectName === projectName);
          
            if (existingProject) {
              existingProject.taskCount += 1;
            } else {
              acc.push({ projectName, taskCount: 1 });
            }
          
            return acc;
          }, []);
       
          const teamTaskSummary = closedTasks.reduce((acc, task) => {
            const teamName = task.team.name;
          
            const existingProject = acc.find(p => p.teamName === teamName);
          
            if (existingProject) {
              existingProject.taskCount += 1;
            } else {
              acc.push({ teamName, taskCount: 1 });
            }
            return acc;
          }, []);
          
          const barChartData3={
            labels: projectTaskSummary?.map(p => p.projectName) || [],
            datasets: [{
                label: "Number of tasks completed under Project",
                data: projectTaskSummary?.map(task => task.taskCount) || [],
                maintainAspectRatio: false,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1
            }]
        }
        const barChartData4={
            labels: teamTaskSummary?.map(p => p.teamName) || [],
            datasets: [{
                label: "Number of tasks completed by Team",
                data: teamTaskSummary?.map(task => task.taskCount) || [],
                maintainAspectRatio: false,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1
            }]
        }
        const barOptions = {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  text: 'Number of Leads'
                }
              },
              x: {
                title: {
                  text: 'Sales Agents'
                }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'bottom'
              },
            
            }
          };
          const BarChart=({data})=>{
            return(<>
            <Bar options={barOptions} data={data}/></>)
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
<h2>Reports</h2>

<button className='btn btn-success' onClick={handleLogout}>Log Out</button>
</div>
{(tasks.status ==="loading"||tasksClosedInLastWeek.status==="loading"  ) &&(<>
    <div className="text-center mt-4">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div></>)}
{(tasks?.status=="error"|| tasksClosedInLastWeek.status=="error") && (<>
  <h2 className="text-danger my-2">Error: failed to fetch reports data</h2></>)}
{(tasks.status !=="loading"|| tasksClosedInLastWeek.status!="loading"  )&&<div>
    <div className="chartDataContainer">
        <div className="dataContainer">
            <h2>Total Tasks</h2>
           <h4> Total Tasks: {taskData.length}</h4>
           <h4>  Closed Tasks: {closedTasks.length}</h4>
           <h4> Pending Tasks: {pendingTasks.length}</h4>
        </div>
<div className="chartContainer">
<PieChart data={pieChartData}/>
</div>

</div>
<div className="chartDataContainer mt-4">
                            <div >
                                <h2>Pending Tasks </h2>
                                <h4>Number of Pending Tasks: {pendingTasks?.length || 0}</h4>
                                <h4>Days Required to complete all pending tasks: {pendingTasksData.totalDays} days</h4>
                            </div>
                            <div className="chartContainer2">
                                <BarChart data={barChartData}/>
                            </div>
                        </div>

                        <div className="chartDataContainer">
                            <div >
                                <h2>Tasks closed in Last week</h2>
                                <h4>Number of Closed Tasks: {tasksClosedReportsLastWeek?.length || 0}</h4>
                            </div>
                            <div className="chartContainer2">
                                <BarChart data={barChartData2}/>
                            </div>
                        </div>
                        <div className="chartDataContainer">
                           
                            <div className="chartContainer2">
                                <h2>Project Wise Details</h2>
                                <BarChart data={barChartData3}/>
                            </div>
                            <div className="chartContainer2">
                                <h2>Team Wise Details</h2>
                                <BarChart data={barChartData4}/>
                            </div>
                        </div>
</div>}
</div>

    </div>
    </>)
}
export default Reports;
