import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";



const MainLayout = ()=>{

  return(
    <div>
      <NavbarComponent/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default MainLayout;