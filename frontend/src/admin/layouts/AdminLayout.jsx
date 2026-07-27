import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";


const AdminLayout = ()=>{

  return(
    <div>
      <AdminSidebar/>
      <main className="flex-1 p-6">
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminLayout;