import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../api";

function EditSupplier() {
  const navigate = useNavigate();
  const { _id } = useParams();

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
    <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
      <div style={{ width: "500px" }}>
        <h1>Edit Supplier</h1>

        <h3>Basic Information</h3>
        <input
          type="text"
          name="supplierName"
          value={form.supplierName}
          onChange={handleChange}
          placeholder="Supplier Name"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <h3>Documents</h3>

        <label>GST Number:</label>
        <input
          type="text"
          name="gstNumber"
          value={form.gstNumber}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <label>Upload GST Document:</label>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setGstFile(e.target.files[0])}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        {form.gstDocument && (
          <div style={{ marginBottom: "10px" }}>
            <a href={form.gstDocument} target="_blank" rel="noreferrer">
              View Existing GST Document
            </a>
          </div>
        )}

        <label>PAN Number:</label>
        <input
          type="text"
          name="panNumber"
          value={form.panNumber}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <label>Upload PAN Document:</label>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setPanFile(e.target.files[0])}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        {form.panDocument && (
          <div style={{ marginBottom: "10px" }}>
            <a href={form.panDocument} target="_blank" rel="noreferrer">
              View Existing PAN Document
            </a>
          </div>
        )}

        <h3>Address</h3>
        <input
          type="text"
          placeholder="House No"
          name="address.houseNo"
          value={form.address.houseNo}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Street"
          name="address.street"
          value={form.address.street}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="City"
          name="address.city"
          value={form.address.city}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="State"
          name="address.state"
          value={form.address.state}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Pincode"
          name="address.pincode"
          value={form.address.pincode}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <br />

        <button 
          onClick={() => mutate()} 
          disabled={isPending}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          {isPending ? "Saving..." : "Save"}
        </button>

        <button
          onClick={() => navigate(`/suppliers/details/${_id}`)}
          style={{ marginLeft: "10px", padding: "10px 20px", cursor: "pointer" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditSupplier;