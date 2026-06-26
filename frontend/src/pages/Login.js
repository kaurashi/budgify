import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }
      
      localStorage.clear();
      localStorage.setItem("token", data.token);

      navigate("/dashboard");

    } catch (err) {
      console.log(err.message);
    }
  };

  return (
  <div className="login-page">
    <div className="login-card">

      <div className="login-left">
        <h1>Welcome Back</h1>
        <p>Track expenses smarter with AI insights.</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p className="signup-text">
          Don't have an account?
          <span onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>

      <div className="login-right">
        <div>
          <h2>Budgify</h2>
          <p>Analyze • Track • Save</p>
        </div>
      </div>

    </div>
  </div>
);
}

export default Login;