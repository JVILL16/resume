import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sidebar />
    <App />
    <Footer />
  </StrictMode>,
)
