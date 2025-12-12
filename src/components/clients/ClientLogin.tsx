import { useState } from "react";
import { login } from "../APIHelper";

export default function ClientLogin() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState("");

async function handleLogin() {
  setLoading(true);
  setErr(""); // clear previous errors

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const res = await login(email, password);
    // Check for API error
    if (!res || res.status !== 200) {
      setErr("Login failed: " + (res?.message || "Unknown error"));
      setLoading(false);
      return;
    }

    // Success — store token
    localStorage.setItem("client_token", res.data.token);
    window.location.href = "/client/dashboard";

  } catch (err: any) {
    console.error(err);
    setErr("Server error. Please try again later.");
    setLoading(false);
  }
}


  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-white relative overflow-hidden">

      {/* Background floating lights */}
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-300"></div>

      {/* Portal Card */}
      <div className="w-80 p-8 rounded-2xl bg-white/30 backdrop-blur-md shadow-xl relative animate-slideUp">

        {/* Logo on top of inputs */}
        <div className="w-full flex justify-center mb-6 z-10 relative">
          <div className="w-64 h-50 overflow-hidden flex items-center justify-center">
            <img
              src="/clientportal/spuLogo.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Title between logo and inputs */}
        <h2 className="text-center mb-6 text-lg font-bold tracking-wide relative z-10">
          Secure Portal
        </h2>

        {/* Inputs & Button */}
        <div className="relative z-10">
          <input
            className="w-full p-2 mb-3 bg-gray-700/40 border border-gray-600 rounded
                       focus:outline-none focus:border-blue-500 transition"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-2 mb-3 bg-gray-700/40 border border-gray-600 rounded
                       focus:outline-none focus:border-blue-500 transition"
            placeholder="Password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />

          {error && (
            <p className="text-red-300 text-sm mb-3 animate-shake">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full p-2 rounded-lg 
            !bg-white/10 backdrop-blur-md text-white 
            hover:!bg-white/20 transition 
              disabled:opacity-50 disabled:cursor-wait
              flex justify-center items-center
            ">
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
