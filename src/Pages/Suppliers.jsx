import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api";

function Suppliers() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const res = await api.get("/admin/suppliers");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-500">
        Loading Suppliers...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-red-500">
        Failed to load suppliers
      </div>
    );
  }

  const suppliers = data?.data || [];

  return (
    <div className="w-full bg-gray-50 text-black">
      <div className="sticky top-0 z-30 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Suppliers</h1>
            <p className="mt-1 text-sm text-gray-500">
              {suppliers.length} supplier{suppliers.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <Link
            to="/register/supplier"
            className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            Register Supplier
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-6">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
          {suppliers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <p className="text-lg font-medium">No suppliers found</p>
              <p className="mt-1 text-sm">Registered suppliers will appear here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-gray-500">
                    <th className="whitespace-nowrap px-6 py-4 font-medium">
                      Supplier No
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 font-medium">
                      Supplier Name
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 font-medium">
                      Approved By
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 font-medium">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {suppliers.map((supplier) => {
                    const approvedBy = supplier.createdBy
                      ? `${supplier.createdBy.firstName || ""} ${
                          supplier.createdBy.lastName || ""
                        }`.trim()
                      : "N/A";
                    const detailPath = `/suppliers/details/${supplier._id}`;

                    return (
                      <tr
                        key={supplier._id}
                        onClick={() => navigate(detailPath)}
                        className="cursor-pointer transition hover:bg-gray-50"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-gray-500">
                          {supplier.supplierNo || "N/A"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {supplier.supplierName || "N/A"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                          {approvedBy || "N/A"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <Link
                            to={detailPath}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center justify-center rounded-2xl bg-black px-4 py-2 text-xs font-medium text-white transition hover:opacity-80"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Suppliers;
