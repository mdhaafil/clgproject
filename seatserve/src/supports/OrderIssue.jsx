import { motion } from "framer-motion";
import { useState } from "react";

export default function OrderIssue() {
  const [issue, setIssue] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submitIssue = () => {
    if (!issue || !message) return alert("Please fill all fields");
    setSent(true);
  };

  return (
    <div style={page}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={title}
      >
        Order Issues Support
      </motion.h1>

      {!sent ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={card}
        >
          <select
            style={select}
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
          >
            <option value="">Select Issue Type</option>
            <option>Food not delivered</option>
            <option>Wrong order received</option>
            <option>Late delivery</option>
            <option>Payment issue</option>
            <option>Other</option>
          </select>

          <textarea
            style={textarea}
            placeholder="Describe your issue..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button style={btn} onClick={submitIssue}>
            Submit Issue
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={success}
        >
          ✅ Issue submitted successfully
          <p>Our team will contact you shortly.</p>
        </motion.div>
      )}
    </div>
  );
}

/* ===== STYLES (SeatServe Theme) ===== */

const page = {
  minHeight: "100vh",
  background: "#0B0B0B",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  padding: 30,
};

const title = {
  color: "#E50914",
  marginBottom: 30,
  fontSize: 34,
};

const card = {
  width: 380,
  background: "#1A1A1A",
  padding: 28,
  borderRadius: 20,
  boxShadow: "0 0 25px rgba(229,9,20,.3)",
  border: "1px solid rgba(229,9,20,.3)",
};

const select = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  background: "#000",
  color: "white",
  border: "1px solid #333",
  marginBottom: 15,
};

const textarea = {
  width: "100%",
  height: 110,
  borderRadius: 12,
  background: "#000",
  color: "white",
  border: "1px solid #333",
  padding: 12,
  resize: "none",
  marginBottom: 20,
};

const btn = {
  width: "100%",
  padding: 14,
  background: "#E50914",
  border: "none",
  borderRadius: 14,
  color: "white",
  fontSize: 16,
  cursor: "pointer",
};

const success = {
  textAlign: "center",
  background: "#1A1A1A",
  padding: 40,
  borderRadius: 20,
  boxShadow: "0 0 30px rgba(76,175,80,.4)",
  border: "1px solid rgba(76,175,80,.4)",
};
