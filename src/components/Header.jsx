import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <div id="header_main">
      <div id="logo"><h1>Codex</h1></div>
      <div id="links">
       <div id ="dis"> <h2>Links</h2></div>
        <div id="nav">
          <Link to="/dashboard" className='Mylinks'>Dashboard</Link>
          <Link to="/" className='Mylinks'>Logout</Link>
          <Link to="/home" className='MyLinks'>Home</Link>
        </div>
      </div>
    </div>
  )
}

export default Header