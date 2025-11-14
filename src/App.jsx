import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './Pages/Login';
import Orders from './Pages/Orders';
import Sales from './Pages/Sales';
import Payments from './Pages/Payments';
import Returns from './Pages/Returns';
import Dashboard from './Pages/Dashboard';
import Suppliers from './Pages/Suppliers';
import Staff from './Pages/Staff';
import Products from './Pages/Products';

function App() {


  const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
  return (
   <Router>
    <Routes>
           <Route path="/" element= {<Login />}/>
            <Route path="/dashboard" element= {<Dashboard />}/>
           <Route path="/staff" element= {<Staff />}/>
            <Route path="/orders" element= {<Orders/>}/>
           <Route path="/products" element= {<Products/>}/>
           <Route path="/customer" element= {<Customer />}/>
            <Route path="payments/" element= {<Payments />}/>
           <Route path="/returns" element= {<Returns/>}/>
            <Route path="/sales" element= {<Sales />}/>
           
            <Route path="/suppliers" element= {<Suppliers />}/>
    </Routes>
   </Router>
  )
}

export default App