import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import {
  ButtonLink,
  DocumentPreview,
  FieldGrid,
  FileInput,
  Section,
  SupplierBody,
  SupplierHeader,
  SupplierPage,
  Surface,
  TextInput,
} from "../components/SupplierUI";

const toForm = (supplier) => ({
  supplierName: supplier.supplierName || "",
  gstNumber: supplier.gstNumber || "",
  panNumber: supplier.panNumber || "",
  address: {
    houseNo: supplier.address?.houseNo || "",
    street: supplier.address?.street || "",
    city: supplier.address?.city || "",
    state: supplier.address?.state || "",
    pincode: supplier.address?.pincode || "",
  },
  gstDocument: supplier.gstDocument || "",
  panDocument: supplier.panDocument || "",
});

function SupplierEditForm({ supplier, supplierId }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState(() => toForm(supplier));
  const [gstFile, setGstFile] = useState(null);
  const [panFile, setPanFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateSupplier = useMutation({
    mutationFn: async () => {
      const fd = new FormData();

      Object.keys(form).forEach((key) => {
        if (key === "address") {
          Object.keys(form.address).forEach((addressKey) => {
            fd.append(`address[${addressKey}]`, form.address[addressKey]);
          });
          return;
        }

        if (key !== "gstDocument" && key !== "panDocument") {
          fd.append(key, form[key]);
        }
      });

      if (gstFile) fd.append("gstDocument", gstFile);
      if (panFile) fd.append("panDocument", panFile);

      return api.put(`/admin/suppliers/${supplierId}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["supplier", supplierId] });
      await queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      navigate(`/suppliers/details/${supplierId}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSupplier.mutate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Surface>
        <Section title="Business Details">
          <FieldGrid>
            <TextInput label="Supplier Name" name="supplierName" value={form.supplierName} onChange={handleChange} required />
            <TextInput label="GST Number" name="gstNumber" value={form.gstNumber} onChange={handleChange} />
            <TextInput label="PAN Number" name="panNumber" value={form.panNumber} onChange={handleChange} />
          </FieldGrid>
        </Section>

        <Section title="Business Address">
          <FieldGrid>
            <TextInput label="House No" name="address.houseNo" value={form.address.houseNo} onChange={handleChange} />
            <TextInput label="Street" name="address.street" value={form.address.street} onChange={handleChange} />
            <TextInput label="City" name="address.city" value={form.address.city} onChange={handleChange} />
            <TextInput label="State" name="address.state" value={form.address.state} onChange={handleChange} />
            <TextInput label="Pincode" name="address.pincode" value={form.address.pincode} onChange={handleChange} />
          </FieldGrid>
        </Section>

        <Section title="Documents" description="Upload a new file only when replacing the existing document.">
          <FieldGrid>
            <FileInput label="Upload GST Document" onChange={(e) => setGstFile(e.target.files?.[0] || null)} />
            <FileInput label="Upload PAN Document" onChange={(e) => setPanFile(e.target.files?.[0] || null)} />
          </FieldGrid>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <DocumentPreview title="Current GST Document" url={form.gstDocument} />
            <DocumentPreview title="Current PAN Document" url={form.panDocument} />
          </div>
        </Section>

        {updateSupplier.isError && (
          <div className="border-t border-gray-100 px-6 py-4 text-sm text-red-500">
            {updateSupplier.error?.message || "Failed to update supplier"}
          </div>
        )}

        <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 p-6">
          <ButtonLink to={`/suppliers/details/${supplierId}`} variant="secondary">Cancel</ButtonLink>
          <button
            type="submit"
            disabled={updateSupplier.isPending}
            className={`inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-medium text-white transition ${
              updateSupplier.isPending ? "cursor-not-allowed bg-gray-400" : "bg-black hover:opacity-90"
            }`}
          >
            {updateSupplier.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </Surface>
    </form>
  );
}

function EditSupplier() {
  const { _id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["supplier", _id],
    queryFn: async () => {
      const res = await api.get(`/admin/suppliers/${_id}`);
      return res.data.data;
    },
    enabled: !!_id,
  });

  if (isLoading) {
    return (
      <SupplierPage>
        <div className="flex min-h-screen items-center justify-center text-gray-500">
          Loading supplier...
        </div>
      </SupplierPage>
    );
  }

  if (isError) {
    return (
      <SupplierPage>
        <div className="flex min-h-screen items-center justify-center text-red-500">
          Failed to load supplier
        </div>
      </SupplierPage>
    );
  }

  return (
    <SupplierPage>
      <SupplierHeader
        title="Edit Supplier"
        subtitle={data?.supplierName || "Update supplier profile and documents"}
        actions={
          <>
            <ButtonLink to={`/suppliers/details/${_id}`} variant="secondary">View Details</ButtonLink>
            <ButtonLink to="/suppliers" variant="secondary">Back to Suppliers</ButtonLink>
          </>
        }
      />

      <SupplierBody narrow>
        <SupplierEditForm key={data?._id} supplier={data} supplierId={_id} />
      </SupplierBody>
    </SupplierPage>
  );
}

export default EditSupplier;
