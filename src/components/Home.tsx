import '../styles/Home.css'
import Feedback from "./Feedback";

import SectionDetails from './SectionDetails';


export default function Home() {




  return (
    <>
      <SectionDetails />


      <div className="bg-gray-900 shadow-lg rounded-xl flex flex-col items-center text-white overflow-hidden w-full min-h-screen">




        

       



      </div>

 {/* Floating Feedback Form - Position it below content */}
 <div className="mt-10 w-full flex justify-center mb-5">
          <Feedback /> {/* Feedback form below main content */}
        </div>
    </>
  );
}
