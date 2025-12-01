import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const email = location.state?.email;   // get email from login

  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:3001/home/${email}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [email]);

  return (
    <div style={{ fontSize: "24px", fontWeight: "bold" }}>
      {user ? `Welcome, ${user.name}` : "Loading..."}
    </div>
  );
};

export default Home;
