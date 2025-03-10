// Feedback.tsx

import { useState } from 'react';

export default function Feedback() {
  const [email, setEmail] = useState('');
  const [issue, setIssue] = useState('');
  const [subject, setSubject] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to API)
    console.log({ email, issue, subject, comments });
  };

  return (
    <div className=" bottom-4 bg-white text-black shadow-lg p-6 rounded-lg max-w-sm w-full">
    <h2 className="text-xl font-semibold mb-4">Feedback</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="issue" className="block text-sm font-medium">Issue</label>
        <select
          id="issue"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select an issue</option>
          <option value="technical">Technical Issue</option>
          <option value="billing">Billing</option>
          <option value="account">Account Issue</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Subject"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="comments" className="block text-sm font-medium">Comments</label>
        <textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your comments"
          rows={4}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none"
      >
        Submit
      </button>
    </form>
  </div>
  );
};


