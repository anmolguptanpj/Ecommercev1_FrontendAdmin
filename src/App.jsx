import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import Sidebar from "./components/Sidebar";
import { getCurrentUser } from "./store/authSlice";

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

import "./App.css";

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-black">
      Loading...
    </div>
  );
}

function PublicLayout() {
  return (
    <div id="main" className="flex min-h-screen bg-white text-black">
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-y-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
}

function ProtectedLayout() {
  const { isAuthenticated, authChecking } = useSelector((state) => state.auth);

  if (authChecking) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <PublicLayout />;
}

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <Login />
            }
          />

          <Route element={<ProtectedLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/register/supplier" element={<Registration />} />
            <Route
              path="/supplier/congratulations/"
              element={<SupplierRegistered />}
            />
            <Route path="/suppliers/details/:_id" element={<SupplierDetails />} />
            <Route path="/suppliers/edit/:_id" element={<SupplierEdits />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
