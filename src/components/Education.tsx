import { motion } from "framer-motion";

const courses = [
  "Computer Science Fundamentals",
  "Advanced JavaScript & TypeScript",
  "Web Development with React",
  "Database Management & SQL",
  "Cloud Computing with AWS",
  "Machine Learning Basics",
];

const Education = () => {
  return (
    <div className="py-14 px-8 bg-gray-900 text-white rounded-xl">
      <h1 className="text-4xl text-center font-extrabold text-white mb-10 tracking-wide">
        Here Is What I Learned
      </h1>

      {/* Courses Section */}
      <div className="text-center">
        <div className="flex flex-wrap justify-center gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg w-80 shadow-lg border border-transparent 
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
              <h3 className="text-lg font-semibold">{course}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
