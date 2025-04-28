import { useEffect, useState } from "react"
import Header from "../components/Header"
import { fetchUsers, signUpUser } from "../features/userslice"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const SignUp=()=>{
    const state=useSelector(state=>state.user)

    const dispatch=useDispatch()
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:""
    })
    const [recheckPassword,setRecheckPassword]=useState("")
    
    const matchedEmail = state?.user?.emailIds?.some(email => email === user.email)
   
    const handleChange=(event)=>{
        const {name,value}=event.target
        setUser(prev=>({...prev,
            [name]:value
        }))
    }
    useEffect(()=>{
        dispatch(fetchUsers())
    },[dispatch])
 
    const [isForm,setIsForm]=useState(false)

    const handleSubmit=(event)=>{
        event.preventDefault()
        if(user.password===recheckPassword && !matchedEmail)
       dispatch(signUpUser(user)).then(()=>setIsForm(true))
    
    }

    
    return(<>
    <Header/>
    <main className="container">
        <div id="login-form">
        {!isForm &&( <><form onSubmit={handleSubmit}>
            <h2 className="text-success">Create your account</h2>
        <input className="form-control my-3" name="name" type="text" value={user.name} onChange={handleChange}  placeholder="Username" required/>
        <input className="form-control my-3" name="email" type="text" value={user.email} onChange={handleChange}  placeholder="Email Id" required/>
        {matchedEmail && <p className="text-danger">{user.email} already exists</p>}
        <input className="form-control my-3" name="password" type="password"  value={user.password}  onChange={handleChange}placeholder="Password" required/>
        <input className="form-control my-3" type="password" onChange={event=>setRecheckPassword(event.target.value)} value={recheckPassword} placeholder="Re-check Password" required />

        <button className="btn btn-success" type="submit">Sign up</button>
        </form>
        <Link to={"/"}>Back to Login</Link></>)}
        {isForm && (<><h2 className="text-success">You had a successful sign up</h2>
        <Link to="/" className="btn btn-success my-3">Login</Link></>)}
        {state.status === "error" && <p className="text-danger py-3">Error: Unable to login user</p>}
        {user.password.length>0 && recheckPassword.length>0 && user.password!==recheckPassword && <p className="text-danger py-3">Caution: Both passwords must match</p>}
        </div>
    </main>
    </>)
}
export default SignUp