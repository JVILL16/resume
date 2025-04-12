import { useState } from "react";
import { motion } from "framer-motion";
import '../styles/Projects.css'
import {
  PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
  Label,
  LabelList
} from 'recharts';

const projects: any = {
  Professional: [
    {
      title: "Unity",
      description: "Project management tool for tracking client data, tickets, projects, meetings, and tasks.",
      type: "Frontend",
      taskDistribution: [
        { name: 'Coding', value: 55 },
        { name: 'Debugging', value: 10 },
        { name: 'Testing', value: 35 },
      ],
      time: "120 hours"
    },
    {
      title: "Feedback Center",
      description: "Full CRUD feedback system for web projects, with admin request tracking and status checks.",
      type: "Full Stack",
      taskDistribution: [
        { name: 'Frontend', value: 45 },
        { name: 'Backend', value: 45 },
        { name: 'Database', value: 10 },
      ],
      time: "50 hours"
    },
    {
      title: "API Middleware",
      description: "Secure middleware for data exchange between toll-related client systems.",
      type: "Backend",
      taskDistribution: [
        { name: 'Coding', value: 60 },
        { name: 'Optimization', value: 25 },
        { name: 'Testing', value: 15 },
      ],
      time: "120 hours"
    },
    {
      title: "Standard Client Report",
      description: "Rebuilt site handling client data, charts, PDFs, and automated monthly reports via SFTP.",
      type: "Full Stack",
      taskDistribution: [
        { name: 'Frontend', value: 45 },
        { name: 'Backend', value: 45 },
        { name: 'Database', value: 10 },
      ],
      time: "50 hours"
    },
    {
      title: "Unattended Load",
      description: "UI-enhanced file upload validation module for SOLO project.",
      type: "Frontend",
      taskDistribution: [
        { name: 'Coding', value: 55 },
        { name: 'Debugging', value: 25 },
        { name: 'Testing', value: 20 },
      ],
      time: "120 hours"
    },
    {
      title: "Payment Validation API",
      description: "Secure API for verifying vendor payments using internal and external authentication.",
      type: "Backend",
      taskDistribution: [
        { name: 'Coding', value: 30 },
        { name: 'Optimization', value: 50 },
        { name: 'Testing', value: 20 },
      ],
      time: "120 hours"
    },
    {
      title: "Production Website",
      description: "Analytics dashboard for contract managers, segregated by client logins.",
      type: "Full Stack",
      taskDistribution: [
        { name: 'Frontend', value: 60 },
        { name: 'Backend', value: 30 },
        { name: 'Database', value: 10 },
      ],
      time: "50 hours"
    },
    {
      title: "XML Conversion API",
      description: "Automated client XML payment/placement processing for transactions and adjustments.",
      type: "Backend",
      taskDistribution: [
        { name: 'Coding', value: 45 },
        { name: 'Optimization', value: 15 },
        { name: 'Testing', value: 45 },
      ],
      time: "120 hours"
    },
    {
      title: "Document Storage",
      description: "Led vision and wireframing for file storage, enabling client downloads and previews.",
      type: "UI/UX",
      taskDistribution: [
        { name: 'Wireframing', value: 40 },
        { name: 'User Testing', value: 30 },
        { name: 'Styling', value: 30 },
      ],
      time: "120 hours"
    },
    {
      title: "Lacrosse League Site",
      description: "Managed budgeting, wireframing, and web-scraping for tracking team stats, sign-ups, tournaments.",
      type: "UI/UX",
      taskDistribution: [
        { name: 'Wireframing', value: 30 },
        { name: 'User Testing', value: 40 },
        { name: 'Styling', value: 30 },
      ],
      time: 120
    },
  ],
  Independent: [
    {
      title: "SagePaths",
      description: "Sandbox for using what I learned / test, web scraping, Google Sheets API, automation, and basic auth.",
      type: "Full Stack",
      taskDistribution: [
        { name: 'Frontend', value: 36 },
        { name: 'Backend', value: 34 },
        { name: 'Database', value: 30 },
      ],
      time: "50 hours"
    },
    {
      title: "WebSockets",
      description: "Implemented real-time communication for live data updates.",
      type: "Full Stack",
      taskDistribution: [
        { name: 'Frontend', value: 30 },
        { name: 'Backend', value: 65 },
        { name: 'Database', value: 5 },
      ],
      time: "50 hours"
    },
    {
      title: "Auto Unit Testing",
      description: "Built Selenium, Cucumber, and Postman test automation for regression and E2E testing.",
      type: "Full Stack",
      taskDistribution: [
        { name: 'Frontend', value: 25 },
        { name: 'Backend', value: 70 },
        { name: 'Database', value: 5 },
      ],
      time: "50 hours"
    },
    {
      title: "BP3 Auto",
      description: "Assisted in workflow automation and process optimization.",
      type: "Full Stack",
      taskDistribution: [
        { name: 'Frontend', value: 20 },
        { name: 'Backend', value: 75 },
        { name: 'Database', value: 5 },
      ],
      time: "50 hours"
    },
    {
      title: "Contract-Manager Site",
      description: "Developed features for legal contract management, ensuring compliance and security.",
      type: "Full Stack",
      taskDistribution: [
        { name: 'Frontend', value: 70 },
        { name: 'Backend', value: 25 },
        { name: 'Database', value: 5 },
      ],
      time: "50 hours"
    },
    {
      title: "Task Manager",
      description: "Creating a project management tool ",
      type: "Full Stack",
      taskDistribution: [
        { name: 'Frontend', value: 90 },
        { name: 'Backend', value: 5 },
        { name: 'Database', value: 5 },
      ],
      time: "50 hours"
    },
  ],
};

const techStack = [
  ".NET", "Angular", "React", "C#", "SSMS", "IIS", "Python",
  "Selenium", "Node.js", "PHP", "VBA", "Postman", "XML"
];



const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];


const Card = ({
  onClick,
  frontContent,
  backContent,
  className,
  delay = 0,
  isFlipped,
}: {
  onClick: () => void;
  frontContent: any;
  backContent: any;
  className?: string;
  delay?: number;
  isFlipped: boolean;
}) => (
  <motion.div
    onClick={onClick}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{
      scale: 1.05,
      boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.6)",
    }}
    viewport={{ once: true }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: delay }}
    className={`card-container ${className}`}
  >
    <motion.div
      className={`card-inner ${isFlipped ? "flipped" : ""}
      `}

    >
      <div className="card-front">{frontContent}</div>
      <div className="card-back">{backContent}</div>
    </motion.div>
  </motion.div>
);



const Projects = () => {
  const [activeTab, setActiveTab] = useState("Professional");

  const [flippedCards, setFlippedCards] = useState<string[]>([]);

  const handleFlip = (cardName: string) => {
    setFlippedCards((prev) =>
      prev.includes(cardName)
        ? prev.filter((name) => name !== cardName)
        : [...prev, cardName]
    );
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  return (
    <div className="projects-container">
      <h1 className="projects-title">Where Vision Meets Execution</h1>

      {/* Tabs for Professional / Independent Projects */}
      <div className="flex justify-center projects-tabs">
        {Object.keys(projects).map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`rounded-md font-semibold transition-all ${activeTab === category
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

          <Card
            onClick={() => { handleFlip(project.title) }}
            key={project.title}
            delay={index * 0.2}
            isFlipped={flippedCards.includes(project.title)}
            className={`projects-card bg-gray-800 rounded-lg shadow-lg border border-transparent cursor-pointer
                      hover:border-blue-400 transition-all duration-300`}
            frontContent={
              <>
                {/* Glowing border animation */}
                {/* <motion.div
              className="absolute inset-0 rounded-lg border border-blue-500 opacity-0"
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            ></motion.div> */}

                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-blue-300">{project.type}</p>
                <p className="text-gray-400 text-sm mt-2">{project.description}</p>
              </>
            }
            backContent={
              <>
                <h4 className="font-semibold text-center text-blue-300 mb-2">
                  {project.title} - Distribution
                </h4>

                <div className="flex flex-row items-center justify-center gap-10 w-full">
                  {/* Chart */}
                  <div className="flex flex-col">
                    <PieChart width={isMobile ? 45 : 70} height={isMobile ? 45 : 70}>
                      <Pie
                        data={project?.taskDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={isMobile ? 22 : 34}
                        dataKey="value"
                        labelLine={false}
                      >
                        {project?.taskDistribution.map((_entry: any, index: any) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>

                      {/* Tooltip for hover */}
                      <Tooltip
                        content={({ payload }) => {
                          if (!payload || payload.length === 0) return null;
                          const data = payload[0].payload;
                          const total = project?.taskDistribution.reduce((acc: any, curr: any) => acc + curr.value, 0);
                          const percentage = ((data.value / total) * 100).toFixed(0);
                          return (
                            <div className="text-xs p-2 bg-gray-900 text-white rounded">
                              <p>{`${data.name}: ${percentage}%`}</p>
                            </div>
                          );
                        }}
                      />
                    </PieChart>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-col justify-center gap-1 md:text-sm text-[10px]">
                    {project?.taskDistribution.map((entry: any, index: any) => {
                      const percentage = (
                        (entry.value / project?.taskDistribution.reduce((acc: any, curr: any) => acc + curr.value, 0)) * 100
                      ).toFixed(0);
                      return (
                        <div key={entry.name} className="flex items-center gap-2">
                          <span
                            className="inline-block w-3 h-3 rounded-sm"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></span>
                          <span>{entry.name} - {percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </>
            }



          />

        ))}
      </div>

      {/* Tech Stack Section */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech, index) => (
            <motion.span
              key={index}
              className="projects-techstack bg-gray-700 rounded-md font-semibold transition-all
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
