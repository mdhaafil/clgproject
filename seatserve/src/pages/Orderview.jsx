import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Back from "../components/Back.jsx";

const API = import.meta.env.VITE_API_URL;

export default function Orderview() {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  /* ================= FETCH ALL ORDERS ================= */

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${API}/admin/orders`
      );

      const data = res.data || [];

      setOrders(data);

      calculateSummary(data);
    } catch (err) {
      console.log(
        "Fetch all orders error:",
        err
      );
    }
  };

  /* ================= FETCH BY DATE ================= */

  const fetchOrdersByDate = async (date) => {
    try {
      const res = await axios.get(
        `${API}/admin/orders/date/${date}`
      );

      const data = res.data.orders || [];

      setOrders(data);

      setTotalOrders(
        res.data.totalOrders || 0
      );

      setTotalRevenue(
        res.data.totalRevenue || 0
      );
    } catch (err) {
      console.log(
        "Fetch by date error:",
        err
      );
    }
  };

  /* ================= AUTO REFRESH ================= */

  useEffect(() => {
    if (!selectedDate) {
      fetchOrders();

      const timer = setInterval(
        fetchOrders,
        5000
      );

      return () => clearInterval(timer);
    }
  }, [selectedDate]);

  /* ================= HANDLE DATE CHANGE ================= */

  const handleDateChange = (e) => {
    const date = e.target.value;

    setSelectedDate(date);

    if (!date) {
      fetchOrders();
    } else {
      fetchOrdersByDate(date);
    }
  };

  /* ================= CALCULATE SUMMARY ================= */

  const calculateSummary = (ordersData) => {
    const count = ordersData.length;

    const revenue = ordersData.reduce(
      (sum, order) =>
        sum + (order.totalAmount || 0),
      0
    );

    setTotalOrders(count);

    setTotalRevenue(revenue);
  };

  return (
    <div style={page}>
      <Back />

      <br />
      <br />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={title}
      >
        SeatServe Kitchen Orders
      </motion.h1>

      {/* DATE FILTER + SUMMARY */}

      <div style={filterBox}>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          style={dateInput}
        />

        <div style={summaryBox}>
          <span>
            Total Orders: {totalOrders}
          </span>

          <span>
            Total Revenue: ₹{" "}
            {new Intl.NumberFormat("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(totalRevenue)}
          </span>
        </div>
      </div>

      {/* ================= ORDER GRID ================= */}

      <div style={grid}>
        {orders.length === 0 ? (
          <div style={noOrders}>
            No orders placed on this date
          </div>
        ) : (
          orders.map((order, i) => (
            <motion.div
              key={order._id}
              style={card}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.05,
              }}
              whileHover={{ y: -6 }}
            >
              <div style={cardTop}>
                <span style={seatTag}>
                  Seat{" "}
                  {order.seats?.join(", ")}
                </span>

                <Status
                  status={order.foodStatus}
                />
              </div>

              <div style={items}>
                {order.items?.map((item) => (
                  <div
                    key={item._id || item.name}
                    style={itemRow}
                  >
                    <span>{item.name}</span>

                    <strong>
                      × {item.quantity}
                    </strong>
                  </div>
                ))}
              </div>

              <div style={total}>
                ₹ {order.totalAmount}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

/* ================= STATUS PILL ================= */

const Status = ({ status }) => {
  const map = {
    preparing: "#FFA726",
    "on the way": "#E50914",
    delivered: "#4CAF50",
  };

  return (
    <span
      style={{
        ...statusPill,
        background:
          map[status] || "#999",
      }}
    >
      {status}
    </span>
  );
};

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  background: "black",
  padding: 40,
};

const title = {
  fontSize: 32,
  fontWeight: 700,
  marginBottom: 20,
  color: "#E50914",
};

const filterBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 30,
  background: "#1B1B1B",
  padding: 20,
  borderRadius: 15,
  color: "red",
};

const dateInput = {
  padding: 10,
  borderRadius: 8,
  border: "none",
  fontSize: 14,
};

const summaryBox = {
  display: "flex",
  gap: 30,
  fontWeight: 600,
  fontSize: 16,
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fill,minmax(320px,1fr))",
  gap: 24,
};

const noOrders = {
  gridColumn: "1 / -1",
  textAlign: "center",
  fontSize: 22,
  color: "#999",
  marginTop: 50,
};

const card = {
  background: "gray",
  borderRadius: 20,
  padding: 22,
  boxShadow:
    "0 10px 28px rgba(229,9,20,.12)",
  display: "flex",
  flexDirection: "column",
  border:
    "1px solid rgba(229,9,20,.15)",
};

const cardTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 14,
};

const seatTag = {
  background: "#E50914",
  color: "white",
  padding: "6px 14px",
  borderRadius: 14,
  fontSize: 14,
};

const statusPill = {
  color: "white",
  padding: "6px 14px",
  borderRadius: 14,
  fontSize: 14,
  textTransform: "capitalize",
};

const items = {
  borderTop: "1px solid #F1F1F1",
  paddingTop: 12,
  color: "#1B1B1B",
};

const itemRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "6px 0",
  fontSize: 15,
};

const total = {
  marginTop: 14,
  fontSize: 18,
  fontWeight: 700,
  textAlign: "right",
  color: "#E50914",
};