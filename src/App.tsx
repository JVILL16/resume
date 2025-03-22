// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/Footer';
import Home from "./components/Home";
import Sidebar from './components/Sidebar';
import { useEffect, useState } from "react"

const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-900 text-white">
    {/* ✅ Bouncing Container with Shadow Underneath */}
    <div className="relative mb-6 animate-bounce">
      <div className="w-48 h-48 bg-gray-800 rounded-full flex items-center justify-center shadow-2xl">
        {/* ✅ Image */}
        <img 
          src="/bh_icon.png" 
          alt="Loading..." 
          className="w-32 h-32" 
        />
      </div>
    </div>

    {/* ✅ Loading Text */}
    <p className="text-lg font-semibold animate-bounce">Preparing Awesomeness...</p>
  </div>
);




function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (API calls, assets, etc.)
    const timeout = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="ml-[300px] flex-1 h-screen overflow-y-auto p-6">
        <Home />
        <Footer />
      </div>
    </div>
  );
}

export default App
