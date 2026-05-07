import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccess("Registration Successful!");
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F]">
      <div className="bg-[#1A1A1A] p-8 rounded-xl shadow-lg w-96">
        <h2 className="mb-6 text-2xl font-bold text-center text-red-600">
          Admin Register
        </h2>

        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
        {success && <p className="mb-3 text-sm text-green-500">{success}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Admin Name"
            className="w-full p-2 mb-4 rounded bg-[#2A2A2A] text-white outline-none"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-2 mb-4 rounded bg-[#2A2A2A] text-white outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mb-4 rounded bg-[#2A2A2A] text-white outline-none"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-2 mb-6 rounded bg-[#2A2A2A] text-white outline-none"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-[#B11226] text-white py-2 rounded hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-[#B11226]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
