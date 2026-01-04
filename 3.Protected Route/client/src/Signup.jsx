import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const Signup = () => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate()
  const authtoken=JSON.parse(
      localStorage.getItem('auth')
    )
    useEffect(()=>{
      if (authtoken){
          navigate('/home')
      }
    },[])
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3001/register',{name,email,password})
    .then((res)=>{
        console.log(res)
        alert("User Register Successfully")
        navigate('/login')
    })
  }
  return (
    <div>
        <h1>Registration</h1>
        <form action="" onClick={handleSubmit} >
            <div>
                <label htmlFor="">Name</label>
                <input type="text" placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="">Email</label>
                <input type="email" placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input type="password" placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <button type='submit'>
                Register
            </button>
            <div>
                Already have an account?
                <Link to='/login'>Login</Link>
            </div>
        </form>
    </div>
  )
}

export default Signup