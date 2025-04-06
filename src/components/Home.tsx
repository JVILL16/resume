import '../styles/Home.css'
import Feedback from "./Feedback";
import { useNavigate } from 'react-router-dom';
import SectionDetails from './SectionDetails';

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

import PricingPage from './PricingPage';


export default function Home() {

  const count = useMotionValue(0)
  const rounded = useTransform(() => Math.round(count.get()))

  //const navigate = useNavigate();


  const [activeSection, setActiveSection] = useState("summary");

  useEffect(() => {
    const controls = animate(count, 100, { duration: 5 })
    return () => controls.stop()
  }, [])

  const handleProjectClick = () => {
    setActiveSection("projects");
  };
  // const handleExperienceClick = () => {
  //   setActiveSection("experience");
  // };

  const handleNavigate = () => {
    //navigate('/pricing', );  // This will navigate to the /pricing page
    window.open('/pricing', '_blank');
  };

  return (
    <>
      <div className="container">



        {/* Home Section with Background Image */}
        <section className="home-section">
          {/* Overlay for readability */}
          <div className="home-overlay"></div>

          {/* Content */}
          <div className="home-content">
            <h1 className="home-heading">Discover My Amazing Work!</h1>
            <p className="home-paragraph">Take a deep dive into my website, explore some 
              projects I worked on, and experiences I have endure.</p>
            <button className="home-button" onClick={handleProjectClick}>
              My Portfolio
            </button>
            {/* <button className="ml-2 home-button" onClick={handleExperienceClick}>
              My Journey
            </button> */}
            <button className="ml-2 home-button" onClick={handleNavigate}>
              My Pricing
            </button>
          </div>

          {/* Image Placeholder */}
          <img
            src="/profile-banner.png"
            className="home-image"
            alt="Profile Banner"
          />
        </section>



        <SectionDetails activeSection={activeSection} setActiveSection={setActiveSection}  />

        <Feedback />
      
      
      
      </div>
    </>
  );
}
