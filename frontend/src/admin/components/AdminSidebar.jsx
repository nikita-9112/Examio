import { BookOpen, LayoutDashboard, LogOut, PlusCircle } from  "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name:"Dashboard",
    path:"/admin",
    icon: LayoutDashboard,
  },
  {
    name:"Subject Packs",
    path:"/admin/subject-packs",
    icon: BookOpen,
  },
  {
    name:"Add Subject Pack",
    path:"/admin/subject-pack/new",
    icon: PlusCircle,
  }
]

const AdminSidebar = () =>{

  return(
    <aside className="w-72 min-h-screen bg-white border-r flex flex-col justify-between shadow-sm h-100">

      <div>
        <div className="px-6 py-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600 mb-10">
            Examio Admin
          </h1> 
          <p className="text-sm text-gray-500 mt-1">
            Manage your subject packs..
          </p>
        </div>

        {/* navigation */}

        <nav>

          {menuItems.map((item) => {

            const Icon = item.icon;

            return(
              <NavLink key={item.name} to={item.path} end={item.path === "/admin"} 
              className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 
              ${isActive ? "bg-blue-100 text-blue-700 font-semibold"
            : "text-gray-700 hover:bg-blue-50"}`
          }>
            <Icon size={20} />
            {item.name}

          </NavLink>
            );
          })}
        </nav>

      </div>

      {/* logout */}
      <div className="p-4 border-t">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>
     
    </aside>
  )
}
export default AdminSidebar;