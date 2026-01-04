import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

const Dashboard = () => {
  const [student, setStudent] = useState(0)
  const [admin, setAdmin] = useState(0)
  const [book, setBook] = useState(0)

  useEffect(() => {
    axios.get('http://localhost:3001/dashboard')
      .then(res => {
        setStudent(res.data.student)
        setAdmin(res.data.admin)
        setBook(res.data.book)
      })
      .catch(err => {
        alert(err)
      })
  }, [])

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Dashboard</h3>

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Students</h5>
              <h2 className="fw-bold">{student}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Admins</h5>
              <h2 className="fw-bold">{admin}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Books</h5>
              <h2 className="fw-bold">{book}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
