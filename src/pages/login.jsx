import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import sha256 from 'js-sha256';
import './login.css';
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

      const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const saltResponse = await axios.post(
            `https://localhost:44331/api/Login/GetSalt/${username}`
          );
          const salt = saltResponse.data;
          console.log("Salt: ", salt);
          const hashedPw = sha256(salt+password);
          console.log("HashedPWD:", hashedPw);
          const loginResponse = await axios.post("https://localhost:44331/api/Login", {
            LoginName: username, 
            TmpHash: hashedPw,
          });

      if (loginResponse.status === 200) {
        let userData = loginResponse.data;
        localStorage.setItem("felhasz", JSON.stringify(userData));
      } else {
        setError("Hibás felhasználónév vagy jelszó");
      }
      console.log("localStorage-ban tárolt adatok: ",localStorage.getItem("felhasz"));
      window.dispatchEvent(new Event('storage'));
      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Bejelentkezési hiba történt: " + error);
    }
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