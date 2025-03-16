import { useState } from "react";
import { motion } from "framer-motion";

export default function Feedback() {
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [subject, setSubject] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, issue, subject, comments });
  };

  return (
    <motion.div
      className="bg-gray-800 text-white p-6 rounded-xl shadow-xl border  w-[600px] mx-auto"
      style={{ boxShadow: "0 0 5px rgba(255, 255, 255, 0.5)"}}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold text-center mb-6">Feedback</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-3 w-full bg-gray-800 border border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Issue Selection */}
        <div>
          <label htmlFor="issue" className="block text-sm font-medium text-gray-300">Issue</label>
          <select
            id="issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="mt-1 p-3 w-full bg-gray-800 border border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            required
          >
            <option value="">Select an issue</option>
            <option value="technical">Technical Issue</option>
            <option value="billing">Billing</option>
            <option value="account">Account Issue</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 p-3 w-full bg-gray-800 border border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            placeholder="Subject"
            required
          />
        </div>

        {/* Comments */}
        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-300">Comments</label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="mt-1 p-3 w-full h-32 resize-none bg-gray-800 border border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            placeholder="Enter your comments"
            rows={4}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold 
                     hover:bg-blue-600 transition-all shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit Feedback
        </motion.button>
      </form>
    </motion.div>
  );
}
