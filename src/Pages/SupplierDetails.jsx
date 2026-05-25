import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../api";
import {
  ButtonLink,
  DetailItem,
  DocumentPreview,
  FieldGrid,
  Section,
  SupplierBody,
  SupplierHeader,
  SupplierPage,
  Surface,
} from "../components/SupplierUI";

function SupplierDetails() {
  const { _id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["supplier", _id],
    queryFn: async () => {
      const res = await api.get(`/admin/suppliers/${_id}`);
      return res.data;
    },
    enabled: !!_id,
  });

  if (isLoading) {
    return (
      <SupplierPage>
        <div className="flex min-h-screen items-center justify-center text-gray-500">
          Loading supplier details...
        </div>
      </SupplierPage>
    );
  }

  if (isError) {
    return (
      <SupplierPage>
        <div className="flex min-h-screen items-center justify-center text-red-500">
          Failed to load supplier details
        </div>
      </SupplierPage>
    );
  }

  const supplier = data?.data || {};
  const contactName = `${supplier.user?.firstName || ""} ${supplier.user?.lastName || ""}`.trim();
  const address = supplier.address || {};

  return (
    <SupplierPage>
      <SupplierHeader
        title="Supplier Details"
        subtitle={supplier.supplierName || "Review supplier profile and documents"}
        actions={
          <>
            <ButtonLink to={`/suppliers/edit/${_id}`}>Edit Supplier</ButtonLink>
            <ButtonLink to="/suppliers" variant="secondary">Back to Suppliers</ButtonLink>
          </>
        }
      />

      <SupplierBody>
        <Surface>
          <Section title="Business Profile">
            <FieldGrid>
              <DetailItem label="Supplier Name" value={supplier.supplierName || "N/A"} />
              <DetailItem label="Supplier No" value={supplier.supplierNo || "N/A"} />
              <DetailItem label="GST Number" value={supplier.gstNumber || "N/A"} />
              <DetailItem label="PAN Number" value={supplier.panNumber || "N/A"} />
            </FieldGrid>
          </Section>

          <Section title="Contact Person">
            <FieldGrid>
              <DetailItem label="Name" value={contactName || "N/A"} />
              <DetailItem label="Email" value={supplier.user?.email || "N/A"} />
              <DetailItem label="Phone" value={supplier.user?.phone || "N/A"} />
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

          <Section title="Documents">
            <div className="grid gap-5 lg:grid-cols-2">
              <DocumentPreview title="GST Document" url={supplier.gstDocument} />
              <DocumentPreview title="PAN Document" url={supplier.panDocument} />
            </div>
          </Section>
        </Surface>
      </SupplierBody>
    </SupplierPage>
  );
}

export default SupplierDetails;
