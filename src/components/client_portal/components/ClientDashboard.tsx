import { useEffect, useState } from "react";
import { getItems } from "../../APIHelper";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ClientDashboard() {
  const token = localStorage.getItem("client_token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (!token) {
      setError("No authentication token found.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await getItems(token);
        console.log(res);
        if (!res || res.error) {
          throw new Error(res?.error || "Failed to fetch data");
        }

        if (Array.isArray(res.data) && res.data.length === 0) {
          setItems([]);
        } else {
          setItems(res.data || []);
        }
      } catch (err: any) {
        setError(err.message || "Server error");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      }
    };

    fetchData();

    
  }, [token]);

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
    <div className="min-h-screen bg-gray-900 text-white p-6 animate-fade-in">
      <h1 className="text-3xl mb-6 font-semibold">Client Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            <h3 className="text-lg mb-2 font-medium">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
