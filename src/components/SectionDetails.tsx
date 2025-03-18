import '../styles/Home.css';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaBriefcase, FaProjectDiagram, FaGraduationCap, FaFolder, FaTools } from "react-icons/fa";
import Skills from './Skills';
import WorkExperience from './Experience';
import Projects from './Projects';
import Summary from './Summary';

const records = [
    { id: "education", title: "Education", icon: <FaGraduationCap size={25} /> },
    { id: "projects", title: "Projects", icon: <FaProjectDiagram size={25} /> },
    { id: "experience", title: "Experience", icon: <FaBriefcase size={25} /> },
    { id: "tools", title: "Skills", icon: <FaTools size={25} /> },
    { id: "summary", title: "About Me", icon: <FaUser size={25} /> }
];

const sectionContent : any = {
    summary: {
        title: "About Me",
        content: "As a Full Stack Developer, I have honed my ability to build scalable, maintainable, and efficient software solutions. My expertise spans both frontend and backend technologies, allowing me to create seamless user experiences and robust system architectures. I thrive on problem-solving, continuously seeking innovative approaches to tackle challenges, optimize performance, and enhance functionality. This section offers a high-level overview of my journey, highlighting my technical proficiency, adaptability, and passion for developing impactful solutions.",
        image: "/pfp-jheremi.png"
    },
    experience: {
        title: "Work Experience",
        content: "This section outlines my professional career, detailing the roles and responsibilities I have undertaken in various organizations. It highlights my contributions to software development projects, team collaborations, and the technologies I have leveraged to deliver high-quality solutions. Expect to see insights into my problem-solving approach, leadership experience, and how my work has driven efficiency and innovation in different industries.",
        image: "/images/experience.jpg"
    },
    education: {
        title: "Education",
        content: "My educational background forms the foundation of my technical knowledge and problem-solving abilities. With a strong focus on Computer Science, Software Engineering, and Cybersecurity, I have gained a deep understanding of algorithms, data structures, system design, and security principles. This section showcases the institutions I attended, the key subjects I mastered, and any relevant certifications or achievements that have contributed to my growth as a developer.",
        image: "/images/education.jpg"
    },
    projects: {
        title: "Projects",
        content: "A curated selection of projects that demonstrate my technical expertise, creativity, and problem-solving skills. This section includes professional work, freelance projects, and personal endeavors that showcase my ability to develop software applications across different domains. Each project description provides insights into the technologies used, challenges overcome, and the impact of the solution. Whether it's web applications, APIs, automation scripts, or data-driven platforms, this section highlights my hands-on experience and passion for building effective solutions.",
        image: "/images/projects.jpg"
    },
    tools: {
        title: "Skills & Tools",
        content: "An in-depth overview of the programming languages, frameworks, tools, and technologies I am proficient in. This section covers my expertise in frontend and backend development, databases, cloud platforms, DevOps tools, and other essential technologies. Additionally, it touches on my approach to continuous learning, staying updated with industry trends, and refining my skills to adapt to new challenges.",
        image: "/images/tools.jpg"
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
        <div className="w-full flex flex-col items-center">
            {/* Manila Folder Navigation */}
            <div className="relative flex flex-wrap justify-center w-full min-h-[200px]">
                {records.map((record, index) => {
                    const isActive = record.id === activeSection;
                    const position = records.findIndex((r) => r.id === activeSection) - index;
                    const papers = [
                        { id: 1, top: 15, right: 5, width: 40, height: 60, color: 'green' },
                        { id: 2, top: 15, right: 25, width: 40, height: 60, color: 'red'},
                        { id: 3, top: 15, right: 45, width: 40, height: 60, color: 'blue'}
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
                                <div className="notification-dot">{record.icon}</div>
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
                className="mt-10 flex flex-col md:flex-row w-[80vw] max-w-4xl min-h-[50vh] bg-gray-900 text-white rounded-lg shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 60, damping: 12 }}
            >
                {/* Left Side - Image */}
                <motion.div
                    className="w-full md:w-1/3 flex items-center justify-center bg-gray-800 p-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <img 
                        src={sectionContent[activeSection]?.image} 
                        alt={sectionContent[activeSection]?.title}
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </motion.div>

                {/* Right Side - Text Content */}
                <motion.div
                    className="w-full md:w-2/3 p-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h2 className="text-2xl font-bold mb-4">
                        {sectionContent[activeSection]?.title}
                    </h2>
                    <p className="text-lg leading-relaxed">
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
            </div>
        </div>
    );
}
