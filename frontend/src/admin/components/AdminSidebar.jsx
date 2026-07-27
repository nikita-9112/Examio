import { BookOpen, LayoutDashboard, LogOut } from  "lucide-react";
import { NavLink } from "react-router-dom";


const AdminSidebar = () =>{

  return(
    <aside className="w-64 bg-white border-r shadow-sm h-100">
      <h1 className="text-2xl font-bold text-blue-600 mb-10">
        Examio Admin
      </h1>
      <nav className="space-y-3">
        <NavLink to="/admin" end className="flex items-center gap-3 rounded-lg p-3 hover:bg-blue-50">
          <LayoutDashboard size={20}/>
          Dashboard
        </NavLink>

        <NavLink
        to="/admin/subject-packs"
        className="flex items-center gap-3 rounded-lg p-3 hover:bg-blue-50">
          <BookOpen size={20} />
          Subject Packs
        </NavLink>
      </nav>

      <button className="flex items-center gap-3 mt-10 text-red-500 hover:text-red-600">
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  )
}
export default AdminSidebar;