import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate


  const handleLogin = (e) => {
    e.preventDefault();

    // Validate credentials
    if (email === 'Bhargavi@7007' && password === 'BhargaviSunkara') {
      console.log("Login successful as User!");
      navigate("/HomePage"); // Navigate to the Home page
    } else if (email === 'Posiyya@7007' && password === 'PosiyyaSunkara') {
      console.log("Login successful as Admin!");
      navigate("/AdminPage");
    }
  };


  return (
    <div className="container mt-5 w-50 p-3 border border-primary rounded shadow p-3 mb-5 bg-white rounded ">
      <h2 className="text-center mb-4 ">Login Page</h2>
      <form className="mt-4" onSubmit={handleLogin}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3 ">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
