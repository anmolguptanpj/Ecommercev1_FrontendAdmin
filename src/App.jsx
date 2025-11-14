import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import './App.css'

import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

// Pages
import Login from "./Pages/Login";
import Orders from "./Pages/Orders";
import Sales from "./Pages/Sales";
import Payments from "./Pages/Payments";
import Returns from "./Pages/Returns";
import Dashboard from "./Pages/Dashboard";
import Suppliers from "./Pages/Suppliers";
import Staff from "./Pages/Staff";
import Products from "./Pages/Products";
import Customer from "./Pages/Customer";

function App() {
  /* ---------------------- PUBLIC LAYOUT ---------------------- */
  const PublicLayout = () => {
    return (
      <div id="main">
        <div id="header"><Header /></div>
        <div id = "body">
          <div id="sidebar"><Sidebar /></div>
          <div id="outlet"><Outlet /></div>
        </div>
      </div>
     
    )
  };




  const secLayout = () => {
    return (
      <div id="main">
        <div id="header"><Header /></div>
        <div id="outlet"><Outlet /></div>
        </div>
    
     
    )
  };

  return (
    <Router>
      <Routes>
        {/* ❌ No layout for Login */}
        <Route path="/" element={<Login />} />

        {/* ❌ No layout for Dashboard */}
             <Route path="/dashboard" element={<Dashboard />} />

        {/* ✅ Layout applies to all these routes */}
        <Route element={<PublicLayout />}>
         
          <Route path="/staff" element={<Staff />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/suppliers" element={<Suppliers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
