// src/components/Profile/Login.jsx
import React from "react";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try { 
      const response = await axios.post("https://snapthecode-1.onrender.com/api/auth/login", {
        email,
        password,
    });

    // Save token to localStorage
      localStorage.setItem("token", response.data.token);
      alert("Login Successful!");

    // Redirect to Home page
     navigate("/");
  } catch (error) {
    alert(error.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4 fw-bold text-warning">🔐 Login</h3>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              ✉️ Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              🔒 Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-warning fw-bold">
              Login
            </button>
          </div>

          {/* Register Redirect */}
          <p className="text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-decoration-none text-primary">
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
