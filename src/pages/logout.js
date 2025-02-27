import './home.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../services/auth';

export default function Logoutfunc ({ onAuthChange }) {
    const navigate = useNavigate();

    useEffect(() => {
        Logout();
        localStorage.removeItem('felhasz'); // Kijelentkezés után töröljük
        onAuthChange(); // Frissítjük az állapotot
        navigate('/login');
    }, [navigate, onAuthChange]);

    return null;
}