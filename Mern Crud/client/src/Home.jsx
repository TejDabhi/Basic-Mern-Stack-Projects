import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState([]);

  const location = useLocation();
  const email = location.state?.email;

  // Fetch employee list
  useEffect(() => {
    axios
      .get("http://localhost:3001/create")
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then((res) => {
        console.log(res);
        // Refresh list after delete
        setEmployee((prev) => prev.filter((emp) => emp._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4" style={{ fontSize: "20px" }}>
      <h2>Crud Operations</h2>

      <div className="d-flex justify-content-start mb-3">
        <Link className="btn btn-primary" to="/create">
          Add Employee +
        </Link>
      </div>

      <table className="table table-bordered table-striped text-center">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employee.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.age}</td>
              <td>
                <Link
                  to={`/edit/${emp._id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(emp._id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
