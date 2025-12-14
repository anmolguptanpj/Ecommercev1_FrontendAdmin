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

import { Toaster } from "react-hot-toast";  // ← ADD THIS

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
import SupplierDetails from "./Pages/SupplierDetails";
import SupplierEdits from "./Pages/SupplierEdits";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const PrivateRoute = ({ children }) =>
    isAuthenticated ? children : <Navigate to="/" replace />;

  const PublicLayout = () => (
    <div id="main">
      <div id="header"><Header /></div>
      <div id="body">
        <div className="bg-yellow-400 shadow-2xl" id="sidebar"><Sidebar /></div>
        <div className="bg-blue-950" id="outlet"><Outlet /></div>
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
    <>
      <Toaster position="top-right" />   {/* ← GLOBAL TOAST COMPONENT */}

      <Router>
        <Routes>

          {/* LOGIN */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <Login />
            }
          />

          {/* DASHBOARD */}
          <Route
            element={
              <PrivateRoute>
                <SecLayout />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* MAIN PAGES */}
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
            <Route path="/register/supplier" element={<Registration />} />
            <Route path="/supplier/congratulations/" element={<SupplierRegistered />} />
            <Route path="/suppliers/details/:_id" element={<SupplierDetails />} />
            <Route path="/suppliers/edit/:_id" element={<SupplierEdits />} />
          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
