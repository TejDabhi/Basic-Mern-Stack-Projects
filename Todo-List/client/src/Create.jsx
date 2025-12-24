import axios from 'axios'
import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

const Create = () => {
  const [task, setTask] = useState("")

  const handleAdd = (e) => {
    e.preventDefault()

    axios.post('http://localhost:3001/add', { task })
      .then((res) => {
        alert("Task added successfully")
        setTask("") // clear input
        window.location.reload()

      })
      .catch(err => console.log(err))
  }

  return (
    <div className="container mt-3">
      <form onSubmit={handleAdd}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default Create
