import { useNavigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('felhasz');
  const userData = user ? JSON.parse(user) : null;
  const Navigate = useNavigate();
  if (!userData) {
    return <Navigate to="/login" replace />; // Ha nincs bejelentkezve, átirányítás a login oldalra
  }

  return children; // Ha be van jelentkezve, rendereljük a gyerek komponenst
};