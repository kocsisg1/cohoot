import './login.css';

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthPlayer } from '../services/auth';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const saltResponse = await fetch(
        `https://localhost:44331/api/Login/GetSalt/${username}`,
        { method: "POST" }
      );
      const salt = await saltResponse.text();
      const hashedPw = await sha256(salt + password);

      const loginResponse = await fetch("https://localhost:44331/api/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginName: username, tmpHash: hashedPw }),
      });
      
      if (loginResponse.status === 200) {
        navigate("/home");
        console.log(loginResponse);
        
        AuthPlayer(1, "gatya");
      } else {
        setError("Hibás felhasználónév vagy jelszó");
      }
    } catch (error) {
      setError("Bejelentkezési hiba történt");
    }
  };

  const sha256 = async (message) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  return (
    <div className="mainpagecontent">

    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form onSubmit={handleLogin}>
        <h3>Jelentkezzen be!</h3>
        <label htmlFor="username">Felhasználónév</label>
        <input
          type="text"
          placeholder="Felhasználónév..."
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Jelszó</label>
        <input
          type="password"
          placeholder="Jelszó..."
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>}
        <button type="submit">Bejelentkezés</button>
      </form>
    </div>
    </div>
  );
};

export default Login;