import { useState } from "react";
import { login } from "../APIHelper.ts";

export default function ClientLogin() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    const res = await login(email, password);
    if (res.error) return setError(res.error);

    localStorage.setItem("clientToken", res.token);
    window.location.href = "/client";
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-xl w-80">
        <h1 className="text-xl mb-4">Client Login</h1>

        <input className="w-full p-2 mb-3"
               placeholder="Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)} />

        <input type="password"
               className="w-full p-2 mb-3"
               placeholder="Password"
               value={password}
               onChange={(e) => setPass(e.target.value)} />

        {error && <p className="text-red-300 mb-3">{error}</p>}

        <button onClick={handleLogin}
                className="w-full bg-blue-600 p-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
}
