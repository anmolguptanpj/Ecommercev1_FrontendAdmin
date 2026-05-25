import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/authSlice";
import {
  IconArrowBack,
  IconCreditCard,
  IconDots,
  IconHanger,
  IconHome,
  IconIdBadge,
  IconLayoutDashboard,
  IconLogout,
  IconPackage,
  IconPlus,
  IconTrendingUp,
  IconTruckDelivery,
  IconUsers,
} from "@tabler/icons-react";

const navSections = [
  {
    label: "Overview",
    links: [
      { to: "/home", label: "Home", icon: IconHome },
      { to: "/dashboard", label: "Dashboard", icon: IconLayoutDashboard },
    ],
  },
  {
    label: "Commerce",
    links: [
      { to: "/orders", label: "Orders", icon: IconPackage },
      { to: "/products", label: "Products", icon: IconHanger },
      { to: "/customer", label: "Customers", icon: IconUsers },
      { to: "/suppliers", label: "Suppliers", icon: IconTruckDelivery },
      { to: "/returns", label: "Returns", icon: IconArrowBack },
    ],
  },
  {
    label: "Finance",
    links: [
      { to: "/payments", label: "Payments", icon: IconCreditCard },
      { to: "/sales", label: "Sales", icon: IconTrendingUp },
    ],
  },
  {
    label: "Admin",
    links: [
      { to: "/staff", label: "Staff", icon: IconIdBadge },
      { to: "/register/supplier", label: "Register Supplier", icon: IconPlus },
    ],
  },
];

function Tooltip({ label }) {
  return (
    <span className="absolute left-[calc(100%+10px)] top-1/2 z-[999] -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#1a1a1a] px-2.5 py-1.5 text-[12px] font-medium text-white opacity-0 transition-opacity delay-300 duration-150 before:absolute before:-left-[5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-[#1a1a1a] before:content-[''] group-hover:opacity-100">
      {label}
    </span>
  );
}

function NavIcon({ icon, active }) {
  return (
    <div
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] text-[11px] font-semibold transition-colors duration-150 ${
        active ? "bg-white text-[#0f0f0f]" : "bg-white/[0.06] text-white/55"
      }`}
    >
      {React.createElement(icon, { size: 15, stroke: 1.75 })}
    </div>
  );
}

export default function Sidebar() {
  const user = useSelector((state) => state.auth.user);
  const adminDetails = useSelector((state) => state.auth.extraDetails);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const displayName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : "Admin";
  const roleLabel = adminDetails?.designation || user?.role || "Admin";

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setOpen(false), 300);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="sticky top-0 z-40 h-screen shrink-0"
      style={{
        width: open ? "220px" : "64px",
        transition: "width 280ms cubic-bezier(.4,0,.2,1)",
      }}
    >
      <div className="absolute inset-0 flex flex-col overflow-hidden bg-[#0f0f0f]">
        <div className="flex min-w-[220px] shrink-0 items-center gap-3 border-b border-white/[0.08] px-[18px] py-[18px]">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white">
            <div className="h-3.5 w-3.5 rounded-sm bg-[#0f0f0f]" />
          </div>
          <span
            className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-white"
            style={{
              opacity: open ? 1 : 0,
              transition: "opacity 180ms ease",
              transitionDelay: open ? "80ms" : "0ms",
            }}
          >
            Codex Admin
          </span>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navSections.map(({ label, links }) => (
            <div key={label}>
              <div
                className="select-none overflow-hidden whitespace-nowrap px-[18px] text-[10px] font-semibold uppercase tracking-widest text-white/30"
                style={{
                  height: open ? "28px" : "0px",
                  opacity: open ? 1 : 0,
                  paddingTop: open ? "10px" : "0",
                  paddingBottom: open ? "4px" : "0",
                  transition: "height 200ms ease, opacity 150ms ease, padding 200ms ease",
                  transitionDelay: open ? "60ms" : "0ms",
                }}
              >
                {label}
              </div>

              {links.map(({ to, label: linkLabel, icon }) => {
                const active = pathname === to;

                return (
                  <Link
                    key={to}
                    to={to}
                    className={`group relative flex min-w-[220px] items-center gap-2.5 transition-colors duration-150 ${
                      active ? "bg-white/[0.12]" : "hover:bg-white/[0.07]"
                    }`}
                    style={{ padding: "7px 16px" }}
                  >
                    <NavIcon icon={icon} active={active} />
                    <span
                      className={`flex-1 whitespace-nowrap text-[13px] font-medium ${
                        active ? "text-white" : "text-white/55"
                      }`}
                      style={{
                        opacity: open ? 1 : 0,
                        transition: "opacity 150ms ease",
                        transitionDelay: open ? "60ms" : "0ms",
                      }}
                    >
                      {linkLabel}
                    </span>
                    {!open && <Tooltip label={linkLabel} />}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="shrink-0 border-t border-white/[0.08] py-2.5">
          <div className="flex min-w-[220px] items-center gap-2.5 px-4 py-2">
            <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-white/10">
              <img
                src={`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(displayName || "Admin")}&backgroundColor=b6e3f4`}
                alt={displayName}
                className="h-full w-full object-cover"
              />
            </div>
            <div
              className="flex-1 overflow-hidden"
              style={{
                opacity: open ? 1 : 0,
                transition: "opacity 150ms ease",
                transitionDelay: open ? "60ms" : "0ms",
              }}
            >
              <p className="truncate text-[12px] font-semibold text-white/85">
                {displayName}
              </p>
              <p className="truncate text-[11px] text-white/35">{roleLabel}</p>
            </div>
            <IconDots
              size={14}
              stroke={1.75}
              className="shrink-0 text-white/25"
              style={{
                opacity: open ? 1 : 0,
                transition: "opacity 150ms ease",
                transitionDelay: open ? "80ms" : "0ms",
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="group flex min-w-[220px] items-center gap-2.5 px-4 py-2 text-white/35 transition-colors duration-150 hover:bg-red-500/10 hover:text-red-400"
          >
            <IconLogout
              size={15}
              stroke={1.75}
              className="shrink-0 transition-colors duration-150 group-hover:text-red-400"
            />
            <span
              className="whitespace-nowrap text-[13px] font-medium transition-[opacity,color] duration-0 group-hover:text-red-400"
              style={{
                opacity: open ? 1 : 0,
                transitionDelay: open ? "60ms" : "0ms",
              }}
            >
              Logout
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
