import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  FaBell,
  FaUserCircle,
  FaMoon,
  FaSun,
  FaSignOutAlt
} from 'react-icons/fa';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="top-navbar">
      <h4>Admin Dashboard</h4>

      <div className="navbar-right">
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>

        <FaBell />

        <FaUserCircle size={25} />

        <span>{user?.name || 'Admin'}</span>

        <button className="btn btn-danger btn-sm" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;