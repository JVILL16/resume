import { useState } from "react";
import { login } from "../../APIHelper";

export default function ClientLogin() {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState("");

  async function handleLogin() {
    setLoading(true);
    setErr("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const res = await login(username, password);

      if (!res || res.status !== 200) {
        setErr(res?.message || "Invalid login credentials");
        setLoading(false);
        return;
      }
      localStorage.setItem("client_token", res.data.token);
      window.location.href = "/client/dashboard";
    } catch (err) {
      console.error(err);
      setErr("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white/30 backdrop-blur-md shadow-xlw-full h-screen sm:bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-white relative overflow-hidden">

      {/* Ambient background glows */}
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 sm:bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-300"></div>

      {/* Container */}
      <div
        className="
          w-full max-w-sm
          px-6
          sm:px-8 sm:py-8
          sm:rounded-2xl
          sm:bg-white/30 sm:backdrop-blur-md sm:shadow-xl
          relative animate-slideUp
        "
      >
        {/* Logo */}
        <div className="w-full flex justify-center mb-4 relative z-10">
          <div className="sm:w-72 overflow-hidden">
            <img
              src="/clientportal/spuLogo.png"
              alt="Logo"
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center mb-6 text-md font-semibold tracking-wide">
          Secure Client Portal
        </h2>

        {/* Form */}
        <div className="relative z-10">
          <input
            className="
              w-full p-3 mb-3
              bg-gray-700/40 border border-gray-600 rounded-lg
              focus:outline-none focus:border-blue-500 transition
            "
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="
              w-full p-3 mb-3
              bg-gray-700/40 border border-gray-600 rounded-lg
              focus:outline-none focus:border-blue-500 transition
            "
            placeholder="Password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />

          {error && (
            <p className="text-yellow-300 text-sm mb-4 flex items-center gap-2 animate-shake">
              ⚠️ {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full p-3 rounded-lg
              bg-gradient-to-r from-yellow-400 to-yellow-500
              text-gray-900 font-semibold
              hover:from-yellow-300 hover:to-yellow-400 transition
              disabled:opacity-60 disabled:cursor-wait
              flex justify-center items-center
            "
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
