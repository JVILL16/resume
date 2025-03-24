import '../styles/Home.css';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaBriefcase, FaProjectDiagram, FaGraduationCap, FaFolder, FaTools } from "react-icons/fa";
import Skills from './Skills';
import WorkExperience from './Experience';
import Projects from './Projects';
import Summary from './Summary';
import Education from './Education';

const records: any = [
    { id: "education", title: "Education", icon: <FaGraduationCap size={25} /> },
    { id: "projects", title: "Projects", icon: <FaProjectDiagram size={25} /> },
    { id: "experience", title: "Experience", icon: <FaBriefcase size={25} /> },
    { id: "tools", title: "Skills", icon: <FaTools size={25} /> },
    { id: "summary", title: "About Me", icon: <FaUser size={25} /> }
];

const sectionContent: any = {
    summary: {
        title: "Introduction: About Me & Q&A",
        content: "As a Full Stack Developer, I have honed my ability to build scalable, maintainable, and efficient software solutions. My expertise spans both frontend and backend technologies, allowing me to create seamless user experiences and robust system architectures. I thrive on problem-solving, continuously seeking innovative approaches to tackle challenges, optimize performance, and enhance functionality."
    },
    experience: {
        title: "Professional Experience: Roles & Responsibilities",
        content: "This section outlines my professional career and other job titles, detailing the roles and responsibilities I have undertaken in various organizations. It highlights my contributions to software development projects, team collaborations, and the technologies I have leveraged to deliver high-quality solutions. "
    },
    education: {
        title: "Academic Background: Education & Learning Journey",
        content:
            <>
                With a strong focus on Computer Science, Software Engineering, and Cybersecurity,
                I have gained a deep understanding of algorithms, data structures, system design,
                security principles, and other topics I endured attending at the{' '}
                <span style={{ color: 'orange' }}>University of Texas at San Antonio</span>.
            </>
    },
    projects: {
        title: "Portfolio: Projects & Case Studies",
        content: "This section includes professional and personal work that showcases my technical expertise, creativity, problem-solving skills, and my ability to develop software applications across different domains. Each project description provides insights into the technologies used, challenges overcome, and the impact of the solution. "
    },
    tools: {
        title: "Skills: Tools & Tech Stack",
        content: "Take a look at my expertise in frontend and backend development, databases, cloud platforms, DevOps tools, and other essential technologies! Additionally, it touches on my continuous learning, staying updated with industry trends, and refining my skills to adapt to new challenges."
    }
};

export default function SectionDetails() {
    const [activeSection, setActiveSection] = useState("summary");

    const handleDragEnd = (_: any, info: any) => {
        const threshold = 120;
        if (info.offset.x > threshold) {
            setActiveSection((prev) => {
                const currentIndex = records.findIndex((r: any) => r.id === prev);
                return records[(currentIndex + 1) % records.length].id;
            });
        } else if (info.offset.x < -threshold) {
            setActiveSection((prev) => {
                const currentIndex = records.findIndex((r: any) => r.id === prev);
                return records[(currentIndex - 1 + records.length) % records.length].id;
            });
        }
    };

    return (
        <div className="w-full flex my-20  flex-col items-center">
            {/* Manila Folder Navigation */}
            <div className="relative flex flex-wrap justify-center w-full min-h-[200px]">
                {records.map((record: any, index: any) => {
                    const isActive = record.id === activeSection;
                    const position = records.findIndex((r: any) => r.id === activeSection) - index;
                    const papers = [
                        { id: 1, top: 15, right: 5, width: 40, height: 60, color: 'green' },
                        { id: 2, top: 15, right: 25, width: 40, height: 60, color: 'red' },
                        { id: 3, top: 15, right: 45, width: 40, height: 60, color: 'blue' }
                    ];
                    return (
                        <motion.div
                            key={record.id}
                            className="absolute flex flex-col items-center cursor-grab"
                            style={{ zIndex: isActive ? 10 : 5 - Math.abs(position) }}
                            animate={{
                                x: position * (window.innerWidth < 768 ? 100 : 200),
                                y: isActive ? -10 : 10,
                                scale: isActive ? 1.2 : 0.8,
                                opacity: isActive ? 1 : 0.5
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

                            {/* Folder Icon */}
                            <div className="icon-container relative z-10">
                                <FaFolder size={120} className="text-yellow-500 text-8xl drop-shadow-md" />
                                <div className="notification-dot text-gray-800">{record.icon}</div>
                            </div>

                            {/* Folder Label */}
                            <h2 className="text-md font-bold mt-2">{record.title}</h2>
                        </motion.div>
                    );
                })}
            </div>
            {/* Title Card Section Directly Under Folders */}
            <motion.div
                key={activeSection}
                className="mt-10 flex flex-col md:flex-row w-[80vw] max-w-4xl min-h-[30vh] bg-gray-900 text-white rounded-lg shadow-2xl overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 60, damping: 12 }}
            >
                {/* Left Side - Image/Icon */}
                <motion.div
                    className="w-full md:w-1/3 flex flex-col items-center justify-center bg-yellow-500 p-3 relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {(() => {
                        let Icon;
                        switch (activeSection) {
                            case 'tools':
                                Icon = FaTools;
                                break;
                            case 'summary':
                                Icon = FaUser;
                                break;
                            case 'experience':
                                Icon = FaBriefcase;
                                break;
                            case 'projects':
                                Icon = FaProjectDiagram;
                                break;
                            case 'education':
                                Icon = FaGraduationCap;
                                break;
                            default:
                                return null;
                        }
                        return (
                            <>
                                {/* Floating Icon */}
                                <motion.div
                                    animate={{ y: [0, -12, 0] }} // Floating up & down
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                    className="relative z-10"
                                >
                                    <Icon size={75} className="text-gray-800 drop-shadow-md" />
                                </motion.div>

                                {/* Floating Shadow (In Sync) */}
                                <motion.div
                                    className="absolute bottom-2 w-24 h-4 bg-black opacity-25"
                                    style={{ borderRadius: "50% 40%" }} // Slightly squashed oval shape
                                    animate={{
                                        scaleX: [1, 1.1, 1], // Expands horizontally as icon moves down
                                        scaleY: [1, 0.8, 1], // Compresses vertically as icon moves up
                                        opacity: [0.25, 0.2, 0.25], // Slight fade effect
                                        y: [5, 0, 5], // Moves down when icon moves up
                                    }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                />
                            </>
                        );
                    })()}
                </motion.div>

                {/* Right Side - Text Content */}
                <motion.div
                    className="w-full md:w-2/3 p-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h2 className="text-xl font-bold mb-4">
                        {sectionContent[activeSection]?.title}
                    </h2>
                    <p className="text-md leading-relaxed">
                        {sectionContent[activeSection]?.content}
                    </p>
                </motion.div>
            </motion.div>




            {/* 🟢 Keeps the components (Summary, Skills, Experience, Projects) below the title card */}
            <div className="mt-10 w-screen max-w-full flex justify-center mb-5 px-4">
                {activeSection === 'summary' && <Summary />}
                {activeSection === 'tools' && <Skills />}
                {activeSection === 'experience' && <WorkExperience />}
                {activeSection === 'projects' && <Projects />}
                {activeSection === 'education' && <Education />}
            </div>
        </div>
    );
}
