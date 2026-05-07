import { motion } from "framer-motion";

export default function RefundPolicy() {
  return (
    <div style={page}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={title}
      >
        Refund Policy
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={card}
      >
        <Section
          title="Eligible for Refund"
          text="Refunds are provided if food is not delivered, delivered late beyond 30 minutes, or wrong items are received."
        />

        <Section
          title="Non-Refundable Cases"
          text="Once food is delivered correctly and consumed, refunds will not be applicable."
        />

        <Section
          title="Payment Issues"
          text="If payment is deducted but order fails, refund will be processed within 3–5 business days."
        />

        <Section
          title="How Refunds Are Processed"
          text="Refunds are credited back to your original payment method automatically."
        />

        <p style={note}>For any concerns, please contact SeatServe Support.</p>
      </motion.div>
    </div>
  );
}

/* ===== SMALL COMPONENT ===== */

const Section = ({ title, text }) => (
  <div style={{ marginBottom: 18 }}>
    <h3 style={heading}>{title}</h3>
    <p style={paragraph}>{text}</p>
  </div>
);

/* ===== STYLES ===== */

const page = {
  minHeight: "100vh",
  background: "#0B0B0B",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 30,
  color: "white",
};

const title = {
  position: "absolute",
  top: 40,
  color: "#E50914",
  fontSize: 36,
};

const card = {
  maxWidth: 700,
  background: "#1A1A1A",
  padding: 35,
  borderRadius: 22,
  boxShadow: "0 0 30px rgba(229,9,20,.35)",
  border: "1px solid rgba(229,9,20,.25)",
};

const heading = {
  color: "#FFC107",
  marginBottom: 6,
};

const paragraph = {
  color: "#B3B3B3",
  lineHeight: 1.6,
};

const note = {
  marginTop: 25,
  color: "#888",
  fontStyle: "italic",
  textAlign: "center",
};
