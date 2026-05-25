import React from "react";
import { useLocation } from "react-router-dom";
import {
  ButtonLink,
  DetailItem,
  FieldGrid,
  Section,
  SecondaryButton,
  SupplierBody,
  SupplierHeader,
  SupplierPage,
  Surface,
} from "../components/SupplierUI";

export default function SupplierRegistered() {
  const { state } = useLocation();
  const payload = state?.data;
  const user = payload?.user;
  const supplier = payload?.supplier;
  const address = supplier?.address || {};

  const handlePrint = () => {
    window.print();
  };

  if (!user || !supplier) {
    return (
      <SupplierPage>
        <SupplierHeader
          title="Supplier Registration"
          subtitle="No registration data was received for this page"
          actions={<ButtonLink to="/suppliers" variant="secondary">Back to Suppliers</ButtonLink>}
        />
      </SupplierPage>
    );
  }

  return (
    <SupplierPage>
      <SupplierHeader
        title="Supplier Registered"
        subtitle={`${supplier.supplierName} is ready to review`}
        actions={
          <>
            <SecondaryButton onClick={handlePrint}>Print</SecondaryButton>
            <ButtonLink to={`/suppliers/details/${supplier._id}`}>View Details</ButtonLink>
            <ButtonLink to="/suppliers" variant="secondary">Back to Suppliers</ButtonLink>
          </>
        }
      />

      <SupplierBody>
        <Surface>
          <Section title="Supplier Details">
            <FieldGrid>
              <DetailItem label="Supplier Name" value={supplier.supplierName} />
              <DetailItem label="Supplier No" value={supplier.supplierNo} />
              <DetailItem label="GST Number" value={supplier.gstNumber || "N/A"} />
              <DetailItem label="PAN Number" value={supplier.panNumber || "N/A"} />
            </FieldGrid>
          </Section>

          <Section title="Contact Person">
            <FieldGrid>
              <DetailItem label="Name" value={`${user.firstName || ""} ${user.lastName || ""}`.trim() || "N/A"} />
              <DetailItem label="Email" value={user.email || "N/A"} />
              <DetailItem label="Phone" value={user.phone || "N/A"} />
              <DetailItem label="Role" value={user.role || "N/A"} />
            </FieldGrid>
          </Section>

          <Section title="Business Address">
            <FieldGrid>
              <DetailItem label="House No" value={address.houseNo || "N/A"} />
              <DetailItem label="Street" value={address.street || "N/A"} />
              <DetailItem label="City" value={address.city || "N/A"} />
              <DetailItem label="State" value={address.state || "N/A"} />
              <DetailItem label="Pincode" value={address.pincode || "N/A"} />
            </FieldGrid>
          </Section>
        </Surface>
      </SupplierBody>
    </SupplierPage>
  );
}
