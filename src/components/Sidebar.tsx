import { useState, useEffect } from 'react';
import { FaGithub, FaTwitter, FaBeer, FaSun, FaMoon, FaChevronUp, FaChevronDown, FaDownload, FaLinkedin, FaRecycle } from 'react-icons/fa';
import '../styles/Sidebar.css'
import { BiRefresh } from 'react-icons/bi';

interface Quote {
  content: string;
  author: string;
}


const developing = [
  "React with TypeScript",
  "Angular PHP Website",
  "Selenium Web Scraping",
  "Python cv2 Video Capture",
  "AWS Certification Courses",
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
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isTechExpanded, setIsTechExpanded] = useState(false); // Tech Stack Toggle
  const [isAgendaExpanded, setIsAgendaExpanded] = useState(false); // Development Agenda Toggle
  const [isBioExpanded, setIsBioExpanded] = useState(true); // Bio Toggle

  const [loading, setLoading] = useState<boolean>(true);  // ✅ Added loading state
  const [error, setError] = useState<string | null>(null);


  const fetchQuote = async () => {
    setLoading(true);  // ✅ Set loading to true before fetching
    try {
      const response = await fetch("https://api.quotable.io/random");//https://quoteapi.pythonanywhere.com/
      if (!response.ok) throw new Error("Failed to fetch quote"); // ✅ Error handling
      const data: Quote = await response.json();
      setQuote(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);  // ✅ Set loading to false after fetching (success or error)
    }
  };

  useEffect(() => {
    fetchQuote();
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
        className="w-24 h-24 rounded-full border-4 border-yellow-500 "
      />
      <h2 className="text-lg font-semibold !mt-4">Jheremi Villarreal</h2>
      <p className="text-xs text-gray-400">Full Stack Developer</p>

     {/* Bio Section with Toggle */}
        <div className="mt-4 w-full">
          <button
            onClick={() => setIsBioExpanded(!isBioExpanded)}
            className="w-full flex justify-between items-center bg-gray-700 !px-2 !py-2 !rounded-md text-white !text-xs"
          >
            <span>📜 Bio</span>
            {isBioExpanded ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
          </button>

          {/* Bio Information */}
          <div
            className={`mt-2 transition-all duration-500 ${isBioExpanded ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0 overflow-hidden pointer-events-none"}`}
          >
            <table className="w-full text-xs text-left border-collapse ">
              <tbody>
                <tr className="border-b border-gray-600">
                  <td className="font-semibold text-[12px] px-2 py-2 bg-gray-700 text-white ">Location</td>
                  <td className="ps-2 py-2">San Antonio, TX, USA</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="font-semibold text-[12px] px-2 py-2 bg-gray-700 text-white ">Available</td>
                  <td className="ps-2  py-2">For full-time remote positions, relocation for in-office roles, or freelance projects.</td>
                </tr>
                <tr>
                  <td className="font-semibold text-[12px] px-2 py-2 bg-gray-700 text-white ">Contact</td>
                  <td className="ps-2  py-2">jheremi2015@gmail.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      {/* Years of Experience */}
      {/* <div className="mt-6 w-full text-left">
        <p className="font-semibold !text-sm">🚀 4+ Years of Dev Experience</p>
      </div> */}

      {/* Currently Learning (Updated to Toggle) */}
      <div className="mt-2 w-full">
        <button
          onClick={() => setIsAgendaExpanded(!isAgendaExpanded)}
          className="w-full flex justify-between items-center bg-gray-700 !px-2 !py-2 !rounded-md text-white !text-xs"
        >
          <span>📖 On My Plate</span>
          {isAgendaExpanded ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
        </button>

        {/* Development Agenda List */}
        <div
          className={`transition-all duration-500 overflow-hidden ${isAgendaExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden pointer-events-none"}`}
        >
          {developing.map((dev, index) => (
            <p key={index} className="text-sm mt-2">{dev}</p>
          ))}
        </div>
      </div>

      {/* Tech Stack Section with Toggle */}
      <div className="mt-2 w-full">
        <button
          onClick={() => setIsTechExpanded(!isTechExpanded)}
          className="w-full flex justify-between items-center bg-gray-700 !px-2 !py-2 !rounded-md text-white !text-xs"
        >
          <span>💻 Tech Stack</span>
          {isTechExpanded ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
        </button>

        {/* Tech Stack Progress Bars */}
        <div
          className={`transition-all duration-500 overflow-hidden ${isTechExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
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
      {/* <div className="mt-6 w-full text-left">
        <p className="font-semibold">Code Snippet of the Day</p>
        <code className="block bg-gray-700 p-2 rounded text-xs !font-mono">
          {"const greet = () => console.log('Hello, World!');"}
        </code>
      </div> */}

      {/* Random Developer Quote */}
      <div className="mt-6 w-full text-left text-xs">
        <table className="w-full text-xs text-left border-collapse ">
          <tbody>
            <tr className="border-b border-gray-600 text-center">
            <td className="font-semibold text-[12px] p-2 bg-gray-700 text-white ">Quote of the Day
              <button className="float-end !p-1" onClick={fetchQuote} ><BiRefresh/></button>
            </td>
            </tr>
            <tr className="border-b border-gray-600">
              <td className="ps-2 py-2">{loading && <div className="loader"></div>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && quote && (
                  <p>"{quote.content}" - {quote.author}</p>
                )}</td>
            </tr>
          </tbody>
        </table>
      </div>


      {/* Download CV Button */}
      <div className="mt-6 w-full flex items-center justify-center">
        <a href="/Resume_2025_Jheremi_V.pdf" download="Resume_2025_Jheremi_V.pdf" className="flex items-center justify-center !bg-blue-500 !text-white !py-1 !px-2 rounded-sm !text-xs">
          <FaDownload size={10} /><span className="ml-2"> Download Resume</span>
        </a>
      </div>
      {/* Social Links */}
      <div className="mt-6 w-full flex justify-center space-x-4">
        <a href="https://github.com/JVILL16" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
          <FaGithub size={20} />
        </a>
        <a href="https://www.linkedin.com/in/jheremi-villarreal-b05850138" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
          <FaLinkedin size={20} />
        </a>
        <a href="https://www.buymeacoffee.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
          <FaBeer size={20} />
        </a>
      </div>
      {/* Dark Mode Toggle */}
      {/* <div className="mt-6 w-full flex items-center justify-center">
        <button onClick={toggleDarkMode}
          className="flex items-center justify-center py-1 px-2 rounded-lg !text-xs"
          style={{
            backgroundColor: darkMode ? "white" : "black",
            color: darkMode ? "black" : "white"
          }}>
          {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
          <span className="ml-2">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div> */}

    </div>

  );
};
