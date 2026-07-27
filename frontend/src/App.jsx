
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Registerpage from './pages/RegisterPage';
import SubjectDetailsPage from './pages/SubjectDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './pages/DashboardPage';
import AdminLayout from './admin/layouts/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import SubjectPacks from './admin/pages/SubjectPacks';
import ManagePapers from './admin/pages/ManagePapers';

function App() {


  return (
    <BrowserRouter>
        <Routes>
          <Route element={<MainLayout/>} >
              <Route path='/' element={<HomePage/>}/>
              <Route path='/login' element={<LoginPage/>} />
              <Route path='/register' element={<Registerpage/>} />
              <Route path='/subject/:id' element={<SubjectDetailsPage/>} />
              <Route path='*' element={<NotFoundPage/>} />


              <Route path='/dashboard' element={<DashboardPage/>} />
          </Route>
         
          
          <Route path='/admin'  element={<AdminLayout />}>
            <Route index element={<Dashboard/>} />
            <Route path='/admin/subject-packs' element={<SubjectPacks/>} />
            <Route path='/admin/subject-packs/:id' element={<ManagePapers/>} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
