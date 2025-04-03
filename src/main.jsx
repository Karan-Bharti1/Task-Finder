import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Provider} from 'react-redux'
import SignUp from './pages/Signup.jsx'
import store from './store.js'
import Projects from './pages/Projects.jsx'
const router=createBrowserRouter([{
path:"/",
element:<App/>
},{
  path:"/signup",
  element:<SignUp/>
},{
  path:"/projects",
  element:<Projects/>
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
