import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import './Header.css';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // redirect to login page
  };

  return (
    <div id="header_main">
      <div id="logo"><h1>Codex</h1></div>

      <div id="links">
        <div id="dis"><h2>Links</h2></div>

        <div id="nav">
          <Link to="/dashboard" className='Mylinks'>Dashboard</Link>

          <button
            onClick={handleLogout}
            className='Mylinks'
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              color: "inherit"
            }}
          >
            Logout
          </button>

          <Link to="/home" className='Mylinks'>Home</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
