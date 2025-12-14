import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {

  const Mylinks=" bg-gray-600  w-[75%] rounded-xl text-center hover:bg-green-700"
  return (
    <div className=' flex flex-col gap-5 items-center'>
      <div className=' w-full text-center text-4xl' id="menu">
         <h3>Menu</h3>
      </div>
      <div className=' w-full items-center flex flex-col text-xl gap-10 ' id="Links" >
        <Link className={Mylinks} to='/orders'>Orders</Link>
        <Link  className={Mylinks} to='/payments'>Payments</Link>
        <Link  className={Mylinks} to='/customer'>Customers</Link>
        <Link  className={Mylinks}  to='/suppliers'>Suppliers</Link>
        <Link  className={Mylinks}  to='/returns'>Returns</Link>
        <Link  className={Mylinks}  to='/sales'>Sales</Link>
        <Link  className={Mylinks} to='/staff'>Staff</Link>
        <Link  className={Mylinks} to='/products'>Products</Link>
        
        

        



      </div>
    </div>
    
  )
}

export default Sidebar