import DashboardPage from "../pages/DashboardPage"
import AdminRoutes from "./AdminRoutes";

import {Routes, Route} from "react-router-dom";

import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Registerpage from '../pages/RegisterPage';
import SubjectDetailsPage from '../pages/SubjectDetailsPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from "../components/ProtectedRoute";
import ProtectedPaperViewer from "../pages/ProtectedPaperViewer";
import SubjectPacksPage from "../pages/SubjectPacksPage";
import ForgotPass from '../pages/ForgotPass';
import ResetPassword from '../pages/ResetPassword';


const AppRoutes = () =>{

  return(
    <Routes>

    <Route element={<MainLayout/>}>

      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/forgot-password' element={<ForgotPass />} />
      <Route path='/reset-password/:token' element={<ResetPassword />} />
      
      <Route path='/register' element={<Registerpage/>} />
      <Route path='/subject/:id' element={<SubjectDetailsPage/>} />
      <Route path="/subject-packs" element={<SubjectPacksPage />}/>
      <Route path='*' element={<NotFoundPage/>} />
      <Route
      path="/paper/:subjectPackId/:paperId"
      element={<ProtectedPaperViewer />}
    />

      <Route element={<ProtectedRoute allowedRole="student" />}>
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />
      </Route>
      
      <Route element={<ProtectedRoute allowedRole="admin" />}>
        <Route
          path="/admin/*"
          element={<AdminRoutes />}
        />
      </Route>
    </Route>
  
    </Routes>
  )
}

export default AppRoutes;