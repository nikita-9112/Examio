import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="min-h-screen lg:ml-72">

        {/* Mobile Header */}
        <div
          className="
            sticky top-0 z-30
            flex items-center
            gap-3
            border-b border-slate-200
            bg-white
            px-4 py-3
            lg:hidden
          "
        >

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              text-slate-600
              transition
              hover:bg-slate-100
              active:scale-95
            "
            aria-label="Open admin menu"
          >
            <Menu size={24} />
          </button>

          <div>
            <h1 className="text-base font-bold text-slate-900">
              Examio
            </h1>

            <p className="text-xs text-slate-500">
              Admin Panel
            </p>
          </div>

        </div>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default AdminLayout;