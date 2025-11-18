import React from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

function Suppliers() {
  const navigate = useNavigate()

  const registerNew =() => navigate("/register/supplier")


  const getSuppliers = async ()=>{
    const res = await api.get("/admin/suppliers");
   
    return res.data;
  };


  const{data, isLoading, isError} = useQuery({
    queryKey:["suppliers"],
    queryFn:getSuppliers
  })

  if(isLoading)
   return<p>loading suppliers..</p>
   if(isError)
    return <p>Failed to fetch Suppliers </p>
  const suppliers = data?.data || []
  
  return (
<>
<div><span onClick={()=>registerNew()}>Register new Supplier</span></div>
    <div style={{display:'flex',justifyContent:'center'}}> <h2>Suppliers</h2></div>
 <div style={{display:'flex',justifyContent:'center'}}>

   
   <table border={2} cellPadding={0} cellSpacing={5}  >
    <thead>
        <tr>
        <td>Supplier No</td>
        <td>Supplier Name</td>
        <td>Approved By</td>
        <td>Actions </td>
        </tr>
    </thead>
      <tbody>
        {suppliers.map((s)=>(
          <tr key={s._id}>
          <td>{s.supplierNo}</td>
          <td>{s.supplierName}</td>
          <td>{`${s.createdBy.firstName} ${s.createdBy.lastName}`}</td>
           <td><span onClick={5}>Details</span> </td>
          </tr>
        ))}
   
    </tbody>
   </table>
 </div>
 </>
  )
}

export default Suppliers