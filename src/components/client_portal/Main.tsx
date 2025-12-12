// src/components/Layout.tsx
import ClientDashboard from "./components/ClientDashboard";
import Navbar from "./components/Navbar";

export default function Main() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <ClientDashboard />
    </div>
  );
}
