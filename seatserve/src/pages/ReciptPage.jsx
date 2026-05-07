import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000";

export default function ReceiptPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReceipt();
  }, []);

  const fetchReceipt = async () => {
    try {
      const res = await axios.get(`${API}/payment/receipt/${id}`);
      setOrder(res.data);
      setLoading(false);
    } catch {
      alert("Failed to load receipt");
    }
  };

  if (loading) return <h2 style={loader}>Loading SeatServe receipt...</h2>;

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>🎟 SeatServe Receipt</h1>

        <p style={sub}>Order ID</p>
        <p style={idText}>{order._id}</p>

        <div style={paid}>✓ Payment Successful</div>

        <section>
          <h3 style={section}>🎬 Seats</h3>
          <p style={seatText}>{order.seats.join(", ")}</p>
        </section>

        <section>
          <h3 style={section}>🍿 Food Items</h3>

          {order.items.map((item, i) => (
            <div key={i} style={{ ...row, animationDelay: `${i * 0.12}s` }}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </section>

        <div style={totalBox}>₹{order.totalAmount}</div>

        <div style={actions}>
          <button style={btnPrimary} onClick={() => navigate("/")}>
            Home
          </button>

          <button
            style={btnTrack}
            onClick={() => navigate(`/track/${order._id}`)}
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  background: "radial-gradient(circle at top, #151515 0%, #000 65%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  animation: "fade 1s ease",
};

const card = {
  background: "#111",
  padding: 34,
  borderRadius: 22,
  width: 430,
  boxShadow: "0 0 40px rgba(229,9,20,.6)",
  animation: "slideUp .8s ease",
};

const title = {
  textAlign: "center",
  color: "#E50914",
  marginBottom: 8,
  fontSize: 30,
};

const sub = {
  textAlign: "center",
  color: "#999",
  fontSize: 13,
};

const idText = {
  textAlign: "center",
  fontSize: 14,
  marginBottom: 14,
};

const paid = {
  background: "linear-gradient(90deg,#E50914,#ff5252)",
  padding: "8px 16px",
  borderRadius: 20,
  textAlign: "center",
  fontWeight: "bold",
  marginBottom: 18,
  animation: "pulse 1.4s infinite",
};

const section = {
  marginTop: 18,
  marginBottom: 6,
  color: "#FFC107",
};

const seatText = {
  color: "#ddd",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  padding: "6px 0",
  animation: "fadeUp .6s ease forwards",
};

const totalBox = {
  marginTop: 24,
  textAlign: "center",
  fontSize: 36,
  color: "#FFC107",
  animation: "pulseGold 1.6s infinite",
};

const actions = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 28,
};

const btnPrimary = {
  background: "#333",
  color: "white",
  border: "none",
  padding: "12px 22px",
  borderRadius: 12,
  cursor: "pointer",
};

const btnTrack = {
  background: "#E50914",
  color: "white",
  border: "none",
  padding: "12px 22px",
  borderRadius: 12,
  cursor: "pointer",
};

const loader = {
  color: "white",
  textAlign: "center",
  fontSize: 22,
};

/* ================= ANIMATIONS ================= */

<style>{`
@keyframes fadeUp {
  from {opacity:0; transform:translateY(25px)}
  to {opacity:1; transform:translateY(0)}
}

@keyframes pulse {
  0% {box-shadow:0 0 0 #E50914}
  50% {box-shadow:0 0 25px #E50914}
  100% {box-shadow:0 0 0 #E50914}
}
`}</style>;
