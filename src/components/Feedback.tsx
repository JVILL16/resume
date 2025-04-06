import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import '../styles/Feedback.css';


type FeedbackFormData = {
  email: string;
  type: string;
  title: string;
  request: string;
};


export default function Feedback() {
  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccessMessage] = useState<string | null>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FeedbackFormData>();

  const onSubmit = async (data: FeedbackFormData) => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("https://sagepaths.dev.api.sagejherm.co/api/feedback/fbResume_insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      const responseData = await response.json();
      if (!response.ok) throw new Error("Failed to submit feedback. " + responseData.message);
      else setSuccessMessage(responseData.message);

      setTimeout(() => {
        setSuccessMessage("");
        reset();
      }, 3000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      handleClose
      setLoading(false);
    }
  };

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
        <>
          {!success && (


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

              {/** Feedback Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-field"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <select
                  className="select-field"
                  {...register("type", { required: "Please select an issue" })}
                >
                  <option value="">Select an issue</option>
                  <option>Bug</option>
                  <option>Billing</option>
                  <option>Feature</option>
                  <option>Error</option>
                  <option>Typo</option>
                  <option>Other</option>
                </select>
                {errors.type && <p className="text-red-500">{errors.type.message}</p>}

                <input
                  type="text"
                  placeholder="Subject"
                  className="input-field"
                  {...register("title", { required: "Subject is required" })}
                />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                <textarea
                  placeholder="Enter your comments"
                  className="textarea-field"
                  {...register("request", { required: "Comments are required" })}
                ></textarea>
                {errors.request && <p className="text-red-500">{errors.request.message}</p>}

                {error && <p className="text-red-500">{error}</p>}

                <motion.button
                  type="submit"
                  className="submit-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </motion.button>
              </form>
            </motion.div>



          )
          }
          {/* Display success message with animation */}
          {success && (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {success}
            </motion.div>
          )}

          {/* Display error message with animation */}
          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.div>
          )}
          
        </>
      )}
    </div>
  );

}
