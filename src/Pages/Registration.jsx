import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api'; // your axios instance

export default function Registration() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    supplierName: "",
    gstNumber: "",
    panNumber: ""
  });

  const [address, setAddress] = useState({
    city: "",
    pincode: "",
    street: "",
    houseNo: "",
    state: ""
  });

  // ---------------------
  // Correct input handlers
  // ---------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddress = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // ---------------------
  // Submit Form
  // ---------------------
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/register/supplier", {
        ...form,
        address
      });

      toast.success("Supplier registered successfully!");

      // Navigate to second screen with server result
      navigate("/supplier/congratulations", { state: res.data });

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to register");
    }
  };

  // ---------------------
  // JSX UI
  // ---------------------
  return (
    <form onSubmit={handleCreate} style={{ padding: "20px" }}>

      <h2>Create Supplier</h2>

      {/* User Inputs */}
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
      /><br /><br />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
      /><br /><br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      /><br /><br />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      /><br /><br />

      <input
        type="text"
        name="supplierName"
        placeholder="Supplier Name"
        value={form.supplierName}
        onChange={handleChange}
      /><br /><br />

      <input
        type="text"
        name="gstNumber"
        placeholder="GST Number"
        value={form.gstNumber}
        onChange={handleChange}
      /><br /><br />

      <input
        type="text"
        name="panNumber"
        placeholder="PAN Number"
        value={form.panNumber}
        onChange={handleChange}
      /><br /><br />

      {/* Address Inputs */}
      <h3>Address</h3>

      <input
        type="text"
        name="houseNo"
        placeholder="House No"
        value={address.houseNo}
        onChange={handleAddress}
      /><br /><br />

      <input
        type="text"
        name="street"
        placeholder="Street"
        value={address.street}
        onChange={handleAddress}
      /><br /><br />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={address.city}
        onChange={handleAddress}
      /><br /><br />

      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        value={address.pincode}
        onChange={handleAddress}
      /><br /><br />

      <input
        type="text"
        name="state"
        placeholder="State"
        value={address.state}
        onChange={handleAddress}
      /><br /><br />

      {/* Buttons */}
      <button type="submit">Create Supplier</button>

      <button type="button" onClick={() => navigate("/supplier")} style={{ marginLeft: "10px" }}>
        Back
      </button>

    </form>
  );
}
