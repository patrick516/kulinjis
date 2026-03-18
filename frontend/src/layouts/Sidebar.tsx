// src/layouts/Sidebar.tsx
"use client";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Images,
  Mail,
  ChevronLeft,
  ChevronRight,
  LogOut,
  TreePine,
} from "lucide-react";
import { useAuth } from "@/state/AuthContext";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/gallery", icon: Images, label: "Gallery" },
  { to: "/messages", icon: Mail, label: "Messages" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.email ? user.email.slice(0, 2).toUpperCase() : "KL";

  const displayName = user?.email ? user.email.split("@")[0] : "Admin";

  return (
    <aside
      className={`
        relative flex flex-col h-screen bg-white border-r border-slate-100
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-[72px]" : "w-64"}
      `}
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 z-10 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50 transition"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-slate-500" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-slate-500" />
        )}
      </button>

      {/* Brand */}
      <div
        className={`flex items-center gap-3 px-4 py-5 border-b border-slate-100 ${collapsed ? "justify-center px-2" : ""}`}
      >
        <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center flex-shrink-0 shadow-sm">
          <TreePine className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-sm font-bold text-slate-800 leading-tight">
              Kulinjis
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">
              Admin Portal
            </div>
          </div>
        )}
      </div>

      {/* User profile card */}
      <div
        className={`mx-3 mt-4 mb-2 rounded-xl bg-slate-50 border border-slate-100 ${collapsed ? "p-2 flex justify-center" : "p-3"}`}
      >
        {collapsed ? (
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
            {initials}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-800 truncate capitalize">
                {displayName}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-slate-400 capitalize">
                  {user?.role || "admin"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Nav label */}
      {!collapsed && (
        <div className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
          Navigation
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-1 pt-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                [
                  "flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 group",
                  collapsed ? "justify-center" : "gap-3",
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm shadow-emerald-200"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-700"}`}
                  />
                  {!collapsed && <span>{item.label}</span>}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 border-t border-slate-100 mb-3" />

      {/* Logout */}
      <div className="px-3 pb-5">
        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className={`
            w-full flex items-center rounded-xl px-3 py-2.5 text-sm font-medium
            text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150
            ${collapsed ? "justify-center" : "gap-3"}
          `}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
