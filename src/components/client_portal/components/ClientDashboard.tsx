import { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

interface Item {
  id: number;
  name: string;
  status: string;
  amount: number;
}

export default function ClientDashboard() {
  const token = localStorage.getItem("client_token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (!token) {
      setError("No authentication token found.");
      setLoading(false);
      return;
    }

    const fetchFakeData = async () => {
      try {
        // simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Fake dashboard items
        const fakeData: Item[] = [
          { id: 1, name: "Project Alpha", status: "Active", amount: 1250 },
          { id: 2, name: "Project Beta", status: "Pending", amount: 980 },
          { id: 3, name: "Project Gamma", status: "Completed", amount: 2400 },
          { id: 4, name: "Project Delta", status: "Active", amount: 1800 },
          { id: 5, name: "Project Epsilon", status: "Pending", amount: 560 },
          { id: 6, name: "Project Zeta", status: "Active", amount: 3200 },
        ];

        setItems(fakeData);

      } catch (err: any) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchFakeData();
  }, [token]);

  const totalProjects = items.length;
  const totalRevenue = items.reduce((sum, item) => sum + item.amount, 0);
  const activeProjects = items.filter((i) => i.status === "Active").length;

  // Pie chart data
  const pieData = [
    { name: "Active", value: activeProjects },
    { name: "Pending", value: items.filter((i) => i.status === "Pending").length },
    { name: "Completed", value: items.filter((i) => i.status === "Completed").length },
  ];

  const COLORS = ["#FACC15", "#F59E0B", "#B45309"];
  // ------------------------------
  // Loading State
  // ------------------------------
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col items-center px-6 py-10">
        <div className="animate-spin w-16 h-16 rounded-full border-4 border-yellow-400 border-t-transparent mb-8"></div>

        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="p-4 bg-gray-800 rounded-xl shadow-md flex flex-col justify-between h-40"
            >
              <div className="space-y-3">
                <div className="h-5 w-1/3 bg-gray-700 rounded"></div>
                <div className="h-3 w-2/3 bg-gray-700 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-700 rounded"></div>
              </div>
              <div className="h-6 w-1/4 bg-yellow-600/40 rounded self-end"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ------------------------------
  // Error State
  // ------------------------------
  if (error) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-gray-900 px-6">
        <div className="
          bg-gradient-to-br from-yellow-500/20 to-yellow-700/20
          border border-yellow-400
          text-yellow-200
          rounded-xl p-6 max-w-md w-full
          text-center animate-fade-in shadow-lg backdrop-blur-sm
        ">
          <FaExclamationTriangle className="text-yellow-400 text-14 w-14 h-14 mx-auto mb-3 drop-shadow-md animate-pulse" />
          <h2 className="text-2xl font-semibold mb-2">Something Went Wrong</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => {
              localStorage.removeItem("client_token");
              window.location.href = "/client/login";
            }}
            className="
              px-6 py-2 rounded-lg
              bg-gradient-to-r from-yellow-500 to-yellow-600
              hover:from-yellow-600 hover:to-yellow-700
              transition font-medium text-gray-900
              shadow-md hover:shadow-yellow-500/40
            "
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // ------------------------------
  // Empty State
  // ------------------------------
  if (items.length === 0) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-gray-900 px-6">
        <div className="
          bg-gradient-to-br from-yellow-500/20 to-yellow-700/20
          border border-yellow-400
          text-yellow-200
          rounded-xl p-6 max-w-md w-full
          text-center animate-fade-in shadow-lg backdrop-blur-sm
        ">
          <FaExclamationTriangle className="text-yellow-400 w-14 h-14 mx-auto mb-3 drop-shadow-md animate-pulse" />
          <h2 className="text-2xl font-semibold mb-2">No Data Found</h2>
          <p className="text-yellow-300">Your dashboard is currently empty.</p>
        </div>
      </div>
    );
  }

  // ------------------------------
  // Main Dashboard
  // ------------------------------
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 animate-fade-in space-y-6">
      <h1 className="text-3xl font-semibold">Client Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition">
          <p className="text-gray-400">Total Projects</p>
          <h2 className="text-2xl font-bold">{totalProjects}</h2>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition">
          <p className="text-gray-400">Total Revenue</p>
          <h2 className="text-2xl font-bold">${totalRevenue.toLocaleString()}</h2>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition">
          <p className="text-gray-400">Active Projects</p>
          <h2 className="text-2xl font-bold">{activeProjects}</h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="mb-2 font-semibold">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={items.map((i, idx) => ({ name: i.name, amount: i.amount }))}
            >
              <XAxis dataKey="name" stroke="#FACC15"/>
              <YAxis stroke="#FACC15"/>
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#FACC15" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="mb-2 font-semibold">Project Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 p-4 rounded-lg shadow overflow-x-auto">
        <h3 className="mb-2 font-semibold">Project List</h3>
        <table className="w-full text-left table-auto">
          <thead className="text-gray-400 border-b border-gray-600">
            <tr>
              <th className="px-2 py-1">Project Name</th>
              <th className="px-2 py-1">Status</th>
              <th className="px-2 py-1">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                <td className="px-2 py-1">{item.name}</td>
                <td className="px-2 py-1 text-yellow-400">{item.status}</td>
                <td className="px-2 py-1">${item.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
