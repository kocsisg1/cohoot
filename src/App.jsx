import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { Login } from './pages/login';
import { Logout } from './pages/logout';
import { Home } from './pages/home';
import { Register } from './pages/register';
import { Quiz } from './pages/quiz';
import { Leaderboard } from './pages/leaderboard';
import { PrivateRoute } from './services/privateRoute';

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [user2, setUser2] = useState("");

  // A localStorage változását figyeljük
  useEffect(() => {
    const user = localStorage.getItem('felhasz');
    const userData = user ? JSON.parse(user) : null;
    if (userData) {
      setUser2(userData.felhasznaloNev);
    } else {
      setUser2("");
    }
  }, []); // Üres függőségi tömb: csak a komponens mountolásakor fut le

  // A localStorage változását figyeljük globálisan
  useEffect(() => {
    const handleStorageChange = () => {
      const user = localStorage.getItem('felhasz');
      const userData = user ? JSON.parse(user) : null;
      if (userData) {
        setUser2(userData.felhasznaloNev);
      } else {
        setUser2("");
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(true); // Nagyobb képernyőméretek esetén a menü mindig kibontva legyen
      } else {
        setIsMenuOpen(false); // Kis képernyőméretek esetén a menü alapból becsukva legyen
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className="w3-top">
        <div className="w3-bar w3-card w3-left-align w3-large">
          {isMobile && (
            <button className="w3-bar-item w3-button w3-padding-large w3-hover-white" onClick={toggleMenu}>
              &#9776; {/* Hamburger ikon */}
            </button>
          )}
          <div className={`w3-bar-item w3-button w3-padding-large w3-hover-white ${isMobile ? (isMenuOpen ? 'w3-show' : 'w3-hide') : 'w3-show'}`}>
            <NavLink to="/home" className="w3-bar-item w3-button w3-padding-large w3-hover-white">Kezdőlap</NavLink>
            <NavLink to="/quiz" className="w3-bar-item w3-button w3-padding-large w3-hover-white">Quizek</NavLink>
            <NavLink to="/leaderboard" className="w3-bar-item w3-button w3-padding-large w3-hover-white">Toplista</NavLink>
            {!user2 && (
              <NavLink to="/login" className="w3-bar-item w3-button w3-padding-large w3-hover-white">Bejelentkezés</NavLink>
            )}
            {user2 && (
              <NavLink to="/logout" className="w3-bar-item w3-button w3-padding-large w3-hover-white">Kijelentkezés</NavLink>
            )}
            <NavLink to="/register" className="w3-bar-item w3-button w3-padding-large w3-hover-white">Regisztráció</NavLink>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/quiz" element={<PrivateRoute><Quiz /></PrivateRoute>} />
          <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};
