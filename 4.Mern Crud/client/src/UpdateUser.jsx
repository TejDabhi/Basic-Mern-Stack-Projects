import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateUser = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3001/edit/${id}`)
      .then((res) => {
        const emp = res.data[0]
        setName(emp.name)
        setEmail(emp.email)
        setAge(emp.age)
      })
      .catch((err) => console.log(err))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put(`http://localhost:3001/edit/${id}`, { name, email, age })
      .then(() => {
        alert('Employee Updated Successfully')
        navigate('/home')
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold">Update Employee</h1>

      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input 
              type="text" 
              className="form-control"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input 
              type="number" 
              className="form-control"
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-2">
            Update
          </button>

        </form>
      </div>
    </div>
  )
}

export default UpdateUser
