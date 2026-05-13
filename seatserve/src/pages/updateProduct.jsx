import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Back from "../components/Back.jsx";

const API = `${import.meta.env.VITE_API_URL}/api`;


export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    beforePrice: "",
    offer: "",
    afterPrice: 0,
    category: "",
    description: "",
    stock: "",
    image: null,
  });

  const [preview, setPreview] = useState("");

  const calculatePrice = (before, offer) => {
    if (!before || !offer) return 0;
    return Math.round(before - (before * offer) / 100);
  };

  useEffect(() => {
    fetch(`${API}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct({
          ...data,
          image: null,
        });
        setPreview(`${API}${data.image}`);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = { ...product, [name]: value };
    updated.afterPrice = calculatePrice(updated.beforePrice, updated.offer);

    setProduct(updated);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(product).forEach(([k, v]) => {
      if (v !== null) fd.append(k, v);
    });

    await fetch(`${API}/api/products/${id}`, {
      method: "PUT",
      body: fd,
    });

    alert("✅ Product Updated");
    // navigate("/menu");
  };

  return (
    <div style={{ background: "#0B0B0B", minHeight: "100vh" }}>
      <Back />
      <div style={container}>
        <form onSubmit={submit} style={formStyle}>
          <h2 style={{ color: "#E50914" }}>🎬 Update Product</h2>

          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="beforePrice"
            value={product.beforePrice}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="offer"
            value={product.offer}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            value={`After Price: ₹${product.afterPrice}`}
            readOnly
            style={inputStyle}
          />
          <input
            name="category"
            value={product.category}
            onChange={handleChange}
            style={inputStyle}
          />
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Update Stock"
            style={inputStyle}
          />

          <input type="file" onChange={handleImage} />

          {preview && (
            <img
              src={preview}
              alt="preview"
              style={{ width: 150, borderRadius: 10 }}
            />
          )}

          <button style={buttonStyle}>Update</button>
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
