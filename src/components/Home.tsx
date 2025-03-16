import '../styles/Home.css'
import Feedback from "./Feedback";

import SectionDetails from './SectionDetails';


export default function Home() {




  return (
    <>
      <div className="max-w-screen-3xl mx-auto overflow-hidden p-6 m-6">
        
        {/* Hero Section with Background Image */}
        <section className="relative p-10 h-[300px] rounded-xl flex items-center bg-cover bg-center bg-no-repeat overflow-visible"
          style={{ backgroundImage: "url('/sanantonio_bg.png')"}}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/50 rounded-xl"></div>

          {/* Content - Ensures it's above the background */}
          <div className="relative z-10 w-2/3 text-white">
            <h1 className="text-3xl font-bold">Discover My Amazing Work!</h1>
            <p className="mt-2 !text-gray-300">I build web & mobile applications.</p>
            <button className="mt-4 !text-sm !bg-yellow-500 text-black px-6 py-2 rounded-lg">
              Explore Now
            </button>
          </div>

          {/* Image Placeholder (optional) */}
          <img
            src="/profile-banner.png"
            className="absolute bottom-0 right-0 z-20 w-auto h-full object-cover rounded-xl"
            style={{ width: '30%', height: '100%' }} // Adjust to stretch the image height to the section height
          />
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-4 text-center text-yellow-500 font-semibold text-xl mt-6">
          <div><span className="text-3xl">10+</span> <p className="text-gray-400 text-sm">Years Experience</p></div>
          <div><span className="text-3xl">143</span> <p className="text-gray-400 text-sm">Completed Projects</p></div>
          <div><span className="text-3xl">114</span> <p className="text-gray-400 text-sm">Happy Customers</p></div>
          <div><span className="text-3xl">20+</span> <p className="text-gray-400 text-sm">Awards</p></div>
        </section>

        {/* Grid Section  grid grid-cols-3 gap-6*/}
        <div className="grid grid-cols-1 mt-15">
          <SectionDetails />
          
        </div>
        <Feedback />
      </div>

    </>
  );
}
