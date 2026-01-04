import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate=useNavigate()
  const handleDelete=()=>{
    localStorage.removeItem("auth")
    alert('User Logout Succesfully')
    navigate('/login')

  }
  return (
    <>
        <button onClick={handleDelete}>
            Logout
        </button>
        <div>Home Component</div>

    </>
  )
}

export default Home