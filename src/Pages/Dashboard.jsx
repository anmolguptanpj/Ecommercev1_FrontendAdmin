import React from 'react'
import { Link } from 'react-router-dom'
import Orders from "./Orders.jsx";

function Dashboard() {
  return (
    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',height:'80vh'}}>
      <Link to="/orders">Orders</Link>
    </div>
    
  )
}

export default Dashboard