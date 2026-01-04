import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

const AddStudent = () => {
  const [username, setUsername] = useState('')
  const [rollno, setRollno] = useState('')
  const [grade, setGrade] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:3001/addStudent', {
      username,
      rollno,
      grade,
      password
    })
    .then(res => {
      if (res.data.message === "Student Add") {
        alert("Student added successfully")
        setUsername('')
        setRollno('')
        setGrade('')
        setPassword('')
        navigate('/addStudent')
      } else {
        alert(res.data.message)
      }
    })
    .catch(err => {
      console.error(err)
      alert("Server error")
    })
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Add Student</h3>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

        <div className="mb-3">
          <label className="form-label">Student Name</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Rollno</label>
          <input
            type="text"
            className="form-control"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Grade </label>
          <input
            type="text"
            className="form-control"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark">
          Add Student
        </button>

      </form>
    </div>
  )
}

export default AddStudent
