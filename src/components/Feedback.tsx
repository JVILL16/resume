import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaTimes } from "react-icons/fa";
import '../styles/Feedback.css';

export default function Feedback() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="feedback-container">
      <h1 className="feedback-title">Provide Your Feedback</h1>
      {!isOpen ? (
        <div className="relative flex flex-col items-center">
          <motion.div
            className="flex justify-center items-center cursor-pointer text-white mail-icon"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpen}
          >
            <FaEnvelope className="text-white" size={200} />
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
          className="relative bg-gray-800 text-white rounded-xl shadow-xl border mx-auto fb-box"
          style={{ boxShadow: "0 0 5px rgba(255, 255, 255, 0.5)" }}
          initial={{ opacity: 0, y: 30, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1 }}
        >
          <button
            onClick={handleClose}
            className="close-btn"
          >
            <FaTimes />
          </button>
          <h2 className="heading">Feedback</h2>
          <h4 className="subheading">Please provide any critique in regards to this site,
            any projects mentioned, or any other questions about the information displayed.</h4>
          <form className="space-y-4">
            <input type="email" placeholder="Enter your email" className="input-field" required />
            <select className="select-field" required>
              <option>Select an issue</option>
              <option>Technical Issue</option>
              <option>Billing</option>
              <option>Account Issue</option>
              <option>Other</option>
            </select>
            <input type="text" placeholder="Subject" className="input-field" required />
            <textarea placeholder="Enter your comments" className="textarea-field" required></textarea>
            <motion.button
              type="submit"
              className="submit-btn"
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
