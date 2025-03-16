import { FaJava, FaPython, FaJs, FaPhp, FaHtml5, FaCss3, FaReact, FaGitAlt, FaDatabase } from "react-icons/fa";
import { SiMysql, SiMongodb, SiPostgresql, SiSelenium, SiDotnet, SiAngular, SiPostman } from "react-icons/si";
import { TbLetterC, TbBrandCSharp } from "react-icons/tb"; // C and C# icons
import { GrServer } from "react-icons/gr"; // Server icon for SQL Server & Azure DevOps
import { motion } from "framer-motion";

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
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { icon: SiAngular, name: "Angular" },
      { icon: FaReact, name: "React" },
      { icon: SiDotnet, name: ".NET" },
      { icon: SiSelenium, name: "Selenium" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { icon: SiMongodb, name: "MongoDB" },
      { icon: SiMysql, name: "MySQL" },
      { icon: SiPostgresql, name: "PostgreSQL" },
      { icon: GrServer, name: "MS SQL Server" }, // Using a server icon for SQL Server
    ],
  },
  {
    title: "Tools & Applications",
    skills: [
      { icon: SiPostman, name: "Postman" },
      { icon: GrServer, name: "Azure DevOps" }, // Using the same server icon
      { icon: FaDatabase, name: "Databases" }, // General database icon
      { icon: FaGitAlt, name: "Git" },
    ],
  },
];

export default function Skills() {
  return (
    <div className="py-14 px-8 bg-gray-900 text-white rounded-xl ">
  <h2 className="text-3xl font-bold text-center mb-10">Skills</h2>
  <div className="flex flex-wrap justify-center gap-6 text-center">
    {skillSections.map((section, idx) => (
      <motion.div
        key={idx}
        className="relative bg-gray-800 p-4 rounded-lg w-64 shadow-lg border border-transparent cursor-pointer
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

        <h3 className="text-lg font-semibold text-center mb-3">{section.title}</h3>
        <div className="grid grid-cols-3 gap-3">
          {section.skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-2 transition transform hover:-translate-y-1"
            >
              <skill.icon className="text-3xl text-blue-500 transition-transform duration-300" />
              <p className="mt-1 text-xs font-semibold opacity-80">{skill.name}</p>
            </div>
          ))}
        </div>
      </motion.div>
    ))}
  </div>
</div>

  );
}
