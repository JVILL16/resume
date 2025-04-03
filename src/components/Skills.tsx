import { FaJava, FaPython, FaJs, FaPhp, FaHtml5, FaCss3, FaReact, FaNodeJs, FaGitAlt,  FaGavel } from "react-icons/fa";
import { TbLetterC, TbBrandCSharp } from "react-icons/tb";
import { SiTypescript, SiAngular, SiDotnet, SiSelenium, SiMongodb, SiMysql, SiPostgresql, SiPostman, SiExpress, SiVuedotjs,  SiDjango, SiSpring,SiRedis, SiNextdotjs } from "react-icons/si";
import { GrServer } from "react-icons/gr";
import { MdMoreHoriz } from "react-icons/md";
import { motion } from "framer-motion";
import '../styles/Skills.css';

const skillSections = [
  {
    title: "Languages",
    skills: [
      { icon: FaJava, name: "Java" },
      { icon: TbLetterC, name: "C" },
      { icon: TbBrandCSharp, name: "C#" },
      { icon: FaPython, name: "Python" },
      { icon: FaJs, name: "JavaScript" },
      { icon: FaPhp, name: "PHP" },
      { icon: FaHtml5, name: "HTML" },
      { icon: FaCss3, name: "CSS" },
      { icon: SiTypescript, name: "TypeScript" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { icon: SiAngular, name: "Angular" },
      { icon: FaReact, name: "React" },
      { icon: SiVuedotjs, name: "Vue.js" },
      { icon: SiNextdotjs, name: "Next.js" },
      { icon: SiDotnet, name: ".NET" },
      { icon: SiDjango, name: "Django" },
      { icon: SiSpring, name: "Spring Boot" },
      { icon: SiExpress, name: "Express.js" },
      { icon: SiSelenium, name: "Selenium" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { icon: SiMongodb, name: "MongoDB" },
      { icon: SiMysql, name: "MySQL" },
      { icon: SiPostgresql, name: "PostgreSQL" },
      { icon: GrServer, name: "MS SQL Server" },
      { icon: SiRedis, name: "Redis" },
    ],
  },
  {
    title: "Tools & Applications",
    skills: [
      { icon: SiPostman, name: "Postman" },
      { icon: GrServer, name: "Azure DevOps" },
      { icon: FaGitAlt, name: "Git" },
      { icon: FaNodeJs, name: "Node.js" },
      { icon: FaGavel, name: "CUBS" }, 
      { icon: MdMoreHoriz, name: "VBA" },
    ],
  }
];

export default function Skills() {
  return (
    <div className="skills-container">
  <h1 className="skills-title">The Tech I Work With</h1>
  <div className="flex flex-wrap justify-center text-center skills-section">
    {skillSections.map((section, idx) => (
      <motion.div
        key={idx}
        className="relative bg-gray-800 rounded-lg shadow-lg border border-transparent cursor-pointer skills-card
                   hover:border-blue-400 transition-all duration-300"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: idx * 0.2 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.6)",
        }}
        viewport={{ once: true }}
      >
        {/* Animated glowing border */}
        <motion.div
          className="absolute inset-0 rounded-lg border border-blue-500 opacity-0"
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        ></motion.div>

        <h3 className="skills-grid-title font-semibold text-center mb-3">{section.title}</h3>
        <div className="grid grid-cols-3 gap-3">
          {section.skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center skills-container-icon transition transform hover:-translate-y-1"
            >
              <skill.icon className="skills-icon text-blue-500 transition-transform duration-300" />
              <p className="mt-1 skill-name font-semibold opacity-80">{skill.name}</p>
            </div>
          ))}
        </div>
      </motion.div>
    ))}
  </div>
</div>

  );
}
