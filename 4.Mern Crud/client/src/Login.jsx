import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
 

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:3001/login",{email,password})
    .then((res)=>{
        console.log(res)
        navigate('/home',{state:{email}})
    })
    .catch((err)=>console.log(err))
    
  }
  return (
    <div>
        <form action="" onSubmit={handleSubmit}>            
            <div>
                <label htmlFor="">Email </label>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="">Password </label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            <div>
                <button type='submit'>Login</button>
            </div>
            <div>have an Account ? 
                <Link to='/register'>Register</Link>
            </div>
        </form>
    </div>
  )
}

export default Login