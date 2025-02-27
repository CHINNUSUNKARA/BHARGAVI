import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { signInWithGoogle } from "./Firebase"; // Ensure this is correctly imported
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Default credentials
  const defaultCredentials = {
    email: "admin@example.com",
    password: "admin123",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate credentials
    if (email === defaultCredentials.email && password === defaultCredentials.password) {
      console.log("Login successful with default credentials");
      alert("Login successful!");
      navigate("/HomePage"); // Navigate to the Home page
    } else {
      setError("Invalid email or password");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        console.log("Logged in as:", user.displayName);
        alert(`Welcome, ${user.displayName}!`);
        navigate("/home"); // Navigate to the Home page
      }
    } catch (err) {
      console.error("Google Sign-In error:", err);
      setError("Google Sign-In failed. Please try again.");
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form className="mt-4" onSubmit={handleLogin}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
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
        <div className="mt-3 text-center">
          <button type="button" className="btn btn-danger w-100" onClick={handleGoogleSignIn}>
            Sign In with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
