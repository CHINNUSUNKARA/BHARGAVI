import React from "react";
import { signInWithGoogle } from "./Firebase";
import "bootstrap/dist/css/bootstrap.min.css";


const SignUpPage = () => {
  const handleGoogleSignUp = async () => {
    const user = await signInWithGoogle();
    if (user) {
      console.log("Signed up as:", user.displayName);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Sign Up</h2>
      <form className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input type="text" className="form-control" id="name" placeholder="Enter full name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>
        <div className="mt-3 text-center">
          <button type="button" className="btn btn-danger w-100" onClick={handleGoogleSignUp}>
            Sign Up with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
