
import { BrowserRouter } from 'react-router-dom';
import './App.css'



import AppRoutes from './routes/AppRoutes';
import { ToastProvider } from "./context/ToastContext";

function App() {


  return (
    <BrowserRouter>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App;
