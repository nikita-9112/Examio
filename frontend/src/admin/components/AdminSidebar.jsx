
import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  PlusCircle,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Subject Packs",
    path: "/admin/subject-packs",
    icon: BookOpen,
  },
  {
    name: "Add Subject Pack",
    path: "/admin/subject-pack/new",
    icon: PlusCircle,
  },
];

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      className="
        sticky top-0 z-40
        flex h-screen w-72 shrink-0 flex-col
        border-r border-slate-200
        bg-white
      "
    >
      {/* ================= HEADER ================= */}

      <div className="border-b border-slate-200 px-5 py-5 sm:px-6 sm:py-6">

        <div className="flex items-center gap-3">

          {/* Logo */}
          <div
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              bg-blue-600
              text-white
              shadow-sm
            "
          >
            <BookOpen size={21} strokeWidth={2} />
          </div>

          {/* Brand */}
          <div className="min-w-0">
            <h1
              className="
                truncate
                text-lg
                font-bold
                tracking-tight
                text-slate-900
              "
            >
              Examio
            </h1>

            <p className="text-xs font-medium text-slate-500">
              Admin Panel
            </p>
          </div>

        </div>

        {/* Description */}
        <p
          className="
            mt-4
            max-w-xs
            text-sm
            leading-5
            text-slate-500
          "
        >
          Manage your subject packs and examination content.
        </p>

      </div>

      {/* ================= NAVIGATION ================= */}

      <div className="flex-1 overflow-y-auto px-3 py-5 sm:px-4 sm:py-6">

        <p
          className="
            mb-3
            px-3
            text-[11px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-slate-400
          "
        >
          Management
        </p>

        <nav className="space-y-1.5">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) => `
                  group relative
                  flex items-center gap-3
                  rounded-xl
                  px-3 py-3
                  text-sm font-medium
                  transition-all duration-200

                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    {/* Active left indicator */}
                    <span
                      className={`
                        absolute left-0
                        h-6 w-1
                        rounded-r-full
                        bg-blue-600
                        transition-opacity duration-200
                        ${
                          isActive
                            ? "opacity-100"
                            : "opacity-0"
                        }
                      `}
                    />

                    {/* Icon */}
                    <span
                      className={`
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-lg
                        transition-all duration-200

                        ${
                          isActive
                            ? "bg-blue-100 text-blue-600"
                            : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600"
                        }
                      `}
                    >
                      <Icon size={18} strokeWidth={2} />
                    </span>

                    {/* Text */}
                    <span className="truncate">
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}

        </nav>

      </div>

      {/* ================= BOTTOM SECTION ================= */}

      <div className="border-t border-slate-200 p-3 sm:p-4">

        {/* Admin profile */}
        <div
          className="
            mb-3
            flex items-center gap-3
            rounded-xl
            bg-slate-50
            p-3
          "
        >

          <div
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-full
              bg-blue-100
              text-sm
              font-bold
              text-blue-700
            "
          >
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              Administrator
            </p>

            <p className="truncate text-xs text-slate-500">
              Manage Examio
            </p>
          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            group
            flex w-full items-center gap-3
            rounded-xl
            px-3 py-3
            text-sm font-medium
            text-slate-600
            transition-all duration-200
            hover:bg-red-50
            hover:text-red-600
            active:scale-[0.98]
          "
        >

          <span
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-lg
              bg-slate-100
              text-slate-500
              transition-all duration-200
              group-hover:bg-red-100
              group-hover:text-red-600
            "
          >
            <LogOut size={18} />
          </span>

          <span>Logout</span>

        </button>

      </div>

    </aside>
  );
};

export default AdminSidebar;