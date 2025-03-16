import '../styles/Home.css'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaBriefcase, FaProjectDiagram, FaGraduationCap, FaFolder, FaTools } from "react-icons/fa";

const records = [
    { id: "education", title: "Education", icon: <FaGraduationCap size={25} /> },
    { id: "projects", title: "Projects", icon: <FaProjectDiagram size={25} /> },
    { id: "experience", title: "Experience", icon: <FaBriefcase size={25} /> },
    { id: "tools", title: "Skills", icon: <FaTools size={25} /> },
    { id: "summary", title: "About Me", icon: <FaUser size={25} /> }
];
import Skills from './Skills';
import WorkExperience from './Experience';
import Projects from './Projects';
import Summary from './Summary';

export default function SectionDetails() {
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

            {/* Manila Folder Navigation */}
            <div className="relative flex flex-wrap justify-center w-full min-h-[400px]">
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
                                    content:
                                      "As a Full Stack Developer, I have honed my ability to build scalable, maintainable, and efficient software solutions. My expertise spans both frontend and backend technologies, allowing me to create seamless user experiences and robust system architectures. I thrive on problem-solving, continuously seeking innovative approaches to tackle challenges, optimize performance, and enhance functionality. This section offers a high-level overview of my journey, highlighting my technical proficiency, adaptability, and passion for developing impactful solutions.",
                                  },
                                  {
                                    id: "experience",
                                    content:
                                      "This section outlines my professional career, detailing the roles and responsibilities I have undertaken in various organizations. It highlights my contributions to software development projects, team collaborations, and the technologies I have leveraged to deliver high-quality solutions. Expect to see insights into my problem-solving approach, leadership experience, and how my work has driven efficiency and innovation in different industries.",
                                  },
                                  {
                                    id: "education",
                                    content:
                                      "My educational background forms the foundation of my technical knowledge and problem-solving abilities. With a strong focus on Computer Science, Software Engineering, and Cybersecurity, I have gained a deep understanding of algorithms, data structures, system design, and security principles. This section showcases the institutions I attended, the key subjects I mastered, and any relevant certifications or achievements that have contributed to my growth as a developer.",
                                  },
                                  {
                                    id: "projects",
                                    content:
                                      "A curated selection of projects that demonstrate my technical expertise, creativity, and problem-solving skills. This section includes professional work, freelance projects, and personal endeavors that showcase my ability to develop software applications across different domains. Each project description provides insights into the technologies used, challenges overcome, and the impact of the solution. Whether it's web applications, APIs, automation scripts, or data-driven platforms, this section highlights my hands-on experience and passion for building effective solutions.",
                                  },
                                  {
                                    id: "tools",
                                    content:
                                      "An in-depth overview of the programming languages, frameworks, tools, and technologies I am proficient in. This section covers my expertise in frontend and backend development, databases, cloud platforms, DevOps tools, and other essential technologies. Additionally, it touches on my approach to continuous learning, staying updated with industry trends, and refining my skills to adapt to new challenges.",
                                  }
                            ]
                        }
                    ];


                    return (
                        <motion.div
                            key={record.id}
                            className="absolute flex flex-col items-center justify-center cursor-grab "
                            style={{
                                transformOrigin: "center",
                                zIndex: isActive ? 10 : 5 - Math.abs(position),
                            }}
                            animate={{
                                x: position * (window.innerWidth < 768 ? 100 : 200), // Controls horizontal spacing
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

                            {/* Papers will animate and move smoothly into view for the resume site */}
                            {isActive && papers.slice(2, 3).map((paper) => (
                                <motion.div
                                    key={`paper-${paper.id}`}
                                    className="absolute shadow-lg z-[2] p-1 rounded-lg"
                                    style={{
                                        top: "50%", // Start centered vertically
                                        left: "50%", // Start centered horizontally
                                        transform: "translate(-50%, 100%)", // Ensure full center alignment
                                        width: `${paper.width}px`, // Start with the paper's original width
                                        minHeight: `${paper.height}px`, // Ensures smooth expansion
                                        maxHeight: "75vh", // Prevents overflow
                                        backgroundColor: "#ffffff", // Starts as white
                                        boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)", // Softer shadow for professional look
                                    }}
                                    animate={{
                                        scale: animationComplete ? 1 : 0.95, // Subtle zoom-in effect
                                        opacity: 1, // Fade in smoothly
                                        y: animationComplete ? 100 : 0, // Move down by 100px after expanding
                                        width: animationComplete ? "40vw" : `${paper.width}px`, // Expand width but keep it within site bounds
                                        maxHeight: animationComplete ? "60vh" : `${paper.height}px`, // Auto height after expanding
                                        left: animationComplete ? "50%" : "50%", // Keep it centered after expanding
                                        transform: animationComplete ? "translate(-50%, 80%)" : "translate(-50%, 200%)", // Ensure full center alignment
                                        backgroundColor: animationComplete ? "#1f2937" : "#ffffff", // Transition from white to gray
                                    }}
                                    initial={{
                                        scale: 0.8, // Start slightly scaled down
                                        opacity: 0, // Start fully transparent
                                        y: 0, // Start at the center vertically
                                        backgroundColor: "#ffffff", // Starts white
                                        boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)", // Start with a soft shadow
                                    }}
                                    transition={{
                                        scale: { type: "spring", stiffness: 50, damping: 25, duration: 0.6 }, // Smooth zoom-in effect
                                        opacity: { duration: 0.5 }, // Fade in
                                        y: { type: "spring", stiffness: 70, damping: 25, duration: 0.8 }, // Smooth vertical movement down
                                        width: { duration: 0.6 }, // Smooth width transition
                                        height: { duration: 0.6 }, // Smooth height transition
                                        left: { duration: 0.6 }, // Keep it centered
                                        backgroundColor: { duration: 1.5 }, // Smooth transition from white to gray
                                    }}
                                    onAnimationComplete={handleAnimationComplete} // Trigger content animation after paper animation completes
                                >
                                    {/* Content inside the paper */}
                                    {showContent && animationComplete && (
                                        <motion.div
                                            className="p-5"
                                            initial={{ opacity: 0 }} // Start with opacity 0 (hidden)
                                            animate={{ opacity: 1 }} // Fade in to opacity 1
                                            transition={{ duration: 0.7, delay: 0.4 }} // Fade in sections with a delay for smooth appearance
                                        >
                                            {paper.data
                                                .filter((section) => section.id === activeSection) // Filter the data by active section
                                                .map((section) => (
                                                    <div className="text-sm text-white font-semibold" key={section.id}>
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
            <div className="mt-10 w-screen max-w-full flex justify-center mb-5 px-4">
                {activeSection === 'summary' && (
                    <Summary />
                )}
                {activeSection === 'tools' && (
                    <Skills />
                )}
                {activeSection === 'experience' && (
                    <WorkExperience />
                )}
                {activeSection === 'projects' && (
                    <Projects />
                )}
            </div>

        </>
    );
}
