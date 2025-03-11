import { motion } from "framer-motion";

const workExperience = [
  {
    company: "Linebarger Goggan Blair & Sampson, LLP",
    role: "Software Developer",
    location: "San Antonio, TX",
    duration: "June 2022 – Present",
    responsibilities: [
      "Fix software defects and ensure application functionality and reliability.",
      "Manage software projects, defining scope, timelines, and coordination across teams.",
      "Create and maintain comprehensive technical documentation and troubleshooting guides.",
      "Design, implement, and maintain secure databases, ensuring integrity and compliance.",
    ],
  },
  {
    company: "Linebarger Goggan Blair & Sampson, LLP",
    role: "Client Support Specialist",
    location: "San Antonio, TX",
    duration: "January 2022 – May 2022",
    responsibilities: [
      "Provided technical and general support for client engagements.",
      "Conducted Quality Assurance (QA) tasks for solution deliverables.",
      "Developed skills through mentorship and on-the-job experiences.",
    ],
  },
  {
    company: "OKIN Business Process Service",
    role: "Software Support Specialist",
    location: "San Antonio, TX",
    duration: "July 2020 – February 2021",
    responsibilities: [
      "Assisted in software design, coding, testing, and application support.",
      "Worked with team members to complete projects and troubleshoot technical issues.",
      "Utilized IT tools such as Active Directory and work tickets for Cloud 9 software.",
    ],
  },
];

const WorkExperience = () => {
  return (
    <div className="py-16 px-8 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold text-center mb-10">Work Experience</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {workExperience.map((job, index) => (
          <motion.div
            key={index}
            className="relative bg-gray-800 p-6 rounded-lg w-96 shadow-lg border border-transparent cursor-pointer
                      hover:border-blue-400 transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.6)",
            }}
            viewport={{ once: true }}
          >
            {/* Animated glowing border */}
            <motion.div
              className="absolute inset-0 rounded-lg border border-blue-500 opacity-0"
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            ></motion.div>

            <h3 className="text-xl font-semibold">{job.role}</h3>
            <p className="text-blue-300">{job.company}</p>
            <p className="text-gray-400 text-sm">{job.location} | {job.duration}</p>
            <ul className="mt-3 text-gray-300 text-sm list-disc list-inside space-y-2">
              {job.responsibilities.map((task, i) => (
                <li key={i}>{task}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
