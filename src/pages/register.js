import './register.css';

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:44331/api/Registry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginName: username, email, password }),
      });
      if (response.status === 200) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="mainpagecontent">
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form onSubmit={handleRegister}>
        <h3>Regisztráció</h3>
        <label htmlFor="username">Felhasználónév</label>
        <input 
          type="text" 
          placeholder="Felhasználónév..." 
          id="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email cím</label>
        <input 
          type="email" 
          placeholder="Email cím..." 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Jelszó</label>
        <input 
          type="password" 
          placeholder="Jelszó..." 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Regisztráció</button>

        <h4>Ha már van fiókod</h4>
        <button type="button" onClick={() => navigate("/login")}>
          Bejelentkezés
        </button>
      </form>
    </div>
    </div>
  );
};

export default Register;