
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'


import { SubjectPackCreationProvider } from './admin/contex/SubjectPackCreationContext';
import AdminRoutes from './routes/AdminRoutes';
import AppRoutes from './routes/AppRoutes';

function App() {


  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App;
