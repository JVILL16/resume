export default function Navbar() {
  return (
    <div className="relative w-full h-[300px] flex justify-center items-center">
      {/* Full-width Background GIF */}
      <div className="w-full h-full border-b-6 border-white relative">
        <img
          src="/sanantonio_bg.png"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-100" // Reduced opacity for lightness
        />
        <div className="absolute inset-0 bg-white opacity-50"></div>
      </div>

      <nav className="absolute bottom-[40px] right-4 flex gap-4 z-50">
        <button
          className="px-4 py-2 text-white rounded-lg shadow-lg border-2 border-white transition duration-300"
          style={{
            backgroundColor: '#1E3A8A',
            boxShadow: '0px 0px 10px rgba(30, 58, 138, 0.6)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#3B82F6'; // Lighter blue on hover
            e.currentTarget.style.boxShadow = '0px 0px 15px rgba(59, 130, 246, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1E3A8A'; // Original blue
            e.currentTarget.style.boxShadow = '0px 0px 10px rgba(30, 58, 138, 0.6)';
          }}
        >
          Contact
        </button>

        <button
          className="px-4 py-2 text-white rounded-lg shadow-lg border-2 border-white transition duration-300"
          style={{
            backgroundColor: '#D97706',
            boxShadow: '0px 0px 10px rgba(217, 119, 6, 0.6)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FBBF24'; // Lighter amber on hover
            e.currentTarget.style.boxShadow = '0px 0px 15px rgba(251, 191, 36, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#D97706'; // Original amber
            e.currentTarget.style.boxShadow = '0px 0px 10px rgba(217, 119, 6, 0.6)';
          }}
        >
          Feedback
        </button>
      </nav>
      {/* Profile Picture Stays Positioned Properly */}
      <img
        src="/pfp-jheremi.png"
        alt="Profile"
        className="absolute bottom-[-50px] w-24 h-24 rounded-full border-4 border-white shadow-lg z-10"
      />
      {/* <nav className="absolute bottom-[-60px] right-4 p-4 z-50 bg-transparent">
        <h2 className="text-xl font-bold title drop-shadow-md">Jheremi Villarreal</h2>
      </nav> */}

    </div>

  );
}