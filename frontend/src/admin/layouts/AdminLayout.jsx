import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";


const AdminLayout = ()=>{

  return(
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar/>
      <main className="flex-1 p-8">
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminLayout;