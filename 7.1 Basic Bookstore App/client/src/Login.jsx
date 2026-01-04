import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({setRoleVar,setAdmin}) => {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [role,setRole]=useState('student')
  const navigate=useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3001/login',{username,password,role})
    .then(res=>{
      console.log(res)
      if(res.data.login && res.data.message==="Login Succesfull" && res.data.role==="admin"){
        alert("Welcome Admin")
        setRoleVar("admin")
        setAdmin(res.data.admin)
        navigate('/dashboard')
      }
      else if(res.data.login && res.data.message==="Login Succesfull" && res.data.role==="student"){
        alert("Welcome Student")
        setRoleVar("student")
        setAdmin(res.data.admin)
        navigate('/books')
      }
      else{
        setAdmin(false)
        alert(res.data.message)
      }
    })

  }
  return (
    <div>
      <h3>Login</h3>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Username</label>
          <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor="">Role</label>
          <select name="" id="" onChange={(e)=>setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
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