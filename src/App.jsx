import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import './App.css'
import { Link } from 'react-router-dom'
function App() {


  return (
    <>
<Header/>
<main className='container'>
<div id="login-form">
  <form className='border p-5 '>
    <h2 className='py-2 text-success'> User Login</h2>
  <input className="form-control my-3" type="text" placeholder="Email Id" />
  <input className="form-control my-3" type="password" placeholder="Password" />
  <button className="btn btn-success">Login</button>
  </form>
  <p className='my-3'>~ In case you don't have a account <Link to={"/signup"}>Sign up</Link></p>
</div>
</main>
    </>
  )
}

export default App
