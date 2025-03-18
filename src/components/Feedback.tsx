import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaTimes } from "react-icons/fa";

export default function Feedback() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="flex flex-col my-20 items-center">
      <h1 className="text-4xl font-extrabold text-white mb-20 tracking-wide">Provide Your Feedback</h1>
      {!isOpen ? (
        <div className="relative flex flex-col items-center">
          <motion.div
            className="flex justify-center items-center cursor-pointer text-white text-5xl"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpen}
          >
            <FaEnvelope className="text-white" size={200}/>
          </motion.div>
          <motion.span
            className="mt-2 text-sm text-gray-400"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.5 }}
          >
            Click me!
          </motion.span>
        </div>
      ) : (
        <motion.div
          className="relative bg-gray-800 text-white p-6 rounded-xl shadow-xl border w-[600px] mx-auto"
          style={{ boxShadow: "0 0 5px rgba(255, 255, 255, 0.5)" }}
          initial={{ opacity: 0, y: 30, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          >
            <FaTimes />
          </button>
          <h2 className="text-2xl font-bold text-center mb-6">Feedback</h2>
          <h4 className="text-lg font-bold text-left m-4">Please provide any critique in regards to this site, 
          any projects mentioned, or any other questions about the information displayed.</h4>
          <form className="space-y-4">
          
            <input type="email" placeholder="Enter your email" className="w-full p-3 bg-gray-700 rounded-lg" required />
            <select className="w-full p-3 bg-gray-700 rounded-lg" required>
              <option>Select an issue</option>
              <option>Technical Issue</option>
              <option>Billing</option>
              <option>Account Issue</option>
              <option>Other</option>
            </select>
            <input type="text" placeholder="Subject" className="w-full p-3 bg-gray-700 rounded-lg" required />
            <textarea placeholder="Enter your comments" className="resize-none w-full p-3 h-32 bg-gray-700 rounded-lg" required></textarea>
            <motion.button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
