import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:3001/login",{email,password})
        .then((res)=>{
            alert('User Login Sucessfully')
            navigate('/home')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
    <div>
        <h1>Login </h1>
        <form action="" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">Email : </label>
                <input type="email" value={email} placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="">Password : </label>
                <input type="password" value={password} placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <div>
                <button type='submit'>
                    Login
                </button>
                Have an Account ?  
                <Link to='/register'>Signup</Link>
            </div>
        </form>
    </div>
  )
}

export default Login