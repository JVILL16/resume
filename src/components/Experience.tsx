import { motion } from "framer-motion";
import { useState } from "react";

const workExperience : any = {
  Professional: [
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
  ],
  Other: [
    {
      company: "Whataburger",
      role: "Application Developer Intern",
      location: "San Antonio, TX",
      duration: "June 2019 – August 2019",
      responsibilities: [
        "Collaborated closely with an experienced team of development engineers to deliver high-quality features to production.",
        "Learned and adopted industry-accepted code styling, contribution guidelines, and code review standards.",
        "Analyzed and helped create, build, deploy data, web services, and web applications.",
      ],
    },
    {
      company: "Staples",
      role: "Tech Sales Associate",
      location: "San Antonio, TX",
      duration: "June 2018 – May 2019",
      responsibilities: [
        "Engaged with customers on sales floor by using vibe behaviors to create a buying environment.",
        "Built relationships with other tech associates to create synergy within our department.",
        "Responsible for ensuring all operational policies and processes are followed.",
      ],
    },
    {
      company: "UTSA College of Business Finance Department",
      role: "Work Study",
      location: "San Antonio, TX",
      duration: "September 2015 – May 2016",
      responsibilities: [
        "Performed varied clerical duties such as filing, copying, answering the telephone, and assisting students.",
        "Maintained office equipment by completing preventive maintenance and arranging for repairs.",
        "Assisted in filling faculty and student requests for copies to be made and faxes to be sent to the directed recipients.",
      ],
    },
  ],
};

export default function WorkExperience() {
  const [activeTab, setActiveTab] = useState("Professional");

  return (
    <div className="py-14 px-8 bg-gray-900 text-white rounded-xl">
      <h1 className="text-4xl text-center font-extrabold text-white mb-15 tracking-wide">
        Roles That Shaped Me
      </h1>
      {/* Tabs for Professional / Other Experiences */}
      <div className="flex justify-center gap-6 mb-8">
        {Object.keys(workExperience).map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-6 py-2 rounded-md text-lg font-semibold transition-all ${
              activeTab === category
                ? "bg-blue-500 shadow-lg shadow-blue-500/50"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {workExperience[activeTab]?.length > 0 ? (
          workExperience[activeTab].map((job: any, index: any) => (
            <motion.div
              key={index}
              className="relative bg-gray-800 p-4 rounded-lg w-96 shadow-lg border border-transparent cursor-pointer
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
              <p className="text-gray-400 text-sm">
                {job.location} | {job.duration}
              </p>
              <ul className="mt-3 text-gray-300 text-sm list-disc list-inside space-y-2">
                {job.responsibilities.map((task:any , i:any) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-lg">No experience available.</p>
        )}
      </div>
    </div>
  );
}
