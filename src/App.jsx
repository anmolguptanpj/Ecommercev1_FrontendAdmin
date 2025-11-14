import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import './App.css'

import Header from "./components/Header";
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
import Home from "./Pages/Home";

function App() {

  const PublicLayout = () => {
    return (
      <div id="main">
        <div id="header"><Header /></div>
        <div id="body">
          <div id="sidebar"><Sidebar /></div>
          <div id="outlet"><Outlet /></div>
        </div>
      </div>
    );
  };

  const SecLayout = () => {
    return (
      <div id="main">
        <div id="header"><Header /></div>
        <div id="outlet"><Outlet /></div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        {/* Dashboard → Header only */}
        <Route element={<SecLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* All others → Full layout */}
        <Route element={<PublicLayout />}>
          <Route path="/staff" element={<Staff />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/home" element={<Home />} />
        </Route>

      </Routes>
    </Router>
  );
}


export default App;
