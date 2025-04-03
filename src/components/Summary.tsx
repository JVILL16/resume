import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence  } from "framer-motion";
import { FaCircle } from "react-icons/fa";
import '../styles/Summary.css'

const categories: any = ["Technical", "Get to Know Me", "Other Questions"];

const summaries: any = {
  "Technical": [
    { question: "What technologies are you currently learning?", answer: "I'm currently learning TypeScript, AWS services, and advanced Python for automation." },
    { question: "Do you have experience with cloud computing?", answer: "Yes, I've used AWS and Firebase for hosting and cloud services." },
    { question: "What’s the most challenging project you've worked on?", answer: "A large-scale web scraping project that involved handling thousands of data points daily." },
    { question: "What’s your biggest strength as a developer?", answer: "Adapting quickly to new technologies and solving problems efficiently." },
  ],
  
  "Get to Know Me": [
    { question: "What's your favorite hobby?", answer: "Short answer, Ultimate Frisbee. I do enjoy other activities whether it is volleyball, coding, basketball, carpentry, golfing, etc. However, Ultimate Frisbee is my favorite." },
    { question: "Where are you from?", answer: "I'm from McAllen, TX. I moved to San Antonio in 2015 for university." },
    { question: "What inspired you to become a developer?", answer: "I’ve always been curious about how things work. Once I built my first website, I was hooked." },
    { question: "What do you do outside of coding?", answer: "I enjoy playing Ultimate Frisbee, watching basketball, and working on side projects." },
  ],

  "Other Questions": [
    { question: "Do you do freelance work?", answer: "Yes, I usually email or go to small businesses and offer my work." },
    { question: "What's your approach to problem-solving?", answer: "I break problems into smaller parts, research solutions, and test different approaches." },
    { question: "Do you mentor other developers?", answer: "Yes! I enjoy helping junior devs by answering questions and reviewing code." },
    
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
  const [activeCategory, setActiveCategory] = useState("Get to Know Me");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeImageId, setActiveImageId] = useState(images[0].id);
  const [isDragging, setIsDragging] = useState(false); // Track dragging state

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (_: any) => {
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
    <div className="summary-container">

      <h1 className="summary-title">Common Questions, Clear Answers</h1>
      {/* Animated Category Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        {categories.map((category:any) => (
          <motion.button
            key={category}
            className="category-button"
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
                className="category-button-background"
                layoutId="activeBackground"
                transition={{ duration: 0.3 }}
              />
            )}
            <motion.div
              className="category-button-underline"
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
          className="questions-list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {summaries[activeCategory].map((item:any, index:any) => (
            <motion.div
              key={index}
              className="question-item"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              {/* Animated Dot */}
              <motion.div
                className={`question-dot transition-all duration-300
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
                  className="question-text"
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.question}
                </motion.h3>
                <motion.div
                  className="answer-text"
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

      <h1 className="summary-title">Still Shots, Always Moving</h1>
      <div className="image-gallery">
      <motion.div
        className="image-scroll-container"
        drag="x"
        dragConstraints={{ left: -500, right: 500 }}
        dragElastic={0.2}
        onDragStart={handleDragStart} // Track when dragging starts
        onDragEnd={handleDragEnd}
      >
        {images.map((image:any) => (
          <motion.div
            key={image.id}
            className={`image-item ${
              activeImageId === image.id
                ? "image-item-active"  // Zoom in effect on active image
                : "image-item-inactive"
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
              className="image"
              whileHover={{ scale: 1.02 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
    </div>
  );
};

