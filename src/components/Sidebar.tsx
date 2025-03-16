import { useState, useEffect, useRef  } from 'react';
import { FaGithub, FaTwitter, FaBeer, FaSun, FaMoon, FaChevronUp, FaChevronDown, FaDownload } from 'react-icons/fa';

const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Code is like humor. When you have to explain it, it’s bad. - Cory House",
  "I’m not a great programmer; I’m just a good programmer with great habits. - Kent Beck",
  "First, solve the problem. Then, write the code. - John Johnson"
];
const developing = [
  "📖 React with TypeScript",
  "📖 Angular PHP Website",
  "📖 Selenium Web Scraping",
  "📖 Python cv2 Video Capture",
  "📖 AWS Certification Courses",
];

const techStack = [
  { name: "HTML", percentage: 90 },
  { name: "CSS", percentage: 80 },
  { name: "JavaScript", percentage: 70 },
  { name: "React", percentage: 75 },
  { name: "Node.js", percentage: 60 },
  { name: "TypeScript", percentage: 65 },
  { name: "Tailwind CSS", percentage: 85 },
  { name: "MongoDB", percentage: 50 },
  { name: "Python", percentage: 60 },
];

export default function Sidebar() {
  const [darkMode, setDarkMode] = useState(false);
  const [quote, setQuote] = useState<string>(quotes[Math.floor(Math.random() * quotes.length)]);
  const [isTechExpanded, setIsTechExpanded] = useState(false); // Tech Stack Toggle


  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', !darkMode);
  };

  return (
    <div
      className={`fixed sidebar left-0 top-0 h-[95%] w-[250px] bg-gray-800 text-white flex flex-col items-center text-center rounded-xl p-6 m-6 shadow-lg overflow-y-auto ${darkMode ? 'bg-gray-900' : ''}`}
    >
      {/* Profile Picture */}
      <img
        src="/pfp-jheremi.png"
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-yellow-500 !mb-4"
      />
      <h2 className="text-lg font-semibold !mt-4">Jheremi Villarreal</h2>
      <p className="text-xs text-gray-400">Full Stack Developer</p>

      <div className="mt-4 text-center">
        <p><span className="font-semibold">City:</span> San Antonio, TX</p>
        <p><span className="font-semibold">Age:</span> 28</p>
        <p><span className="font-semibold">Residence:</span> USA</p>
      </div>

      {/* Years of Experience */}
      <div className="mt-6 w-full text-left">
        <p className="font-semibold !text-sm">🚀 4+ Years of Dev Experience</p>
      </div>

      {/* Currently Learning */}
      <div className="mt-4 w-full text-left">
        <p className="font-semibold underline">Development Agenda:</p>
        
        {developing.map((dev) => (
          <p className="text-sm">{dev}</p>
        ))}
        
      </div>

      {/* Tech Stack Section with Toggle */}
      <div className="mt-6 w-full">
        <button 
          onClick={() => setIsTechExpanded(!isTechExpanded)} 
          className="w-full flex justify-between items-center bg-gray-700 !px-3 !py-2 rounded-md text-white !text-sm"
        >
          <span>💻 Tech Stack</span>
          {isTechExpanded ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
        </button>

        {/* Tech Stack Progress Bars */}
        <div 
          className={`transition-all duration-500 overflow-hidden ${
            isTechExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {techStack.map((tech) => (
            <div key={tech.name} className="space-y-2 mt-2">
              <p className="text-xs">{tech.name}</p>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-yellow-500 h-full transition-all duration-500" 
                  style={{ width: isTechExpanded ? `${tech.percentage}%` : "0%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Snippet of the Day */}
      <div className="mt-6 w-full text-left">
        <p className="font-semibold">Code Snippet of the Day</p>
        <code className="block bg-gray-700 p-2 rounded text-xs !font-mono">
          {"const greet = () => console.log('Hello, World!');"}
        </code>
      </div>

      {/* Random Developer Quote */}
      <div className="mt-6 w-full text-left">
        <p className="font-semibold">Quote of the Day</p>
        <p>"{quote}"</p>
      </div>

      {/* Dark Mode Toggle */}
      <div className="mt-6 w-full flex items-center justify-center">
        <button onClick={toggleDarkMode}
         className="flex items-center justify-center py-1 px-2 rounded-lg !text-xs"
         style={{
          backgroundColor: darkMode ? "white" : "black",
          color: darkMode ? "black" : "white"
         }}>
          {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
          <span className="ml-2">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>

      {/* Social Links */}
      <div className="mt-6 w-full flex justify-center space-x-4">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
          <FaGithub size={20} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
          <FaTwitter size={20} />
        </a>
        <a href="https://www.buymeacoffee.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
          <FaBeer size={20} />
        </a>
      </div>

      {/* Download CV Button */}
      <div className="mt-6 w-full flex items-center justify-center">
        <button className="flex items-center justify-center !bg-blue-500 text-white !py-1 !px-4 rounded-lg !text-xs">
          <FaDownload size={10}/><span className="ml-2"> Download Resume</span>
        </button>
      </div>
    </div>
  );
};
