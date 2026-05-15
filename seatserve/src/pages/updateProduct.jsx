import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import Back from "../components/Back.jsx";

const API = import.meta.env.VITE_API_URL;

export default function UpdateProduct() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const [product, setProduct] =
    useState({
      name: "",
      beforePrice: "",
      offer: "",
      afterPrice: 0,
      category: "",
      description: "",
      stock: "",
      image: null,
    });

  const [preview, setPreview] =
    useState("");

  /* ================= PRICE ================= */

  const calculatePrice = (
    before,
    offer
  ) => {
    if (!before || !offer)
      return 0;

    return Math.round(
      before -
        (before * offer) / 100
    );
  };

  /* ================= FETCH PRODUCT ================= */

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct =
    async () => {
      try {
        const res =
          await axios.get(
            `${API}/api/products/${id}`
          );

        const data = res.data;

        setProduct({
          ...data,
          image: null,
        });

        setPreview(
          `${API}${data.image}`
        );
      } catch (err) {
        console.error(
          "Fetch product failed",
          err
        );

        alert(
          "Failed to load product"
        );
      }
    };

  /* ================= INPUT CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    const updated = {
      ...product,
      [name]: value,
    };

    updated.afterPrice =
      calculatePrice(
        updated.beforePrice,
        updated.offer
      );

    setProduct(updated);
  };

  /* ================= IMAGE ================= */

  const handleImage = (e) => {
    const file =
      e.target.files[0];

    if (!file) return;

    setProduct({
      ...product,
      image: file,
    });

    setPreview(
      URL.createObjectURL(file)
    );
  };

  /* ================= UPDATE ================= */

  const submit = async (e) => {
    e.preventDefault();

    try {
      const fd =
        new FormData();

      Object.entries(product)
        .forEach(([k, v]) => {
          if (v !== null) {
            fd.append(k, v);
          }
        });

      await axios.put(
        `${API}/api/products/${id}`,
        fd,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "✅ Product Updated Successfully"
      );

      navigate("/update");
    } catch (err) {
      console.error(
        "Update failed",
        err
      );

      alert(
        "❌ Failed to update product"
      );
    }
  };

  return (
    <div
      style={{
        background:
          "#0B0B0B",
        minHeight: "100vh",
      }}
    >
      <Back />

      <div style={container}>
        <form
          onSubmit={submit}
          style={formStyle}
        >
          <h2
            style={{
              color: "#E50914",
            }}
          >
            🎬 Update Product
          </h2>

          {/* NAME */}

          <input
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={
              handleChange
            }
            style={inputStyle}
          />

          {/* BEFORE PRICE */}

          <input
            type="number"
            name="beforePrice"
            placeholder="Before Price"
            value={
              product.beforePrice
            }
            onChange={
              handleChange
            }
            style={inputStyle}
          />

          {/* OFFER */}

          <input
            type="number"
            name="offer"
            placeholder="Offer %"
            value={product.offer}
            onChange={
              handleChange
            }
            style={inputStyle}
          />

          {/* AFTER PRICE */}

          <input
            value={`After Price: ₹${product.afterPrice}`}
            readOnly
            style={inputStyle}
          />

          {/* CATEGORY */}

          <input
            name="category"
            placeholder="Category"
            value={
              product.category
            }
            onChange={
              handleChange
            }
            style={inputStyle}
          />

          {/* DESCRIPTION */}

          <textarea
            name="description"
            placeholder="Description"
            value={
              product.description
            }
            onChange={
              handleChange
            }
            style={{
              ...inputStyle,
              minHeight: 100,
              resize: "none",
            }}
          />

          {/* STOCK */}

          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={
              handleChange
            }
            placeholder="Update Stock"
            style={inputStyle}
          />

          {/* IMAGE */}

          <input
            type="file"
            accept="image/*"
            onChange={
              handleImage
            }
            style={{
              color: "white",
            }}
          />

          {/* PREVIEW */}

          {preview && (
            <img
              src={preview}
              alt="preview"
              style={
                previewStyle
              }
            />
          )}

          {/* BUTTON */}

          <button
            style={
              buttonStyle
            }
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: 20,
};

const formStyle = {
  background: "#1A1A1A",
  padding: 30,
  borderRadius: 20,
  width: 420,
  display: "flex",
  flexDirection: "column",
  gap: 14,
  boxShadow:
    "0 0 35px rgba(229,9,20,.25)",
};

const inputStyle = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #333",
  background: "#0B0B0B",
  color: "white",
  outline: "none",
};

const buttonStyle = {
  padding: 14,
  background: "#E50914",
  border: "none",
  borderRadius: 12,
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: 16,
};

const previewStyle = {
  width: "100%",
  maxHeight: 240,
  objectFit: "cover",
  borderRadius: 14,
  marginTop: 10,
};