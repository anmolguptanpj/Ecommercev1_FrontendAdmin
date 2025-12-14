import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api'; // your axios instance

export default function Registration() {

  const navigate = useNavigate();
  const[message,setMessage] = useState("")

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
      console.log(error)
      toast.error(error.data?.message || "Failed to register");
    }
  };

  // ---------------------
  // JSX UI
  // ---------------------
  return (
<div style={{display:'flex',justifyContent:'center'}}>
      <form className='flex-col flex gap-5' onSubmit={handleCreate} style={{ padding: "20px",}}>

      <h2 className="w-full text-2xl font-bold bg-yellow-500 rounded-2xl text-center">Create Supplier</h2>

      {/* User Inputs */}
  <div className='border-y-2 py-3'>
     <fieldset className='gap-3' style={{display:'flex',justifyContent:'center'}}>
    <legend className=''>Personal Details</legend>
       <lable >First Name :   </lable><br/>
      <input
       className='border-b-2 focus:outline-none '
        type="text"
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
      /><br />
 <lable >Last Name :</lable><br/>
      <input
       className='border-b-2 focus:outline-none '
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
      /><br />
 <lable >Email:</lable><br/>
      <input
       className='border-b-2 focus:outline-none '
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      /><br />
 <lable >Phone:</lable><br/>
      <input
       className='border-b-2 focus:outline-none '
        type="text"
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      /><br />
   </fieldset>
  </div>
<div className='border-y-2 py-3'>
   <fieldset className='gap-3' style={{display:'flex'}}>
  <legend>Business Tax Details</legend>
  <lable >Supplier Name :</lable><br/>
      <input
       className='border-b-2 focus:outline-none '
        type="text"
        name="supplierName"
        placeholder="Supplier Name"
        value={form.supplierName}
        onChange={handleChange}
      /><br />
<lable>GST NUMBER :</lable><br/>
      <input
       className='border-b-2 focus:outline-none '
        type="text"
        name="gstNumber"
        placeholder="GST Number"
        value={form.gstNumber}
        onChange={handleChange}
      /><br />
<lable>PAN NUMBER : </lable><br/>
      <input
       className='border-b-2 focus:outline-none '
        type="text"
        name="panNumber"
        placeholder="PAN Number"
        value={form.panNumber}
        onChange={handleChange}
      /><br />
 </fieldset>
</div>
<div className='border-y-2 py-3'>
    <fieldset  className='flex '>
      <legend>Supplier Business Address</legend>
      <lable>House no : </lable><br/>
      <input
        type="text"
        className='border-b-2 focus:outline-none '
        name="houseNo"
        placeholder="House No"
        value={address.houseNo}
        onChange={handleAddress}
      /><br />
<lable>Street :</lable><br/>
      <input
        type="text"
         className='border-b-2 focus:outline-none '
        name="street"
        placeholder="Street"
        value={address.street}
        onChange={handleAddress}
      /><br />
<lable>City :</lable><br/>
      <input
        type="text"
         className='border-b-2 focus:outline-none '
        name="city"
        placeholder="City"
        value={address.city}
        onChange={handleAddress}
      /><br />
<lable>Pin Code :</lable><br/>
      <input
        type="text"
         className='border-b-2 focus:outline-none '
        name="pincode"
        placeholder="Pincode"
        value={address.pincode}
        onChange={handleAddress}
      /><br />
<lable> State :</lable><br/>
      <input
        type="text"
         className='border-b-2 focus:outline-none '
        name="state"
        placeholder="State"
        value={address.state}
        onChange={handleAddress}
      /><br />
    </fieldset>
</div>

   <div className='flex  gap-3 flex-col items-center justify-center w-full '>
       {/* Buttons */}
      <button className='px-2 bg-green-500 rounded hover:bg-green-800 ' type="submit">Create Supplier</button>

      <button className='px-2  bg-blue-500 rounded hover:bg-blue-800 ' type="button" onClick={() => navigate("/suppliers")} style={{ marginLeft: "10px" }}>
        Back
      </button>

   </div>
    </form>

</div>
  );
}
