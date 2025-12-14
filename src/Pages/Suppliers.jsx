import React from 'react'
import api from '../api'
import { Link, useNavigate } from 'react-router-dom'
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
<div className='flex gap-6 flex-col  items-center pt-5 w-full h-full '>
<div className=' cursor-pointer w-full text-center rounded-2xl py-1 m-5 bg-green-600   '><Link className='block mt-5' to={"/register/supplier"} >Register new Supplier</Link></div>
    <div style={{display:'flex',justifyContent:'center'}} className=' '> <h2 className='text-3xl font-bold'>Suppliers</h2></div>
 <div className=' w-full h-full ' style={{display:'flex',justifyContent:'center'}}>
<div className='pt-3'> <table className='' >
    <thead className='w-full border-y-4'>
        <tr>
        <th className='p-2'>Supplier No</th>
        <th className='p-2' >Supplier Name</th>
        <th className='p-2'>Approved By</th>
        <th className='p-2'>Actions </th>
        </tr>
    </thead>
      <tbody>
        {suppliers.map((s)=>(
          <tr className='border-b-2' key={s._id}>
          <td className='p-2'>{s.supplierNo}</td>
          <td className='p-2' >{s.supplierName}</td>
          <td className='p-2'>{`${s.createdBy.firstName} ${s.createdBy.lastName}`}</td>
           <td className='p-2' ><button className='px-1 bg-green-400 border-2 rounded-xl text-shadow-2xs' onClick={()=>navigate(`/suppliers/details/${s._id}`)}>Details</button> </td>
          </tr>
        ))}
   
    </tbody>
   </table></div>
   
  
 </div>
 </div>
  )
}

export default Suppliers