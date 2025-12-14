import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const Mylinks = " inline-flex items-center px-2 mx-5 hover:bg-green-400  border-3 border-transparent rounded-xl bg-blue-400"

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // redirect to login page
  };

  return (
    <div className='bg-slate-950 h-20 flex justify-center items-center  w-full' id="header_main">
      <div className='text-5xl w-[25%] px-5 flex justify-center items-center font-bold' id="logo"><h1>Codex</h1></div>

      <div className='flex-1  items-center g' id="links">
  

        <div className='flex w-[70%] justify-evenly ' id="nav">
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
