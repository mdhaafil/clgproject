import { useState } from "react";
import axios from "axios";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const theme = {
  bg: "#0B0B0B",
  card: "#1A1A1A",
  primary: "#E50914",
  secondary: "#E50914",
  text: "#FFFFFF",
  muted: "#B3B3B3",
};
const API = `${import.meta.env.VITE_API_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await axios.post(`${API}/contact`, form);
      setSuccess("✅ Your query has been submitted!");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("❌ Failed to submit. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: theme.bg }}
    >
      <Header /> <br /> <br /> <br /> <br /> <br />
      <div className="flex items-center justify-center flex-1 px-4">
        <form
          onSubmit={handleSubmit}
          style={{ background: theme.card }}
          className="w-full max-w-lg p-8 shadow-2xl rounded-3xl animate-fadeIn"
        >
          <h2
            style={{ color: theme.secondary }}
            className="mb-6 text-3xl font-extrabold text-center"
          >
            📞 Contact SeatServe
          </h2>

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 text-white bg-black outline-none rounded-xl"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 text-white bg-black outline-none rounded-xl"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 text-white bg-black outline-none rounded-xl"
          />

          {/* Query */}
          <textarea
            name="message"
            placeholder="Your Query"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 text-white bg-black outline-none rounded-xl"
          />

          {/* Messages */}
          {success && <p className="mb-3 text-green-400">{success}</p>}
          {error && <p className="mb-3 text-red-500">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{ background: theme.primary }}
            className="w-full py-3 font-bold transition transform rounded-xl hover:scale-105 hover:bg-[#FFC107] hover:text-black"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
