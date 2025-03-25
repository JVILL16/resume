import '../styles/SectionDetails.css';
import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaBriefcase, FaProjectDiagram, FaGraduationCap, FaFolder, FaTools } from "react-icons/fa";
import Skills from './Skills';
import WorkExperience from './Experience';
import Projects from './Projects';
import Summary from './Summary';
import Education from './Education';

const records = [
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

    return (
        <div className="section-container">
            {/* Folder Navigation */}
            <div className="folder-navigation">
                {records.map((record, index) => {
                    const isActive = record.id === activeSection;
                    const position = records.findIndex((r) => r.id === activeSection) - index;
                    const papers = [
                        { id: 1, top: 15, right: 5, width: 40, height: 60, color: 'green' },
                        { id: 2, top: 15, right: 25, width: 40, height: 60, color: 'red' },
                        { id: 3, top: 15, right: 45, width: 40, height: 60, color: 'blue' }
                    ];
                    return (
                        <motion.div
                            key={record.id}
                            className="folder-item"
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
                            <div className="folder-icon">
                                <FaFolder size={120} className="text-yellow-500 text-8xl drop-shadow-md" />
                                <div className="notification-dot text-gray-800">{record.icon}</div>
                            </div>
                            {/* Folder Label */}
                            <h2 className="folder-label">{record.title}</h2>
                        </motion.div>
                    );
                })}
            </div>

            {/* Title Card */}
            <motion.div
                key={activeSection}
                className="title-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 60, damping: 12 }}
            >
                {/* Left Side - Icon */}
                <motion.div
                    className="title-card-left"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {(() => {
                        const icons:any = {
                            tools: FaTools,
                            summary: FaUser,
                            experience: FaBriefcase,
                            projects: FaProjectDiagram,
                            education: FaGraduationCap
                        };
                        const Icon = icons[activeSection];
                        return (
                            <>
                                <motion.div
                                    animate={{ y: [0, -12, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                    className="icon-animation"
                                >
                                    <Icon size={75} className="text-gray-800 drop-shadow-md" />
                                </motion.div>
                                <motion.div
                                    className="shadow-animation"
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
                <motion.div className="title-card-right">
                    <h2 className="text-xl font-bold mb-4">{sectionContent[activeSection]?.title}</h2>
                    <p className="text-md leading-relaxed">{sectionContent[activeSection]?.content}</p>
                </motion.div>
            </motion.div>

            {/* Content Section */}
            <div className="content-container">
                {activeSection === 'summary' && <Summary />}
                {activeSection === 'tools' && <Skills />}
                {activeSection === 'experience' && <WorkExperience />}
                {activeSection === 'projects' && <Projects />}
                {activeSection === 'education' && <Education />}
            </div>
        </div>
    );
}
