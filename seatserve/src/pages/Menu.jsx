import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const theme = {
  bg: "#0B0B0B",
  card: "#1A1A1A",
  primary: "#E50914",
  secondary: "#FFC107",
  text: "#E50914",
  muted: "#B3B3B3",
};

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/api/products`);
        setItems(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToCart = async (p) => {
    if (p.stock === 0) {
      alert("This item is out of stock!");
      return;
    }

    try {
      await axios.post(`${API}/cart/add`, {
        productId: p._id,
        name: p.name,
        price: p.afterPrice,
        image: p.image,
        stock: p.stock,
      });

      navigate("/cartnew");
    } catch (err) {
      console.error("Cart error:", err);
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: theme.bg }}>
      <Header />
      <br /><br /><br />

      <div style={{ padding: 30, flex: 1 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: theme.text }}>
          🎬 SeatServe Menu
        </h1>

        {loading && (
          <p style={{ color: theme.muted, marginTop: 20 }}>
            Loading menu...
          </p>
        )}

        {!loading && items.length === 0 && (
          <p style={{ color: theme.muted, marginTop: 20 }}>
            No items available
          </p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 24,
            marginTop: 30,
          }}
        >
          {items.map((p) => (
            <div key={p._id} style={cardStyle}>
              {p.stock === 0 && (
                <div style={outOfStockBadge}>Out of Stock</div>
              )}

              <img
                src={`${API}${p.image}`}
                alt={p.name}
                style={imageStyle}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />

              <div style={{ padding: 14 }}>
                <span style={{ color: theme.secondary, fontSize: 12 }}>
                  {p.category}
                </span>

                <h3 style={{ margin: "6px 0", color: theme.text }}>
                  {p.name}
                </h3>

                <p style={{ fontSize: 13, color: theme.muted }}>
                  {p.description}
                </p>

                <div style={priceRow}>
                  <span style={strikePrice}>₹{p.beforePrice}</span>
                  <span style={finalPrice}>₹{p.afterPrice}</span>
                </div>

                <div style={{ color: theme.primary, fontSize: 12 }}>
                  {p.offer}% OFF
                </div>

                <div style={{ marginTop: 6 }}>
                  {p.stock > 0 ? (
                    <span style={{ color: theme.muted, fontSize: 12 }}>
                      Available: {p.stock}
                    </span>
                  ) : (
                    <span style={{ color: "red", fontSize: 12 }}>
                      Currently unavailable
                    </span>
                  )}
                </div>

                {p.stock > 0 && p.stock <= 5 && (
                  <div style={lowStock}>Only {p.stock} left 🔥</div>
                )}

                <button
                  style={{
                    ...buttonStyle,
                    background: p.stock === 0 ? "#555" : theme.primary,
                    cursor: p.stock === 0 ? "not-allowed" : "pointer",
                  }}
                  disabled={p.stock === 0}
                  onClick={() => addToCart(p)}
                >
                  {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* ================= STYLES ================= */

const cardStyle = {
  background: "#1A1A1A",
  borderRadius: 18,
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
  position: "relative",
};

const outOfStockBadge = {
  position: "absolute",
  top: 10,
  right: 10,
  background: "red",
  padding: "4px 8px",
  fontSize: 10,
  borderRadius: 6,
  color: "white",
  fontWeight: "bold",
};

const lowStock = {
  color: "#FFC107",
  fontSize: 11,
  marginTop: 4,
};

const imageStyle = {
  width: "100%",
  height: 150,
  objectFit: "cover",
};

const priceRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 6,
};

const strikePrice = {
  textDecoration: "line-through",
  color: "#B3B3B3",
  fontSize: 13,
};

const finalPrice = {
  color: "#FFC107",
  fontWeight: 800,
  fontSize: 18,
};

const buttonStyle = {
  marginTop: 12,
  width: "100%",
  padding: 10,
  color: "#FFFFFF",
  border: "none",
  borderRadius: 12,
  fontWeight: 700,
};