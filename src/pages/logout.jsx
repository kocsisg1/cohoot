import React from 'react';
import { useNavigate } from "react-router-dom";

export const Logout =() => {
    const Navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('felhasz');
        window.dispatchEvent(new Event('storage'));
        Navigate("/login");
    };

    return (
        <button onClick={handleLogout}>Kijelentkezés</button>
    );
}