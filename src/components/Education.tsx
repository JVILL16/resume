import { motion } from "framer-motion";
import '../styles/Education.css';

const courses = [
  "Analysis of Algorithms",
  "Application Programming",
  "Web Technologies",
  "Data Structures",
  "Enterprise Software Engineering",
  "Software Engineering",
  "Secure Software Development and Analysis",
  "Principles of Cybersecurity",
  "Computer Architecture",
  "Computer and Information Security",
];

const Education = () => {
  return (
    <div className="education-container">
      <h1 className="education-title">
        Here Is What I Learned
      </h1>

      {/* Courses Section */}
      <div className="text-center">
        <div className="flex flex-wrap justify-center gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              className="education-card bg-gray-800 rounded-lg shadow-lg border border-transparent 
                         hover:border-blue-400 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.6)",
              }}
            >
              <h3 className="font-semibold">{course}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
