import React from 'react'
import { Link } from 'react-router-dom'
import Orders from "./Orders.jsx";

function Dashboard() {
  return (
    <div>
      <Link to="/orders">Orders</Link>
    </div>
    
  )
}

export default Dashboard