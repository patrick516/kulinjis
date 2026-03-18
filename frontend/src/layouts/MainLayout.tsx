// src/layouts/MainLayout.tsx
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@/layouts/Sidebar";
import { Bell, Search } from "lucide-react";
import { useAuth } from "@/state/AuthContext";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/": {
    title: "Dashboard",
    subtitle: "Welcome back — here's what's happening",
  },
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Welcome back — here's what's happening",
  },
  "/gallery": { title: "Gallery", subtitle: "Manage clan photos and media" },
  "/messages": { title: "Messages", subtitle: "View and respond to inquiries" },
};

export function MainLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const page = pageTitles[location.pathname] ?? {
    title: "Portal",
    subtitle: "",
  };

  const displayName = user?.email ? user.email.split("@")[0] : "Admin";

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 border-b border-slate-100 bg-white flex items-center justify-between px-6 flex-shrink-0">
          {/* Page title */}
          <div>
            <h1 className="text-base font-semibold text-slate-800 leading-tight">
              {page.title}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">{page.subtitle}</p>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Search bar */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-52">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search…"
                className="bg-transparent text-sm text-slate-600 placeholder-slate-400 focus:outline-none w-full"
              />
            </div>

            {/* Notification bell */}
            <button className="relative w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition">
              <Bell className="w-4 h-4 text-slate-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 border-2 border-white" />
            </button>

            {/* Avatar */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-xs font-bold">
                {user?.email?.slice(0, 2).toUpperCase() ?? "KL"}
              </div>
              <div className="hidden md:block text-right">
                <div className="text-xs font-semibold text-slate-700 capitalize leading-tight">
                  {displayName}
                </div>
                <div className="text-[10px] text-slate-400 capitalize">
                  {user?.role ?? "admin"}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
