import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Provider} from 'react-redux'
import SignUp from './pages/SignUp.jsx'
import store from './store.js'
import Projects from './pages/Projects.jsx'
import AddNewProject from './pages/AddNewProject.jsx'
import Teams from './pages/Teams.jsx'
import AddNewTeam from './pages/AddNewTeam.jsx'
import ViewProject from './pages/ViewProject.jsx'
import Tasks from './pages/Tasks.jsx'
import AddTask from './pages/AddTask.jsx'
import ViewTaskDetails from './pages/ViewTaskDetails.jsx'
import EditDetails from './pages/EditDetails.jsx'
import Reports from './pages/Reports.jsx'
const router=createBrowserRouter([{
path:"/",
element:<App/>
},{
  path:"/signup",
  element:<SignUp/>
},{
  path:"/projects",
  element:<Projects/>
},{
  path:"newproject",
  element:<AddNewProject/>
},{
  path:"/teams",
  element:<Teams/>
},{
  path:"/addteam",
  element:<AddNewTeam/>
},{
  path:"/viewproject/:projectId",
  element:<ViewProject/>
},{
  path:"/tasks",
  element:<Tasks/>
},{
  path:"/addtask",
  element:<AddTask/>
},{
  path:"/viewtask/:id",
  element:<ViewTaskDetails/>
},{
  path:"/edittask/:id",
  element:<EditDetails/>
},{
  path:"/reports",
  element:<Reports/>
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
