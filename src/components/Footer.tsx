// src/components/Footer.tsx

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8 text-center">
      <p>© {new Date().getFullYear()} SagePaths | Resume Career</p>
      <div>
        <a href="mailto:jheremi2015@gmail.com" className="hover:text-blue-400">Email</a> | 
        <a href="https://www.linkedin.com/in/jheremi-villarreal-b05850138" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"> LinkedIn</a> | 
        <a href="https://github.com/JVILL16" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"> GitHub</a>
      </div>
      <p className="mt-2">Let's connect!</p>
    </footer>
  );
};

export default Footer;
