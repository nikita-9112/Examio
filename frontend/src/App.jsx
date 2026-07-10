
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import MainLayout from './pages/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Registerpage from './pages/RegisterPage';
import SubjectDetailsPage from './pages/SubjectDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './pages/DashboardPage';

function App() {


  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<Registerpage/>} />
          <Route path='/subject/:id' element={<SubjectDetailsPage/>} />
          <Route path='*' element={<NotFoundPage/>} />


          <Route path='/dashboard' element={<DashboardPage/>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App;
