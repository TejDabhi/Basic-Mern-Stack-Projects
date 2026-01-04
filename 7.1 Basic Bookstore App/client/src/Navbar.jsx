import React from 'react'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

const Navbar = ({ role }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

      {/* Logo */}
      <Link className="navbar-brand fw-bold" to="/">
        📘 Bookstore
      </Link>

      {/* Right side */}
      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav gap-3">

          {/* Common */}
          

          {/* Not Logged In */}
          {(!role ) && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/books">Books</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </>
          )}
          {(role==="student" ) && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/books">Books</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li>
            </>
          )}

          {/* Admin */}
          {role === 'admin' && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/books">Books</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addBook">Add Book</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/addStudent">Add Student</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  )
}

export default Navbar
