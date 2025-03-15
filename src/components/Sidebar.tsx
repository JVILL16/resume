export default function Sidebar() {
  return (
    <div className="p-6 bg-gray-800 flex flex-col items-center text-center rounded-xl m-6">
      {/* Profile Picture */}
      <img
        src="/pfp-jheremi.png"
        alt="Profile"
        className="w-32 h-32 rounded-full border-4 border-yellow-500"
      />
      <h2 className="text-xl font-semibold mt-4">Jheremi Villarreal</h2>
      <p className="text-sm text-gray-400">Full Stack Developer</p>

      <div className="mt-4 text-left">
        <p><span className="font-semibold">Residence:</span> USA</p>
        <p><span className="font-semibold">City:</span> McAllen, TX</p>
        <p><span className="font-semibold">Age:</span> 28</p>
      </div>
      <div className="mt-6 w-full">
        {/* Progress Bars */}
        <p className="text-sm">HTML</p>
        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
          <div className="bg-yellow-500 h-full w-[90%]"></div>
        </div>
        {/* Repeat for CSS, JS, etc. */}
      </div>
      <button className="mt-6 bg-yellow-500 text-black px-4 py-2 rounded-lg">
        Download CV
      </button>
    </div>
  );
}
