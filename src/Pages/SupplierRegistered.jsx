import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SupplierRegistered() {

  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No data received.</p>;

  const { user, supplier } = state.data;

  // --------------------------
  // PRINT HANDLER
  // --------------------------
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}>

      <h1 style={{ marginBottom: "20px" }}>🎉 Supplier Registered Successfully!</h1>

      {/* PRINT BUTTON */}
      <button 
        onClick={handlePrint}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        🖨️ Print 
      </button>

      {/* USER DETAILS TABLE */}
      <h2>User Details</h2>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", marginBottom: "20px" }}>
        <tbody>
          <tr><th>First Name</th><td>{user.firstName}</td></tr>
          <tr><th>Last Name</th><td>{user.lastName}</td></tr>
          <tr><th>Email</th><td>{user.email}</td></tr>
          <tr><th>Phone</th><td>{user.phone}</td></tr>
          <tr><th>Role</th><td>{user.role}</td></tr>
        </tbody>
      </table>

      {/* SUPPLIER DETAILS TABLE */}
      <h2>Supplier Details</h2>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", marginBottom: "20px" }}>
        <tbody>
          <tr><th>Supplier Name</th><td>{supplier.supplierName}</td></tr>
          <tr><th>Supplier No</th><td>{supplier.supplierNo}</td></tr>
          <tr><th>GST Number</th><td>{supplier.gstNumber}</td></tr>
          <tr><th>PAN Number</th><td>{supplier.panNumber}</td></tr>
        </tbody>
      </table>

      {/* ADDRESS TABLE */}
      <h2>Address</h2>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", marginBottom: "20px" }}>
        <tbody>
          <tr><th>House No</th><td>{supplier.address.houseNo}</td></tr>
          <tr><th>Street</th><td>{supplier.address.street}</td></tr>
          <tr><th>City</th><td>{supplier.address.city}</td></tr>
          <tr><th>Pincode</th><td>{supplier.address.pincode}</td></tr>
          <tr><th>State</th><td>{supplier.address.state}</td></tr>
        </tbody>
      </table>

      {/* BACK BUTTON */}
      <button 
        onClick={() => navigate('/suppliers')}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#008CBA",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        ⬅ Back to Supplier List
      </button>

    </div>
  );
}
