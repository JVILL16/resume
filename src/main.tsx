import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="grid grid-cols-[300px_1fr] flex-grow h-full">
        <Sidebar />
        <div className="flex flex-col w-full h-full">
          <App />
        </div>
      </div>

      <Footer />
    </div>


  </StrictMode>,
)
