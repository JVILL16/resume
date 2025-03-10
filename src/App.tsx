// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Home Page*/}
      <Home />

      {/* Footer */}
      <Footer />
    </>
  )
}

export default App
