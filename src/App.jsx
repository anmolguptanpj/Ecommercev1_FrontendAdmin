import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";

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
import Registration from "./Pages/Registration";
import SupplierRegistered from "./Pages/SupplierRegistered";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // ------------ PRIVATE ROUTE ------------
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" replace />;
  };

  // ------------ LAYOUTS ------------
  const PublicLayout = () => (
    <div id="main">
      <div id="header"><Header /></div>
      <div id="body">
        <div id="sidebar"><Sidebar /></div>
        <div id="outlet"><Outlet /></div>
      </div>
    </div>
  );

  const SecLayout = () => (
    <div id="main">
      <div id="header"><Header /></div>
      <div id="outlet"><Outlet /></div>
    </div>
  );

  return (
    <Router>
      <Routes>

        {/* ---------- LOGIN ---------- */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Login />
          }
        />

        {/* ---------- DASHBOARD (Only Header) ---------- */}
        <Route
          element={
            <PrivateRoute>
              <SecLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* ---------- ALL OTHER PAGES (Header + Sidebar) ---------- */}
        <Route
          element={
            <PrivateRoute>
              <PublicLayout />
            </PrivateRoute>
          }
        >
          <Route path="/staff" element={<Staff />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register/supplier" element={<Registration/>}/>
          <Route path="/supplier/congratulations/" element={<SupplierRegistered/>}/>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
