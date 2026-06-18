import './App.css'

const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-900 text-white">
    {/*Bouncing Container with Shadow Underneath */}
    <div className="relative mb-6 animate-bounce">
      <div className="md:w-64 md:h-64 w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center shadow-2xl">
        {/* Image */}
        <img 
          src="/bh_icon.png" 
          alt="Loading..." 
          className="md:w-50 md:h-50 w-25 h-25" 
        />
      </div>
    </div>

    {/* Loading Text with Animated Ellipses */}
    <p className="title font-semibold animate-fade-in animate-delay-200">
      Incoming Resume
      <span className="animate-ellipsis">.</span>
      <span className="animate-ellipsis-delay-100">.</span>
      <span className="animate-ellipsis-delay-200">.</span>
    </p>
    {/* Loading Bar */}
    {/* <div className="w-72 h-2 bg-gray-700 rounded-full mt-4">
      <div
        className="h-full bg-blue-500 animate-loading"
        style={{ width: '0%' }}
      ></div>
    </div> */}
  </div>
);
export default LoadingScreen;
{/**
  
  sm (Small): For screens >= 640px

  md (Medium): For screens >= 768px

  lg (Large): For screens >= 1024px

  xl (Extra Large): For screens >= 1280px

  2xl (2x Extra Large): For screens >= 1536px
  
*/}
