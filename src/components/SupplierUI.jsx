import React from "react";
import { Link } from "react-router-dom";

export function SupplierPage({ children }) {
  return <div className="min-h-screen w-full bg-gray-50 text-black">{children}</div>;
}

export function SupplierHeader({ title, subtitle, actions }) {
  return (
    <div className="sticky top-0 z-30 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}

export function SupplierBody({ children, narrow = false }) {
  return (
    <div className={`mx-auto p-6 ${narrow ? "max-w-5xl" : "max-w-7xl"}`}>
      {children}
    </div>
  );
}

export function Surface({ children, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-3xl border border-gray-200 bg-white ${className}`}>
      {children}
    </div>
  );
}

export function Section({ title, description, children }) {
  return (
    <section className="border-b border-gray-100 p-6 last:border-b-0">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export function FieldGrid({ children }) {
  return <div className="grid gap-5 md:grid-cols-2">{children}</div>;
}

export function TextInput({ label, name, value, onChange, type = "text", required = false, placeholder }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-500">{label}</span>
      <input
        className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black"
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        placeholder={placeholder || label}
      />
    </label>
  );
}

export function FileInput({ label, onChange }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-500">{label}</span>
      <input
        className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-xl file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-medium file:text-white focus:border-black"
        type="file"
        accept="image/*,.pdf"
        onChange={onChange}
      />
    </label>
  );
}

export function DetailItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-1 text-sm font-medium text-gray-900">{value || "N/A"}</p>
    </div>
  );
}

export function PrimaryButton({ children, type = "button", onClick, disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-medium text-white transition ${
        disabled ? "cursor-not-allowed bg-gray-400" : "bg-black hover:opacity-90"
      }`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, type = "button", onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
    >
      {children}
    </button>
  );
}

export function ButtonLink({ children, to, variant = "primary" }) {
  const classes =
    variant === "primary"
      ? "bg-black text-white hover:opacity-90"
      : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100";

  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-medium transition ${classes}`}
    >
      {children}
    </Link>
  );
}

export function DocumentPreview({ title, url }) {
  const fileUrl = typeof url === "string" ? url : url?.url || "";
  const lowerUrl = fileUrl.toLowerCase();
  const isImage =
    lowerUrl.endsWith(".png") ||
    lowerUrl.endsWith(".jpg") ||
    lowerUrl.endsWith(".jpeg") ||
    lowerUrl.endsWith(".webp");
  const isPdf = lowerUrl.endsWith(".pdf");

  return (
    <div className="flex min-h-[220px] flex-col rounded-3xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {fileUrl && (
          <a
            className="text-xs font-medium text-gray-500 underline underline-offset-4 hover:text-black"
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open
          </a>
        )}
      </div>

      <div className="flex flex-1 items-center justify-center overflow-hidden rounded-2xl bg-gray-50">
        {!fileUrl && <p className="text-sm text-gray-400">No document uploaded</p>}
        {isImage && <img src={fileUrl} alt={title} className="h-full max-h-[280px] w-full object-contain" />}
        {isPdf && <iframe title={title} src={fileUrl} className="h-[280px] w-full" />}
        {fileUrl && !isImage && !isPdf && (
          <p className="px-4 text-center text-sm text-gray-500">Preview unavailable. Open the file to view it.</p>
        )}
      </div>
    </div>
  );
}
