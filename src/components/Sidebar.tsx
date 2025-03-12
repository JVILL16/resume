export default function Sidebar() {
  return (
    <div className="fixed left-5 top-5 bottom-10 h-[calc(100vh-50px)] w-[250px] bg-gray-900 shadow-lg flex rounded-xl flex-col items-center p-6 z-50 text-white">
      {/* Profile Picture */}
      <img
        src="/pfp-jheremi.png"
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-6"
      />

      {/* Navigation Buttons */}
      <nav className="flex flex-col gap-4 w-full">
        <button className="w-full px-4 py-2 rounded-lg border-2 border-white transition duration-300 bg-[#213b5f] hover:bg-[#2c4b7c]">
          Contact
        </button>

        <button className="w-full px-4 py-2 rounded-lg border-2 border-white transition duration-300 bg-[#213b5f] hover:bg-[#2c4b7c]">
          Feedback
        </button>
      </nav>
    </div>
  );
}
