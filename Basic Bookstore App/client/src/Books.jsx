import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from 'react-router-dom'

const Books = ({admin}) => {
  const [books, setBooks] = useState([])
  const navigate=useNavigate()
  useEffect(() => {
    axios.get("http://localhost:3001/getBooks")
      .then(res => {
        setBooks(res.data) 
      })
      .catch(err => {
        console.error(err)
        alert("Failed to load books")
      })
  }, [])
  const handleDelete=(id)=>{
    axios.delete(`http://localhost:3001/deleteBooks/${id}`)
    .then(res=>{
      setBooks(books.filter(book => book._id !== id))
      alert('Book Deleted Successfully ')
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {books.map(book => (
          <div className="col-md-4 mb-4" key={book._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={book.imageUrl}
                className="card-img-top"
                alt={book.name}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{book.name}</h5>
                <p className="card-text">Author: {book.author}</p>
                {admin && (
                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => navigate(`/editBook/${book._id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(book._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Books
