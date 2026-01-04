import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:3001/register",{name,email,password})
        .then((res)=>{
            alert('User Signup Sucessfully')
            navigate('/login')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
    <div>
        <h1>Registration </h1>
        <form action="" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">Name : </label>
                <input type="text" value={name} placeholder='Enter UserName' onChange={(e)=>setName(e.target.value)} required/>
            </div>
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
                    Signup
                </button>
                Already Have an Account ?  
                <Link to='/login'>Login</Link>
            </div>
        </form>
    </div>
  )
}

export default Signup