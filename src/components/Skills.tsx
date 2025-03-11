import { FaJava, FaPython, FaJs, FaPhp, FaHtml5, FaCss3, FaReact, FaGitAlt, FaDatabase } from "react-icons/fa";
import { SiMysql, SiMongodb, SiPostgresql, SiSelenium, SiDotnet, SiAngular, SiPostman } from "react-icons/si";
import { TbLetterC, TbBrandCSharp } from "react-icons/tb"; // C and C# icons
import { GrServer } from "react-icons/gr"; // Server icon for SQL Server & Azure DevOps

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
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {skillSections.map((section, idx) => (
        <div
          key={idx}
          className="relative bg-black border-white shadow-[0_0_15px_rgba(59,130,246,0.8)] p-6 rounded-2xl w-72 text-center overflow-hidden transition transform hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,1)]"
        >
          <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
          <div className="grid grid-cols-3 gap-4">
            {section.skills.map((skill, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 transition transform hover:-translate-y-2"
              >
                <skill.icon className="text-4xl text-blue-500 transition-transform duration-300" />
                <p className="mt-2 text-sm font-semibold opacity-80">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
