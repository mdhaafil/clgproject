import { motion } from "framer-motion";
import { useState } from "react";

export default function HelpCenter() {
  const faqs = [
    {
      q: "How do I place an order?",
      a: "Select your seats, choose food items, complete payment, and your order will be sent to the kitchen instantly.",
    },
    {
      q: "Can I cancel my order?",
      a: "Orders can only be cancelled before food preparation starts.",
    },
    {
      q: "How do I track my food?",
      a: "After payment, you can track your food live from the Track Order page.",
    },
    {
      q: "What payment methods are supported?",
      a: "We support debit cards, credit cards, and UPI through Stripe.",
    },
    {
      q: "Who do I contact for support?",
      a: "Use the Support page to raise an issue or chat with us.",
    },
  ];

  return (
    <div style={page}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={title}
      >
        Help Center
      </motion.h1>

      <div style={box}>
        {faqs.map((item, i) => (
          <FAQ key={i} q={item.q} a={item.a} />
        ))}
      </div>
    </div>
  );
}

const FAQ = ({ q, a }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setOpen(!open)}
      style={faq}
      whileHover={{ scale: 1.02 }}
    >
      <h3>{q}</h3>

      {open && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={answer}
        >
          {a}
        </motion.p>
      )}
    </motion.div>
  );
};

/* ===== STYLES ===== */

const page = {
  minHeight: "100vh",
  background: "#0B0B0B",
  padding: 50,
  color: "white",
};

const title = {
  color: "#E50914",
  marginBottom: 40,
  fontSize: 36,
};

const box = {
  maxWidth: 800,
  margin: "auto",
};

const faq = {
  background: "#1A1A1A",
  padding: 22,
  borderRadius: 16,
  marginBottom: 16,
  cursor: "pointer",
  border: "1px solid rgba(229,9,20,.3)",
  boxShadow: "0 0 15px rgba(229,9,20,.15)",
};

const answer = {
  marginTop: 12,
  color: "#B3B3B3",
  lineHeight: 1.6,
};
