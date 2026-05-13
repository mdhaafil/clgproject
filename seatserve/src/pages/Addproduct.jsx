import { useState } from "react";
import axios from "axios";
import Back from "../components/Back.jsx";

const API = `${import.meta.env.VITE_API_URL}/api`;

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    beforePrice: "",
    offer: "",
    afterPrice: 0,
    stock: "", // ✅ STOCK ADDED
    image: null,
  });

  const calculatePrice = (before, offer) => {
    if (!before || !offer) return 0;
    return Math.round(before - (before * offer) / 100);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
      return;
    }

    if (name === "beforePrice" || name === "offer") {
      const updated = { ...form, [name]: value };
      updated.afterPrice = calculatePrice(updated.beforePrice, updated.offer);
      setForm(updated);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));

    try {
      await axios.post(`${API}/api/products`, fd);
      alert("✅ Product Added With Stock");
    } catch {
      alert("❌ Failed to add product");
    }
  };

  return (
    <div style={{ background: "#0B0B0B", minHeight: "100vh" }}>
      <Back />
      <div style={container}>
        <form onSubmit={submit} style={formStyle}>
          <h2 style={{ color: "#E50914" }}>🍿 Add Product</h2>

          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="category"
            placeholder="Category"
            onChange={handleChange}
            style={inputStyle}
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="number"
            name="beforePrice"
            placeholder="Before Price"
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="number"
            name="offer"
            placeholder="Offer %"
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            value={`After Price: ₹${form.afterPrice}`}
            readOnly
            style={inputStyle}
          />

          {/* ✅ STOCK FIELD */}
          <input
            type="number"
            name="stock"
            placeholder="Total Stock"
            onChange={handleChange}
            style={inputStyle}
          />

          <input type="file" name="image" onChange={handleChange} />

          <button style={buttonStyle}>Add Product</button>
        </form>
      </div>
    </div>
  );
}

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
};

const formStyle = {
  background: "#1A1A1A",
  padding: 30,
  borderRadius: 20,
  width: 400,
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const inputStyle = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #333",
  background: "#0B0B0B",
  color: "white",
};

const buttonStyle = {
  padding: 12,
  background: "#E50914",
  border: "none",
  borderRadius: 10,
  color: "white",
  cursor: "pointer",
};
