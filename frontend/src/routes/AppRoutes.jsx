import DashboardPage from "../pages/DashboardPage"
import AdminRoutes from "./AdminRoutes";

import {Routes, Route} from "react-router-dom";

import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Registerpage from '../pages/RegisterPage';
import SubjectDetailsPage from '../pages/SubjectDetailsPage';
import NotFoundPage from '../pages/NotFoundPage';



const AppRoutes = () =>{

  return(
    <Routes>

    <Route element={<MainLayout/>}>

      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<Registerpage/>} />
      <Route path='/subject/:id' element={<SubjectDetailsPage/>} />
      <Route path='*' element={<NotFoundPage/>} />

      <Route  path="/dashboard" element={<DashboardPage/>} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Route>
  
    </Routes>
  )
}

export default AppRoutes;