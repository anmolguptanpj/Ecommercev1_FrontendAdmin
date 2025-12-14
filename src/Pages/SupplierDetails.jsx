import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api';

function SupplierDetails() {
const navigate = useNavigate();
const {_id} = useParams()
const getSupplierDetails = async()=>{
    const res = await api.get(`/admin/suppliers/${_id}`)

    return res.data
}
  const heading = "py-2"
  const subheading ="text-center font-bold border-y-2 "
    
const{data,isLoading,isError} = useQuery({
    queryKey:["supplier",_id],
    queryFn:getSupplierDetails,
    enabled:!!_id
})

if(isLoading)
    return<p>Loading Details</p>
if(isError)
    return<p>Failed to fetch Supplier details</p>
const supplier = data?.data

console.log(supplier)




function DocumentPreview({ title, url }) {
  // Convert to usable URL string
  const fileUrl = typeof url === "string" ? url : url?.url || "";

  const isImage =
    fileUrl &&
    (fileUrl.endsWith(".png") ||
      fileUrl.endsWith(".jpg") ||
      fileUrl.endsWith(".jpeg") ||
      fileUrl.endsWith(".webp"));

  const isPdf = fileUrl && fileUrl.endsWith(".pdf");

  return (
    <div
      style={{
        width: "200px",
        height: "250px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        textAlign: "center",
        padding: "10px",
        background: "#fafafa",
      }}
    >
      <h4>{title}</h4>

      {!fileUrl && <p style={{ color: "gray", fontSize: "14px" }}>No document uploaded</p>}

      {isImage && (
        <img
          src={fileUrl}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      )}

      {isPdf && (
        <iframe src={fileUrl} style={{ width: "100%", height: "100%" }} />
      )}
    </div>
  );
}


  return (
  <div className='  w-full h-full  ' style={{display:'flex',justifyContent:'center'}} >
  <div>
    
       <div className='w-full text-center border-y-4 pb-6 pt-4'> <h1 className='text-3xl font-bold w-full'>Supplier Details</h1> </div>
<div className={heading}>
  
    <p>Name:{supplier?.supplierName}</p>
    <p>Supplier No: {supplier?.supplierNo}</p>
</div>
    

 <div className={heading}>
   <div className={subheading}>  <h3>Contact Person</h3></div>
    <p>Name: {supplier?.user?.firstName} {supplier?.user?.lastName}</p>
    <p>Email: {supplier?.user?.email}</p>
    <p>Phone: {supplier?.user?.phone}</p>
 </div>
  <div className={heading}>
     <div  className={subheading} > <h3>Documents</h3></div>
    <p>GST Number: {supplier?.gstNumber}</p>
    <p>PAN Number: {supplier?.panNumber}</p>
  </div>

  <div  style={{ display: "flex", gap: "20px" }}>

  <DocumentPreview 
    title="GST Document" 
    url={supplier?.gstDocument} 
  />

  <DocumentPreview 
    title="PAN Document" 
    url={supplier?.panDocument} 
  />

</div>

   <div className={`${heading} m-5`} >
    <div  className={subheading} > <h3>Address</h3></div>
    <p>{supplier?.address?.houseNo}, {supplier?.address?.street}</p>
    <p>{supplier?.address?.city}, {supplier?.address?.state}</p>
    <p>Pincode: {supplier?.address?.pincode}</p>
   </div>

  <div className='flex border-t-4 m-5 gap-5 justify-center items-center'>
      <button  className="bg-blue-500 w-30 p-1 m-5  hover:bg-green-500 rounded-xl" onClick={() => navigate(`/suppliers/edit/${_id}`)}>
      Edit Supplier
    </button>
     <button  className="bg-blue-500 p-1 m-5 w-30  hover:bg-green-500 rounded-xl" onClick={() => navigate(`/suppliers`)}>
      Back
    </button>
  </div>
  </div>
  </div>
);
}
export default SupplierDetails