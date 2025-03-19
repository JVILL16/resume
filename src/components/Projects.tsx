import { useState } from "react";
import { motion } from "framer-motion";

const projects: any  = {
  Professional: [
    {
      title: "Unity",
      description: "Project management tool for tracking client data, tickets, projects, meetings, and tasks.",
      type: "Frontend",
    },
    {
      title: "Feedback Center",
      description: "Full CRUD feedback system for web projects, with admin request tracking and status checks.",
      type: "Full Stack",
    },
    {
      title: "API Middleware",
      description: "Secure middleware for data exchange between toll-related client systems.",
      type: "Backend",
    },
    {
      title: "Standard Client Report",
      description: "Rebuilt site handling client data, charts, PDFs, and automated monthly reports via SFTP.",
      type: "Full Stack",
    },
    {
      title: "Unattended Load",
      description: "UI-enhanced file upload validation module for SOLO project.",
      type: "Frontend",
    },
    {
      title: "Payment Validation API",
      description: "Secure API for verifying vendor payments using internal and external authentication.",
      type: "Backend",
    },
    {
      title: "Production Website",
      description: "Analytics dashboard for contract managers, segregated by client logins.",
      type: "Full Stack",
    },
    {
      title: "XML Conversion API",
      description: "Automated client XML payment/placement processing for transactions and adjustments.",
      type: "Backend",
    },
    {
      title: "Document Storage",
      description: "Led vision and wireframing for file storage, enabling client downloads and previews.",
      type: "UI/UX",
    },
    {
      title: "Lacrosse League Site",
      description: "Managed budgeting, wireframing, and web-scraping for tracking team stats, sign-ups, tournaments.",
      type: "UI/UX",
    },
  ],
  Independent: [
    {
      title: "SagePaths",
      description: "Sandbox for using what I learned / test, web scraping, Google Sheets API, automation, and basic auth.",
    },
    {
      title: "WebSockets",
      description: "Implemented real-time communication for live data updates.",
    },
    {
      title: "Auto Unit Testing",
      description: "Built Selenium, Cucumber, and Postman test automation for regression and E2E testing.",
    },
    {
      title: "BP3 Auto",
      description: "Assisted in workflow automation and process optimization.",
    },
    {
      title: "Contract-Manager Site",
      description: "Developed features for legal contract management, ensuring compliance and security.",
    },
  ],
};

const techStack = [
  ".NET", "Angular", "React", "C#", "SSMS", "IIS", "Python",
  "Selenium", "Node.js", "PHP", "VBA", "Postman", "XML"
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("Professional");

  return (
    <div className="py-14 px-8 bg-gray-900 text-white rounded-xl">
      <h1 className="text-4xl text-center font-extrabold text-white mb-15 tracking-wide">Where Vision Meets Execution</h1>

      {/* Tabs for Professional / Independent Projects */}
      <div className="flex justify-center gap-6 mb-8">
        {Object.keys(projects).map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-6 py-2 rounded-md text-lg font-semibold transition-all ${
              activeTab === category
                ? "bg-blue-500 shadow-lg shadow-blue-500/50"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Animated Project Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {projects[activeTab].map((project: any, index: any) => (
          <motion.div
            key={index}
            className="relative bg-gray-800 p-6 rounded-lg w-96 shadow-lg border border-transparent cursor-pointer
                      hover:border-blue-400 transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.6)",
            }}
            viewport={{ once: true }}
          >
            {/* Glowing border animation */}
            <motion.div
              className="absolute inset-0 rounded-lg border border-blue-500 opacity-0"
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            ></motion.div>

            <h3 className="text-xl font-semibold">{project.title}</h3>
            {project.type && (
              <p className="text-blue-300">{project.type}</p>
            )}
            <p className="text-gray-400 text-sm mt-2">{project.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Tech Stack Section */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech, index) => (
            <motion.span
              key={index}
              className="px-4 py-2 bg-gray-700 rounded-md text-sm font-semibold transition-all
                          hover:bg-blue-500 hover:shadow-md"
              whileHover={{ scale: 1.1 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
