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
      <div className="w-64 h-64 bg-gray-800 rounded-full flex items-center justify-center shadow-2xl">
        {/* ✅ Image */}
        <img 
          src="/bh_icon.png" 
          alt="Loading..." 
          className="w-50 h-50" 
        />
      </div>
    </div>

    {/* ✅ Loading Text with Animated Ellipses */}
    <p className="text-xl title font-semibold animate-fade-in animate-delay-200">
      Incoming Resume
      <span className="animate-ellipsis">.</span>
      <span className="animate-ellipsis-delay-100">.</span>
      <span className="animate-ellipsis-delay-200">.</span>
    </p>
    {/* ✅ Loading Bar */}
    {/* <div className="w-72 h-2 bg-gray-700 rounded-full mt-4">
      <div
        className="h-full bg-blue-500 animate-loading"
        style={{ width: '0%' }}
      ></div>
    </div> */}
  </div>
);

{/**
  
  sm (Small): For screens >= 640px

  md (Medium): For screens >= 768px

  lg (Large): For screens >= 1024px

  xl (Extra Large): For screens >= 1280px

  2xl (2x Extra Large): For screens >= 1536px
  
*/}


function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (API calls, assets, etc.)
    const timeout = setTimeout(() => setIsLoading(false), 5000);

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
