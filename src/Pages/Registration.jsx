import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api";
import {
  ButtonLink,
  FieldGrid,
  Section,
  SecondaryButton,
  SupplierBody,
  SupplierHeader,
  SupplierPage,
  Surface,
  TextInput,
} from "../components/SupplierUI";

export default function Registration() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    supplierName: "",
    gstNumber: "",
    panNumber: "",
  });

  const [address, setAddress] = useState({
    city: "",
    pincode: "",
    street: "",
    houseNo: "",
    state: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddress = (e) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await api.post("/register/supplier", {
        ...form,
        address,
      });

      toast.success("Supplier registered successfully");
      navigate("/supplier/congratulations", { state: res.data });
    } catch (err) {
      toast.error(err?.message || "Failed to register supplier");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SupplierPage>
      <SupplierHeader
        title="Register Supplier"
        subtitle="Create the supplier account, business profile, and address"
        actions={<ButtonLink to="/suppliers" variant="secondary">Back to Suppliers</ButtonLink>}
      />

      <SupplierBody narrow>
        <form onSubmit={handleCreate}>
          <Surface>
            <Section
              title="Contact Person"
              description="This user will be attached to the supplier account."
            >
              <FieldGrid>
                <TextInput label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required />
                <TextInput label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} required />
                <TextInput label="Email Address" name="email" value={form.email} onChange={handleChange} type="email" required />
                <TextInput label="Phone Number" name="phone" value={form.phone} onChange={handleChange} required />
              </FieldGrid>
            </Section>

            <Section
              title="Business Details"
              description="Use the official supplier, GST, and PAN details."
            >
              <FieldGrid>
                <TextInput label="Supplier Name" name="supplierName" value={form.supplierName} onChange={handleChange} required />
                <TextInput label="GST Number" name="gstNumber" value={form.gstNumber} onChange={handleChange} />
                <TextInput label="PAN Number" name="panNumber" value={form.panNumber} onChange={handleChange} />
              </FieldGrid>
            </Section>

            <Section title="Business Address">
              <FieldGrid>
                <TextInput label="House No" name="houseNo" value={address.houseNo} onChange={handleAddress} />
                <TextInput label="Street" name="street" value={address.street} onChange={handleAddress} />
                <TextInput label="City" name="city" value={address.city} onChange={handleAddress} />
                <TextInput label="State" name="state" value={address.state} onChange={handleAddress} />
                <TextInput label="Pincode" name="pincode" value={address.pincode} onChange={handleAddress} />
              </FieldGrid>
            </Section>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-gray-100 p-6">
              <SecondaryButton onClick={() => navigate("/suppliers")}>Cancel</SecondaryButton>
              <button
                type="submit"
                disabled={saving}
                className={`inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-medium text-white transition ${
                  saving ? "cursor-not-allowed bg-gray-400" : "bg-black hover:opacity-90"
                }`}
              >
                {saving ? "Creating..." : "Create Supplier"}
              </button>
            </div>
          </Surface>
        </form>
      </SupplierBody>
    </SupplierPage>
  );
}
