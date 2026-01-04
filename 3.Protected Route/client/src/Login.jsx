import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const authtoken=JSON.parse(
    localStorage.getItem('auth')
  )
  useEffect(()=>{
    if (authtoken){
        navigate('/home')
    }
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:3001/login', { email, password })
      .then((res) => {
        console.log(res)
        localStorage.setItem('auth',JSON.stringify({email,password}))
        alert("User Login Successfully")
        navigate('/home')
      })
      .catch((err) => {
        console.log(err)
        alert("Invalid email or password")
      })
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter your email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div>
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter your password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>

        <div>
          Don't have an account? 
          <Link to="/register"> Register</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
