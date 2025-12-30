import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PricingPage from './components/PricingPage';  // Adjust the import based on where your PricingPage is located
import ClientLogin from './components/client_portal/components/ClientLogin.tsx';
//import ClientDashboard from './components/client_portal/components/ClientDashboard.tsx';
import ClientMain from './components/client_portal/Main.tsx';
import ClientSpecDoc from './components/client_portal/components/ClientSpecDoc.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

//import NotFoundPage from './components/NotFoundPage';  // Optional: For 404 page

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/client/login" element={<ClientLogin />} />
        <Route
          path="/client/dashboard"
          element={
            <ProtectedRoute>
              <ClientMain />
            </ProtectedRoute>
          }
        />

        <Route
          path="/client/reports"
          element={
            <ProtectedRoute>
              <ClientSpecDoc />
            </ProtectedRoute>
          }
        />{/* <Route path="*" element={<NotFoundPage />} />  */}
      </Routes>
    </Router>
  </StrictMode>,
)
