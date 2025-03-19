import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaCircle } from "react-icons/fa";

const summaries = [
  {
    question: "Who am I as a developer?",
    answer:
      "I am a Full Stack Developer with a strong problem-solving mindset, specializing in building scalable and efficient software solutions. My expertise spans both frontend and backend technologies, allowing me to create seamless user experiences.",
  },
  {
    question: "What motivates me?",
    answer:
      "I thrive on solving complex problems and optimizing workflows. The challenge of improving performance, implementing efficient solutions, and continuously learning drives me to refine my skills.",
  },
  {
    question: "What technologies do I use?",
    answer:
      "My stack includes JavaScript, TypeScript, Angular, React, Node.js, PHP, and various databases. I stay up-to-date with the latest technologies to ensure optimal application performance and maintainability.",
  },
  {
    question: "What are my professional goals?",
    answer:
      "I aim to lead and contribute to impactful projects, mentor upcoming developers, and explore deeper into cloud computing and cybersecurity while advancing my technical expertise.",
  },
];

export default function Summary() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-scroll to active item
  useEffect(() => {
    if (activeIndex !== null && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeIndex]);

  return (
    <div className="py-14 px-8 bg-gray-900 text-gray-300 rounded-xl">
      <h1 className="text-4xl text-center font-extrabold text-white mb-15 tracking-wide">Common Questions, Clear Answers</h1>
      <div className="relative border-l-2 border-gray-700 pl-8">
        {summaries.map((item, index) => (
          <motion.div
            key={index}
            ref={(el:any) => (itemRefs.current[index] = el)}
            className="relative mb-10 cursor-pointer"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            {/* Animated Dot */}
            <motion.div
              className={`absolute -left-[22px] top-3 w-4 h-4 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
                ${activeIndex === index ? "bg-blue-400 border-blue-500 shadow-blue-500" : "bg-gray-800 border-gray-500"}`}
              animate={{
                scale: activeIndex === index ? 1.2 : 1,
                boxShadow: activeIndex === index ? "0px 0px 10px rgba(59, 130, 246, 0.7)" : "none",
              }}
            >
              <FaCircle
                className={`text-[8px] transition-all duration-300 ${
                  activeIndex === index ? "text-white" : "text-gray-500"
                }`}
              />
            </motion.div>

            {/* Connecting Line Animation */}
            <motion.div
              className="absolute left-[-2px] top-0 w-[2px] bg-blue-500"
              animate={{
                height: activeIndex === index ? "100%" : "0%",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            ></motion.div>

            {/* Question & Expanding Answer */}
            <motion.div
              className={`bg-gray-800 p-4 rounded-lg shadow-md border transition-all duration-300
                ${activeIndex === index ? "border-blue-400" : "border-gray-700"}`}
              whileHover={{ scale: 1.02 }}
            >
              <motion.h3
                className="text-lg font-semibold text-gray-100"
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {item.question}
              </motion.h3>
              <motion.div
                className="text-gray-400 mt-2 overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={activeIndex === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {activeIndex === index && <p>{item.answer}</p>}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

