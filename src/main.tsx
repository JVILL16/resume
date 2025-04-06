import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PricingPage from './components/PricingPage';  // Adjust the import based on where your PricingPage is located
import HomePage from './components/Home';        // Your Home or Main Page
//import NotFoundPage from './components/NotFoundPage';  // Optional: For 404 page

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/pricing" element={<PricingPage />} /> 
        {/* <Route path="*" element={<NotFoundPage />} />  */}
      </Routes>
    </Router>
  </StrictMode>,
)
