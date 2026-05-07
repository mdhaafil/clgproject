import { motion } from "framer-motion";

export default function TermsConditions() {
  return (
    <div style={page}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={title}
      >
        Terms & Conditions
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={card}
      >
        <Section
          title="1. Service Usage"
          text="SeatServe allows users to order food directly to their seats. By using our platform, you agree to follow all service guidelines."
        />

        <Section
          title="2. Payments"
          text="All payments must be completed before food preparation begins. SeatServe is not responsible for payment failures due to bank issues."
        />

        <Section
          title="3. Cancellations"
          text="Orders once prepared cannot be canceled. Refunds apply only under our Refund Policy."
        />

        <Section
          title="4. User Responsibility"
          text="Users must provide correct seat numbers and contact details for smooth delivery."
        />

        <Section
          title="5. Service Availability"
          text="SeatServe services may vary based on location and availability of vendors."
        />

        <Section
          title="6. Policy Updates"
          text="SeatServe reserves the right to modify these terms anytime without prior notice."
        />

        <p style={note}>
          Continued use of SeatServe confirms acceptance of these terms.
        </p>
      </motion.div>
    </div>
  );
}

/* ===== SECTION COMPONENT ===== */

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
  maxWidth: 750,
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
