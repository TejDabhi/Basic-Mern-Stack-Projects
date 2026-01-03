import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

const EditBook = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:3001/editBook/${id}`)
      .then(res => {
        setName(res.data.name)
        setAuthor(res.data.author)
        setImageUrl(res.data.imageUrl)
      })
      .catch(err => console.log(err))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.put(`http://localhost:3001/updateBook/${id}`, {
      name,
      author,
      imageUrl
    })
    .then(() => {
      alert("Book Updated Successfully")
      navigate('/addBook')
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Edit Book</h3>

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
          Update Book
        </button>
      </form>
    </div>
  )
}

export default EditBook
