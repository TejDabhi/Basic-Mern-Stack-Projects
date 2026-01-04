import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({setRoleVar}) => {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [role,setRole]=useState('admin')
  const navigate=useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3001/login',{username,password,role})
    .then((res)=>{
        if(res.data.login && res.data.role==="admin"){
            setRoleVar('admin')
            navigate('/dashboard')
            alert('Welcome Admin ')
        }
        else if(res.data.login && res.data.role==="student"){
            setRoleVar('student')
            navigate('/dashboard')
        }   
        else{
            alert(res.data.message)
        }
    })

  }
  return (
    <div>
        <h3>Login</h3>
        <form action="" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">Username  </label>
                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="">password  </label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="">Role  </label>
                <select name="role" id="" onChange={(e)=>setRole(e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                </select>
            </div>
            <div>
                <button type='submit'>
                    Login
                </button>
            </div>
        </form>
    </div>
  )
}

export default Login