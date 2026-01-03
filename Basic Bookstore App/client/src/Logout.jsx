import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = ({setRole,setAdmin}) => {
  const navigate=useNavigate()
  useEffect(()=>{
    axios.get("http://localhost:3001/logout")
    .then(res=>{
      if(res.data.logout){
        setRole('')
        setAdmin(false)
        navigate('/login')
      }
    })
    .catch(err => {
      console.error('Logout failed', err)
    })
  },[])
  return(
    <div>
      Logout
    </div>
  )
}

export default Logout