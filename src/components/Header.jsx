import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import './Header.css';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Mylinks = "px-2  hover:bg-green-400  border-3 border-transparent rounded-xl bg-blue-400"

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // redirect to login page
  };

  return (
    <div className='bg-slate-700' id="header_main">
      <div className='text-4xl px-5 flex justify-center items-center font-bold' id="logo"><h1>Codex</h1></div>

      <div id="links">
        <div className=" text-2xl font-bold p-1 " id="dis"><h2>Links</h2></div>

        <div className='' id="nav">
          <Link to="/dashboard" className={Mylinks}>Dashboard</Link>

          <button
            onClick={handleLogout}
            className={`${Mylinks} cursor-pointer`}
          >
            Logout
          </button>

          <Link to="/home" className={Mylinks}>Home</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
