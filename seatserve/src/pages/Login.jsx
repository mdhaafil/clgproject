import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Back from "../components/Back.jsx";

const API = `${import.meta.env.VITE_API_URL}/api`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API}/auth/login`, { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") navigate("/admin");
      else alert("Not an admin");
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Back />
      <div className="min-h-screen flex items-center justify-center bg-[#0B0B0B]">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#1A1A1A] p-10 rounded-2xl shadow-2xl w-[360px] border border-[#FFC107]/20"
        >
          <h2 className="mb-6 text-3xl font-bold text-center text-[#E50914]">
            SeatServe Admin
          </h2>

          <p className="text-[#B3B3B3] text-center mb-8">
            Login to manage food orders
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              className="w-full px-4 py-3 rounded-xl bg-black text-white outline-none border border-[#333] focus:border-[#FFC107] transition"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-black text-white outline-none border border-[#333] focus:border-[#FFC107] transition"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold bg-[#E50914] text-white shadow-lg hover:shadow-red-600/40 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          <div className="mt-8 text-center text-[#FFC107] text-sm tracking-wide">
            Secure Admin Panel
          </div>
        </motion.div>
      </div>
    </div>
  );
}
