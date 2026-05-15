import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import Back from "../components/Back.jsx";

const API = import.meta.env.VITE_API_URL;

const Update = () => {
  const [products, setProducts] =
    useState([]);

  const navigate =
    useNavigate();

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts =
    async () => {
      try {
        const res =
          await axios.get(
            `${API}/api/products`
          );

        setProducts(
          Array.isArray(
            res.data
          )
            ? res.data
            : []
        );
      } catch (err) {
        console.error(
          "Product fetch failed",
          err
        );
      }
    };

  /* ================= DELETE PRODUCT ================= */

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this product?"
        );

      if (!confirmDelete)
        return;

      try {
        await axios.delete(
          `${API}/api/products/${id}`
        );

        setProducts(
          products.filter(
            (p) => p._id !== id
          )
        );

        alert(
          "🗑 Product deleted successfully"
        );
      } catch (error) {
        console.error(
          "Delete failed",
          error
        );

        alert(
          "❌ Failed to delete product"
        );
      }
    };

  return (
    <div className="relative min-h-screen">
      <Back />

      <div
        style={{
          backgroundColor:
            "#0B0B0B",
        }}
        className="min-h-screen px-6 py-10"
      >
        {/* ================= TITLE ================= */}

        <h1
          style={{
            color: "#FFC107",
          }}
          className="mb-12 text-4xl font-extrabold tracking-wider text-center"
        >
          🍿 SeatServe Menu
          (Admin)
        </h1>

        {/* ================= PRODUCTS ================= */}

        <div className="grid grid-cols-1 gap-10 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div
              key={p._id}
              style={{
                backgroundColor:
                  "#1A1A1A",
              }}
              className="p-5 transition-all duration-300 border shadow-xl rounded-3xl border-white/10 hover:-translate-y-2 hover:shadow-red-600/30"
            >
              {/* IMAGE */}

              <div className="overflow-hidden rounded-2xl">
                <img
                  src={`${API}${p.image}`}
                  alt={p.name}
                  className="object-cover w-full transition-transform duration-500 h-52 hover:scale-110"
                  onError={(
                    e
                  ) =>
                    (e.currentTarget.style.display =
                      "none")
                  }
                />
              </div>

              {/* INFO */}

              <h3 className="mt-5 text-xl font-bold text-white">
                {p.name}
              </h3>

              <p
                style={{
                  color:
                    "#B3B3B3",
                }}
                className="mt-1 text-sm tracking-wide uppercase"
              >
                {p.category}
              </p>

              <p
                style={{
                  color:
                    "#B3B3B3",
                }}
                className="mt-3 text-sm line-clamp-2"
              >
                {p.description}
              </p>

              {/* STOCK */}

              <div className="mt-3">
                {p.stock > 0 ? (
                  <span className="text-sm text-green-400">
                    Available:
                    {" "}
                    {p.stock}
                  </span>
                ) : (
                  <span className="text-sm text-red-500">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* PRICE */}

              <div className="flex items-center gap-3 mt-5">
                <span
                  style={{
                    color:
                      "#B3B3B3",
                  }}
                  className="text-sm line-through"
                >
                  ₹
                  {p.beforePrice}
                </span>

                <span className="text-2xl font-extrabold text-white">
                  ₹
                  {p.afterPrice}
                </span>

                <span
                  style={{
                    backgroundColor:
                      "#FFC107",
                  }}
                  className="px-3 py-1 text-xs font-bold text-black rounded-full"
                >
                  {p.offer}
                  % OFF
                </span>
              </div>

              {/* BUTTONS */}

              <div className="flex gap-3 mt-6">
                {/* UPDATE */}

                <button
                  style={{
                    backgroundColor:
                      "#E50914",
                  }}
                  className="flex-1 py-3 font-bold tracking-wide text-white transition-all shadow-lg rounded-xl hover:opacity-90 shadow-red-600/40"
                  onClick={() =>
                    navigate(
                      `/updates/${p._id}`
                    )
                  }
                >
                  Update
                </button>

                {/* DELETE */}

                <button
                  style={{
                    backgroundColor:
                      "#E50914",
                  }}
                  className="flex-1 py-3 font-bold tracking-wide text-white transition-all shadow-lg rounded-xl hover:opacity-90 shadow-red-500/40"
                  onClick={() =>
                    handleDelete(
                      p._id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY */}

        {products.length ===
          0 && (
          <div className="mt-20 text-2xl text-center text-gray-500">
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default Update;