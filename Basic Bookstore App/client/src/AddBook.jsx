import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

const AddBook = () => {
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:3001/addBook', {
      name,
      author,
      imageUrl
    })
    .then(res => {
      if (res.data.message === "Book Add") {
        alert("Book added successfully")
        setName('')
        setAuthor('')
        setImageUrl('')
        navigate('/addBook')
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
      <h3 className="mb-4">Add Book</h3>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

        <div className="mb-3">
          <label className="form-label">Book Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark">
          Add Book
        </button>

      </form>
    </div>
  )
}

export default AddBook
