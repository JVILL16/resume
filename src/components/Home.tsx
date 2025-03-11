import '../styles/Home.css'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaBriefcase, FaProjectDiagram, FaGraduationCap, FaFolder, FaTools } from "react-icons/fa";
import Feedback from "./Feedback";
import Skills from './Skills';
import WorkExperience from './Experience';
import Projects from './Projects';

const records = [
  { id: "education", title: "Education", icon: <FaGraduationCap size={25} /> },
  { id: "projects", title: "Projects", icon: <FaProjectDiagram size={25} /> },
  { id: "experience", title: "Experience", icon: <FaBriefcase size={25} /> },
  { id: "tools", title: "Skills", icon: <FaTools size={25} /> },
  { id: "summary", title: "About Me", icon: <FaUser size={25} /> }
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("summary");
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showContent, setShowContent] = useState(false); // New state to control content visibility

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 120;

    if (info.offset.x > threshold) {
      setActiveSection((prev) => {
        const currentIndex = records.findIndex((r) => r.id === prev);
        return records[(currentIndex + 1) % records.length].id;
      });
    } else if (info.offset.x < -threshold) {
      setActiveSection((prev) => {
        const currentIndex = records.findIndex((r) => r.id === prev);
        return records[(currentIndex - 1 + records.length) % records.length].id;
      });
    }
  };

  useEffect(() => {
    setAnimationComplete(false);
    setShowContent(false);
  }, [activeSection]);

  // Reset content visibility when animation is completed
  const handleAnimationComplete = () => {
    setAnimationComplete(true);
    setTimeout(() => {
      setShowContent(true); // Show content after a delay (when expansion is complete)
    }, 600); // 600ms delay (matches the animation duration)
  };

  return (
    <>
      <div className="flex flex-col items-center text-white overflow-hidden w-full min-h-screen">





        {/* Manila Folder Navigation */}
        <div className="relative flex items-center justify-center w-full h-[300px] mt-10 overflow-visible">
          {records.map((record, index) => {
            const isActive = record.id === activeSection;
            const position = records.findIndex((r) => r.id === activeSection) - index;
            const papers = [
              { id: 1, top: 15, right: 5, width: 40, height: 60, color: 'green', data: [] },
              { id: 2, top: 15, right: 25, width: 40, height: 60, color: 'red', data: [] },
              {
                id: 3, top: 15, right: 45, width: 40, height: 60, color: 'blue',
                data: [
                  {
                    id: "summary",
                    title: "Summary",
                    content: "A brief introduction to my experience as a Full Stack Developer, highlighting my problem-solving skills, technical expertise, and passion for building efficient solutions."
                  },
                  {
                    id: "experience",
                    title: "Experience",
                    content: "A showcase of my professional journey, detailing my roles, responsibilities, and contributions to various companies and projects."
                  },
                  {
                    id: "education",
                    title: "Education",
                    content: "My academic background in Computer Science, with a focus on Software Engineering and Cybersecurity."
                  },
                  {
                    id: "projects",
                    title: "Projects",
                    content: "A selection of professional and independent projects demonstrating my ability to build and improve software applications across different domains."
                  },
                  {
                    id: "tools",
                    title: "Skills",
                    content: "An overview of the programming languages, frameworks, databases, and tools I use to develop, optimize, and maintain software solutions."
                  }
                ]
              }
            ];


            return (
              <motion.div
                key={record.id}
                className="absolute flex flex-col items-center justify-center cursor-grab"
                style={{
                  transformOrigin: "center",
                  zIndex: isActive ? 10 : 5 - Math.abs(position),
                }}
                animate={{
                  x: position * 200, // Controls horizontal spacing
                  y: isActive ? -10 : 10, // Slight vertical offset for effect
                  scale: isActive ? 1.2 : 0.8,
                  opacity: isActive ? 1 : 0.5,
                }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                transition={{ type: "spring", stiffness: 80, damping: 14 }}
              >
                {/* Multiple Papers Behind Non-Active Folders */}
                {!isActive && papers.map((paper) => (
                  <motion.div
                    key={paper.id}
                    className="absolute bg-white shadow-lg rounded-t-lg z-[-1]"
                    style={{
                      top: `${paper.top}px`, // Adds vertical offset between papers to space them evenly
                      right: `${paper.right}px`,
                      width: `${paper.width}px`,
                      height: `${paper.height}px`,
                      border: `2px solid black`
                    }}
                    animate={{
                      y: isActive ? 50 : 0, // Adjusts the paper's vertical position based on folder's position
                      opacity: isActive ? 0 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 60, damping: 12 }}
                  />
                ))}
                
                {/* Papers will animate and move out of the folder to the bottom */}
                {isActive && papers.slice(2, 3).map((paper) => (  // Use slice(0, 1) to only render one paper
                  <motion.div
                    key={`paper-${paper.id}`}
                    className="absolute shadow-lg rounded-t-lg z-[-1]"
                    style={{
                      top: `${paper.top}px`, // Initial top position of paper
                      right: `${paper.right}px`, // Same right position for all
                      width: `${paper.width}px`,
                      height: `${paper.height}px`,
                      border: `2px solid white`, // Border color
                      backgroundColor: "black",
                      boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)"
                    }}
                    animate={{
                      scale: animationComplete ? 1 : 2, // Expand after initial animation
                      opacity: 1, // Fade in to full opacity
                      y: 200, // Move to final vertical position
                      width: animationComplete ? "1000px" : `${paper.width}px`, // Expand width after completion
                      height: animationComplete ? "200px" : `${paper.height}px`, // Expand height after completion
                      //top: animationComplete ? `${paper.top*5}px`: `${paper.top*5}px`,
                      right: animationComplete ? "-450px" : `${paper.right}px`
                    }}
                    initial={{
                      scale: 0, // Start small
                      boxShadow: "0 0 5px rgba(255, 255, 255, 0.5)"
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 60,
                      damping: 20,
                      duration: animationComplete ? 0.6 : 0.3, // Use a shorter duration for the final expansion
                    }}
                    onAnimationComplete={handleAnimationComplete} // Trigger content animation after paper animation completes
                  >
                    
                    {/* Content inside the paper */}
                    {showContent && animationComplete && (
                      
                      <motion.div
                        className="p-5"
                        initial={{ opacity: 0 }} // Start with opacity 0 (hidden)
                        animate={{ opacity: 1 }} // Fade in to opacity 1
                        transition={{ duration: 5 }} // Adjust the duration of the fade-in as needed
                      >
                        {paper.data
                          .filter((section) => section.id === activeSection) // Filter the data by active section
                          .map((section) => (
                            <div className="text-lg text-white font-bold" key={section.title}>
                              <h2>{section.title}</h2>
                              <p>{section.content}</p>
                            </div>
                          ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                {/* SVG Folder Icon */}
                <div className="icon-container relative z-10">
                  <FaFolder size={120} className="text-yellow-500 text-8xl drop-shadow-md" />
                  <div className="notification-dot">
                    {record.icon}
                  </div>
                </div>

                {/* Folder Label */}
                <h2 className="text-md font-bold mt-2">{record.title}</h2>


              </motion.div>
            );
          })}
        </div>
        

      </div>

          {activeSection === 'tools' && (
            <div className="mt-10 w-full flex justify-center">
                <Skills />
            </div>
          )}
          
          {activeSection === 'experience' && (
            <div className="mt-10 w-full flex justify-center">
                <WorkExperience />
            </div>
          )}

{activeSection === 'projects' && (
            <div className="mt-10 w-full flex justify-center">
                <Projects />
            </div>
          )}

      {/* Floating Feedback Form - Position it below content */}
      <div className="mt-10 w-full flex justify-center">
        <Feedback /> {/* Feedback form below main content */}
      </div>
    </>
  );
}
