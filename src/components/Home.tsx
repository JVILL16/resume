import '../styles/Home.css'
import Feedback from "./Feedback";

import SectionDetails from './SectionDetails';

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function Home() {

  const count = useMotionValue(0)
  const rounded = useTransform(() => Math.round(count.get()))

  useEffect(() => {
    const controls = animate(count, 100, { duration: 5 })
    return () => controls.stop()
  }, [])


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
            <p className="home-paragraph">I build web & mobile applications.</p>
            <button className="home-button">
              Explore Now
            </button>
          </div>

          {/* Image Placeholder */}
          <img
            src="/profile-banner.png"
            className="home-image"
            alt="Profile Banner"
          />
        </section>



        <SectionDetails />

        <Feedback />
      
      
      
      </div>
    </>
  );
}
