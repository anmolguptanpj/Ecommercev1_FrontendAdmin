import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../api";

function EditSupplier() {
  const navigate = useNavigate();
  const { _id } = useParams();
    const heading = ""
  const subheading =""

  // Fetch Supplier Data
  const fetchSupplier = async () => {
    const res = await api.get(`/admin/suppliers/${_id}`);
    return res.data.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["supplier", _id],
    queryFn: fetchSupplier,
    enabled: !!_id,
  });


  // Local state with proper default values
  const [form, setForm] = useState({
    supplierName: "",
    gstNumber: "",
    panNumber: "",
    address: { houseNo: "", street: "", city: "", state: "", pincode: "" },
    gstDocument: "",
    panDocument: ""
  });

  const [gstFile, setGstFile] = useState(null);
  const [panFile, setPanFile] = useState(null);

  // 🔥 Prefill form when data loads - Fixed to handle all values properly
  useEffect(() => {
    if (data) {
      setForm({
        supplierName: data.supplierName || "",
        gstNumber: data.gstNumber || "",
        panNumber: data.panNumber || "",
        address: {
          houseNo: data.address?.houseNo || "",
          street: data.address?.street || "",
          city: data.address?.city || "",
          state: data.address?.state || "",
          pincode: data.address?.pincode || ""
        },
        gstDocument: data.gstDocument || "",
        panDocument: data.panDocument || ""
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit Update with FormData
  const updateSupplier = async () => {
    const fd = new FormData();
    console.log("ram")
    // normal fields
    Object.keys(form).forEach((key) => {
      if (key === "address") {
        Object.keys(form.address).forEach((a) =>
          fd.append(`address[${a}]`, form.address[a])
        );
      } else if (key !== "gstDocument" && key !== "panDocument") {
        // Don't append document URLs, only the new files
        fd.append(key, form[key]);
      }
    });

    // files
    if (gstFile) fd.append("gstDocument", gstFile);
    if (panFile) fd.append("panDocument", panFile);
    console.log()
    return api.put(`/admin/suppliers/${_id}`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateSupplier,
    onSuccess: () => {
      navigate(`/suppliers/details/${_id}`);
    },
  });

  if (isLoading) return <p>Loading supplier...</p>;
  if (isError) return <p>Error loading supplier.</p>;

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <div style={{ width: "500px" }}>
        <h1 className="text-4xl text-center font-bold border-y-4 py-3" >Edit Supplier</h1>

       <div className="p-2 border-b-4">
         <h3 className="border-y-2 text-center">Basic Information</h3>
       <div className="flex gap-2">
          <label>Name:</label>
        <input
        className="border-b-2 focus:outline-none"
          type="text"
          name="supplierName"
          value={form.supplierName}
          onChange={handleChange}
          placeholder="Supplier Name"
        />
       </div>

       <div className="py-2">
         <h3 className="border-y-2 text-center" >Documents</h3>

        <div className="flex gap-2 " >
          <label>GST Number:</label>
        <input
         className="border-b-2 focus:outline-none"
          type="text"
          name="gstNumber"
          value={form.gstNumber}
          onChange={handleChange}
        />

        <label>Upload GST Document:</label>
        <input
           className="border-b-2 focus:outline-none"
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setGstFile(e.target.files[0])}
            style={{ width: "100%", marginBottom: "10px" }}
        />
        </div>
       </div>

        {form.gstDocument && (
          <div style={{ marginBottom: "10px" }}>
            <a href={form.gstDocument} target="_blank" rel="noreferrer">
              View Existing GST Document
            </a>
          </div>
        )}

      <div className="flex gap-2  ">
          <label>PAN Number:</label>
        <input
        
         className="border-b-2 focus:outline-none"
          type="text"
          name="panNumber"
          value={form.panNumber}
          onChange={handleChange}
        />

        <label>Upload PAN Document:</label>
        <input
           className="border-b-2 focus:outline-none"
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setPanFile(e.target.files[0])}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </div>

        {form.panDocument && (
          <div style={{ marginBottom: "10px" }}>
            <a href={form.panDocument} target="_blank" rel="noreferrer">
              View Existing PAN Document
            </a>
          </div>
        )}

     <div>
         <h3 className="border-y-2 text-center">Address</h3>
    <div className="flex flex-col">
         <div className="flex gap-3">
          <label>HouseNo:</label>
           <input
          type="text"
          className="border-b-2 focus:outline-none "
          placeholder="House No"
          name="address.houseNo"
          value={form.address.houseNo}
          onChange={handleChange}
          
        /></div>
      <div className="flex gap-2">
        <label>Street:</label>
          <input
          type="text"
             className="border-b-2 focus:outline-none"
          placeholder="Street"
          name="address.street"
          value={form.address.street}
          onChange={handleChange}
        
        />
      </div>
   <div className="flex gap-2">
       <label>State:</label>
        <input
          type="text"
             className="border-b-2 focus:outline-none"
          placeholder="State"
          name="address.state"
          value={form.address.state}
          onChange={handleChange}
         
        />
   </div>
  <div className="flex gap-2">
     <label>
    PIN CODE:
   </label>
        <input
          type="text"
             className="border-b-2 focus:outline-none"
          placeholder="Pincode"
          name="address.pincode"
          value={form.address.pincode}
          onChange={handleChange}
        />
    </div>
  </div>
     </div>
       </div>

      <div className=" pt-2 flex justify-evenly">
          <button 
          className="bg-green-500 w-20 px-2 rounded-2xl"
          onClick={() => mutate()} 
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save"}
        </button>

        <button
        className="bg-gray-400 px-2 rounded-2xl"
          onClick={() => navigate(`/suppliers/details/${_id}`)}
        >
          Cancel
        </button>
      </div>
      </div>
    </div>
  );
}

export default EditSupplier;