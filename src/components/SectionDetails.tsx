import '../styles/SectionDetails.css';
import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaBriefcase, FaProjectDiagram, FaGraduationCap, FaFolder, FaTools, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Skills from './Skills';
import WorkExperience from './Experience';
import Projects from './Projects';
import Summary from './Summary';
import Education from './Education';

interface SectionDetailsProps {
    activeSection: any;
    setActiveSection: (section: any) => void;
}

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

export default function SectionDetails({ activeSection, setActiveSection }: SectionDetailsProps) {

    const [dragX, setDragX] = useState(0);

    const currentIndex = records.findIndex(r => r.id === activeSection);
    const hasLeft = currentIndex < records.length - 1;
    const hasRight = currentIndex > 0;

    const goLeft = () => {
        setActiveSection((prev: any) => {
            const index = records.findIndex((r) => r.id === prev);
            if (index >= records.length - 1) return prev; // stop at end
            return records[index + 1].id;
        });
    };

    const goRight = () => {
        setActiveSection((prev: any) => {
            const index = records.findIndex((r) => r.id === prev);
            if (index <= 0) return prev; // stop at start
            return records[index - 1].id;
        });

    };
    const handleDragEnd = (_: any, info: any) => {
        const threshold = 120;

        if (info.offset.x > threshold) goLeft();
        else if (info.offset.x < -threshold) goRight();

        setDragX(0);
    };

    return (
        <div className="section-container">

            {/* Folder Navigation */}
            <div className="folder-navigation">
                {records.map((record, index) => {
                    const isMobile = window.innerWidth < 768;
                    const isActive = record.id === activeSection;
                    const position = currentIndex - index;

                    const papers = [
                        { id: 1, top: isMobile ? 7.5 : 15, right: isMobile ? 0 : 5, width: isMobile ? 20 : 40, height: isMobile ? 30 : 60 },
                        { id: 2, top: isMobile ? 7.5 : 15, right: isMobile ? 15 : 25, width: isMobile ? 20 : 40, height: isMobile ? 30 : 60 },
                        { id: 3, top: isMobile ? 7.5 : 15, right: isMobile ? 30 : 45, width: isMobile ? 20 : 40, height: isMobile ? 30 : 60 }
                    ];

                    return (
                        <motion.div
                            key={record.id}
                            className="folder-item"
                            style={{ zIndex: isActive ? 10 : 5 - Math.abs(position) }}
                            animate={{
                                x: position * (isMobile ? 100 : 200),
                                y: isActive ? -10 : 10,
                                scale: isActive ? 1.2 : 0.8,
                                opacity: isActive ? 1 : 0.5
                            }}
                            drag={isActive ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDrag={(_e:any, info) => setDragX(info.offset.x)}
                            onDragEnd={handleDragEnd}
                            transition={{ type: "spring", stiffness: 80, damping: 14 }}
                        >

                            {/* Papers */}
                            {!isActive && papers.map((paper) => (
                                <motion.div
                                    key={paper.id}
                                    className="absolute bg-white shadow-lg rounded-t-lg z-[-1]"
                                    style={{
                                        top: `${paper.top}px`,
                                        right: `${paper.right}px`,
                                        width: `${paper.width}px`,
                                        height: `${paper.height}px`,
                                        border: `2px solid black`
                                    }}
                                />
                            ))}

                            {/* Folder Icon */}
                            <div className="folder-icon relative">
                                <FaFolder size={120} className="text-yellow-500 text-8xl drop-shadow-md" />
                                <div className="notification-dot text-gray-800">{record.icon}</div>

                                {isActive && (
                                    <>
                                        {/* LEFT (only if not first) */}
                                        {hasLeft && (
                                            <motion.div
                                                className="absolute left-[-45px] top-1/2 -translate-y-1/2 cursor-pointer group"
                                                animate={{ x: [-5, 0, -5] }}
                                                transition={{ repeat: Infinity, duration: 1.2 }}
                                                onClick={goLeft}
                                            >
                                                <FaArrowLeft
                                                    size={22}
                                                    style={{ opacity: dragX < 0 ? 1 : 0.6 }}
                                                />

                                                {/* <div className="absolute -top-8 left-1/2 -translate-x-1/2 
                    bg-black text-white text-xs px-2 py-1 rounded 
                    opacity-0 group-hover:opacity-100 transition">
                    Drag Folder
                </div> */}
                                            </motion.div>
                                        )}

                                        {/* RIGHT (only if not last) */}
                                        {hasRight && (
                                            <motion.div
                                                className="absolute right-[-45px] top-1/2 -translate-y-1/2 cursor-pointer group"
                                                animate={{ x: [5, 0, 5] }}
                                                transition={{ repeat: Infinity, duration: 1.2 }}
                                                onClick={goRight}
                                            >
                                                <FaArrowRight
                                                    size={22}
                                                    style={{ opacity: dragX > 0 ? 1 : 0.6 }}
                                                />

                                                {/* <div className="absolute -top-8 left-1/2 -translate-x-1/2 
                    bg-black text-white text-xs px-2 py-1 rounded 
                    opacity-0 group-hover:opacity-100 transition">
                    Drag Folder
                </div> */}
                                            </motion.div>
                                        )}
                                    </>
                                )}
                            </div>

                            <h2 className="folder-label">{record.title}</h2>
                        </motion.div>
                    );
                })}
            </div>

            {/* Title Card (UNCHANGED) */}
            <motion.div
                key={activeSection}
                className="title-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 60, damping: 12 }}
            >
                <motion.div
                    className="title-card-left"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {(() => {
                        const icons: any = {
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
                                        scaleX: [1, 1.1, 1],
                                        scaleY: [1, 0.8, 1],
                                        opacity: [0.25, 0.2, 0.25],
                                        y: [5, 0, 5],
                                    }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                />
                            </>
                        );
                    })()}
                </motion.div>

                <motion.div className="title-card-right">
                    <h2 className="text-xl font-bold mb-4">{sectionContent[activeSection]?.title}</h2>
                    <p className="text-md leading-relaxed">{sectionContent[activeSection]?.content}</p>
                </motion.div>
            </motion.div>

            {/* Content */}
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