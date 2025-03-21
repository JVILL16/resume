import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence  } from "framer-motion";
import { FaCircle } from "react-icons/fa";

const categories: any = ["Technical", "Get to Know Me", "Other Questions"];

const summaries: any  = {
  Technical: [
    { question: "What programming languages do you use?", answer: "As of now, I'm using Javascript, HTML, CSS, C#. On the side I use same " },
    { question: "What frameworks do you specialize in?", answer: "I specialize in Angular, React, and Laravel." },
  ],
  "Get to Know Me": [
    { question: "What's your favorite hobby?", answer: "I enjoy playing Ultimate Frisbee and working on personal projects." },
    { question: "Where are you from?", answer: "I'm from McAllen, TX. I moved to San Antonio in 2015 for university." },
  ],
  "Other Questions": [
    { question: "Do you do freelance work?", answer: "Yes, I build websites for clients." },
    { question: "What's your background?", answer: "I have 3-4 years of experience as a Full Stack Developer." },
  ],
};
const images : any = [
  { id: 1, src: "/selfImage/IMG_3589.jpeg" },
  { id: 2, src: "/selfImage/IMG_4757.jpeg" },
  { id: 3, src: "/selfImage/IMG_4276.jpeg" },
  { id: 4, src: "/selfImage/IMG_0585.jpeg" },
  { id: 5, src: "/selfImage/IMG_1337.jpeg" },
  { id: 6, src: "/selfImage/IMG_0587.jpeg" },
];
export default function Summary() {
  const [activeCategory, setActiveCategory] = useState("Technical");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeImageId, setActiveImageId] = useState(images[0].id);
  const [isDragging, setIsDragging] = useState(false); // Track dragging state

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (_: any, info: any) => {
    setIsDragging(false); // Reset dragging state
  };

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
      {/* Animated Category Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        {categories.map((category:any) => (
          <motion.button
            key={category}
            className="relative px-6 py-2 text-lg font-semibold rounded-lg transition-all duration-300 overflow-hidden"
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className={`relative z-10 ${
                activeCategory === category ? "text-white" : "text-gray-300"
              }`}
            >
              {category}
            </span>

            {/* Active Indicator (Underline & Glow Effect) */}
            {activeCategory === category && (
              <motion.div
                className="absolute inset-0 bg-blue-500 opacity-20 rounded-lg"
                layoutId="activeBackground"
                transition={{ duration: 0.3 }}
              />
            )}
            <motion.div
              className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-400"
              layoutId="activeUnderline"
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        ))}
      </div>

      {/* Questions List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="relative border-l-2 border-gray-700 pl-8 w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {summaries[activeCategory].map((item:any, index:any) => (
            <motion.div
              key={index}
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
        </motion.div>
      </AnimatePresence>

      <h1 className="text-4xl text-center font-extrabold text-white my-15 tracking-wide">Still Shots, Always Moving</h1>
      <div className="relative w-full flex justify-center overflow-hidden mt-10">
      <motion.div
        className="flex space-x-6 cursor-grab active:cursor-grabbing w-full"
        drag="x"
        dragConstraints={{ left: -500, right: 500 }}
        dragElastic={0.2}
        onDragStart={handleDragStart} // Track when dragging starts
        onDragEnd={handleDragEnd}
      >
        {images.map((image:any) => (
          <motion.div
            key={image.id}
            className={`relative w-[320px] h-[420px] flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 ${
              activeImageId === image.id
                ? "scale-110 shadow-xl"  // Zoom in effect on active image
                : "scale-95 opacity-70"
            }`}
            onClick={() => {
              // Set active image only if not dragging
              if (!isDragging) {
                setActiveImageId(image.id);
              }
            }}
            style={{
              pointerEvents: isDragging ? 'none' : 'auto', // Disable clicking while dragging
            }}
          >
            <motion.img
              src={image.src}
              alt={`Slide ${image.id}`}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.02 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
    </div>
  );
};

