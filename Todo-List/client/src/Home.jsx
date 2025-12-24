import React from 'react'
import Create from './Create'
import { useState, useEffect } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"

const Home = () => {
  const [todos, setTodos] = useState([])
  const handleDelete=(id)=>{
    axios.delete(`http://localhost:3001/delete/${id}`).
    then((res)=>{
        console.log(res)
        alert('Task deleted Sucessfully')
        setTodos(todos.filter(emp=>emp._id!==id))
    })
  }

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then((res) => {
        console.log(res.data)
        setTodos(res.data)
      })
  }, [])

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Todo List</h1>

      <div className="mb-3">
        <Create />
      </div>

      {todos.length === 0 ? (
        <div className="alert alert-warning text-center">
          No Record
        </div>
      ) : (
        <div className="list-group">
          {todos.map(todo => (
            <div
              key={todo._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{todo.task}</span>

              <span
                className="bi bi-trash text-danger"
                style={{ cursor: "pointer" }}
                onClick={()=>handleDelete(todo._id)}
              ></span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
