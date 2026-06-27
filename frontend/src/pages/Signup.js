import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    const res = await fetch("https://budgify-backend-3rko.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    });

    const data = await res.json();

    if(res.ok){
      localStorage.removeItem("userEmail");
      alert("signup successfully")
      navigate("/login")
    }else{
      alert(data.message);
    }
  };

 return (
  <div className="signup-page">
    <div className="signup-card">

      <div className="signup-left">
        <h1>Create Account</h1>
        <p>Start tracking your expenses smarter.</p>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>
          Sign Up
        </button>

        <p className="login-text">
          Already have an account?
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>

      <div className="signup-right">
        <div>
          <h2>Budgify AI</h2>
          <p>Track • Analyze • Improve</p>
        </div>
      </div>

    </div>
  </div>
);
}

export default Signup;