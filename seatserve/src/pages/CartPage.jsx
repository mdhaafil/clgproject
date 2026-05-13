import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";

const API = `${import.meta.env.VITE_API_URL}/api`;

const theme = {
  bg: "#0B0B0B",
  card: "#1A1A1A",
  primary: "#E50914",
  secondary: "#FFC107",
  text: "#E50914",
  muted: "#B3B3B3",
};

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await axios.get(`${API}/cart`);
    setCart(res.data);
    setLoading(false);
  };

  const updateQty = async (item, qty) => {
    if (qty > item.stock) {
      alert("Cannot exceed available stock!");
      return;
    }

    try {
      if (qty <= 0) {
        await axios.delete(`${API}/cart/${item._id}`);
      } else {
        await axios.put(`${API}/cart/${item._id}`, {
          quantity: qty,
        });
      }

      fetchCart();
    } catch (err) {
      console.error("Qty update failed", err);
    }
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div style={{ background: theme.bg, minHeight: "100vh" }}>
      <Header /> <br /> <br />
      <div style={{ padding: 30, maxWidth: 900, margin: "auto" }}>
        <h1 style={{ color: theme.text, fontSize: 32, fontWeight: 900 }}>
          🛒 Your Cart
        </h1>

        {loading && <p style={{ color: theme.muted }}>Loading cart...</p>}

        {!loading && cart.length === 0 && (
          <p style={{ color: theme.muted }}>Your cart is empty</p>
        )}

        {cart.map((item) => (
          <div key={item._id} style={cardStyle}>
            <img
              src={`${API}${item.image}`}
              alt={item.name}
              style={imageStyle}
            />

            <div style={{ flex: 1 }}>
              <h3 style={{ color: theme.text }}>{item.name}</h3>

              <p style={{ color: theme.secondary, fontWeight: 700 }}>
                ₹{item.price}
              </p>

              <p style={{ color: theme.muted, fontSize: 12 }}>
                Available: {item.stock}
              </p>

              <div style={qtyBox}>
                <button onClick={() => updateQty(item, item.quantity - 1)}>
                  −
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => updateQty(item, item.quantity + 1)}>
                  +
                </button>
              </div>
            </div>

            <div style={{ color: theme.text, fontWeight: 700 }}>
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}

        {cart.length > 0 && (
          <div style={totalBox}>
            <h2>Total: ₹{total}</h2>

            <button
              style={checkoutBtn}
              onClick={() => navigate("/seatselection")}
            >
              Select Seats 🎟️
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

/* ---------- styles ---------- */

const cardStyle = {
  display: "flex",
  gap: 20,
  background: "#1A1A1A",
  padding: 18,
  borderRadius: 18,
  marginTop: 16,
  alignItems: "center",
  boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
};

const imageStyle = {
  width: 90,
  height: 90,
  objectFit: "cover",
  borderRadius: 12,
};

const qtyBox = {
  display: "flex",
  gap: 12,
  alignItems: "center",
  marginTop: 10,
  color: "white",
};

const totalBox = {
  marginTop: 30,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "white",
  fontWeight: 900,
  fontSize: 22,
};

const checkoutBtn = {
  background: "#E50914",
  border: "none",
  padding: "12px 30px",
  borderRadius: 14,
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
};
