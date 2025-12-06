import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CreateUser = () => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [age,setAge]=useState("")
  const navigate=useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3001/create',{name,email,age})
    .then((res)=>{
        console.log(res)
        alert('Employee Add Succesfully ')
        navigate('/home')
    })
    .catch((err)=>{console.log(err)})
  }

  return (
    <div>
        <h1> Add Employee </h1>
        <form action="" onSubmit={handleSubmit} >
            <div>
                <label htmlFor="">Name</label>
                <input type="text" placeholder='Employee Name' value={name} onChange={(e)=>setName(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="">Email</label>
                <input type="email" placeholder='Employee Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="">Age</label>
                <input type="number" placeholder='Employee Age' value={age} onChange={(e)=>setAge(e.target.value)}
                required/>
            </div>
            <button type='submit'>
                Add
            </button>
        </form>
    </div>
  )
}

export default CreateUser