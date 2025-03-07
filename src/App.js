import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './pages/login';
import Home from './pages/home';
import Register from './pages/register';
import Quiz from './pages/quiz';
import Leaderboard from './pages/leaderboard';
import Logout from './pages/logout';
import { PrivateRoute } from './services/privateRoute';
import { CheckAuthStatus } from './services/auth';
import React, { useEffect, useState } from 'react';
import Themes from './pages/quiz2';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(CheckAuthStatus());

  const updateAuthStatus = () => {
    setIsAuthenticated(CheckAuthStatus());
  };

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(CheckAuthStatus());
    };
    window.addEventListener('storage', handleAuthChange);
    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
      <title>Cohoot</title>
      <div className="w3-top">
        <div className="w3-bar w3-card w3-left-align w3-large">
          <a href="./home" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Kezdőlap</a>
          <a href="./quiz" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Quizek</a>
          <a href="./leaderboard" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Toplista</a>
          {isAuthenticated && (
            <a href="./logout" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Kijelentkezés</a>
          )}
        </div>
        <Routes>
        <Route path="/login" element={<Login onAuthChange={updateAuthStatus} />} />
          <Route path="/register" element={<Register onAuthChange={updateAuthStatus} />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/quiz" element={<PrivateRoute><Themes /></PrivateRoute>} />
          <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
          <Route path="/logout" element={<PrivateRoute><Logout onAuthChange={updateAuthStatus} /></PrivateRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
