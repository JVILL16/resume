import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <div className="flex min-h-screen bg-gray-900 text-white">
  <Sidebar />
  <div className="ml-[300px] flex-1 h-screen overflow-y-auto p-6">
    <App />
    <Footer />
  </div>
</div>


  </StrictMode>,
)
