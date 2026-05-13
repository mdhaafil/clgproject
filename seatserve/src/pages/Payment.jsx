import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const API = `${import.meta.env.VITE_API_URL}/api`;

/* ================= CHECKOUT ================= */

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();

  const seats = location.state?.seats || [];

  const [email, setEmail] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!seats.length) navigate("/");
  }, []);

  /* ================= CREATE PAYMENT ================= */

  const initPayment = async () => {
    if (!email) return alert("Please enter email first");
    if (!seats.length) return alert("No seats selected");

    try {
      setLoading(true);

      const res = await axios.post(`${API}/payment/create`, {
        seats,
        email,
      });

      if (!res.data.clientSecret) {
        alert("Failed to create payment");
        return;
      }

      setClientSecret(res.data.clientSecret);
      setItems(res.data.items || []);
      setTotal(Number(res.data.totalAmount || 0));
    } catch (err) {
      console.error(err);
      alert("Failed to prepare payment");
    } finally {
      setLoading(false);
    }
  };

  /* ================= CONFIRM PAYMENT ================= */

  const payNow = async (e) => {
    e.preventDefault();

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      },
    );

    if (error) {
      console.log("STRIPE ERROR:", error);
      alert(error.message);
      return; // 🚨 VERY IMPORTANT — STOP HERE
    }

    console.log("Stripe success:", paymentIntent.status);

    if (paymentIntent.status === "succeeded") {
      alert("Payment successful!");

      const res = await axios.post(`${API}/payment/confirm`, {
        paymentIntentId: paymentIntent.id,
      });

      console.log("Backend response:", res.data);
      console.log("orderId:", res.data.orderId);

      navigate(`/receipt/${res.data.orderId}`);
    }
  };
  /* ================= UI ================= */

  return (
    <form style={card} onSubmit={payNow}>
      <h1 style={title}>
        {total ? `₹${Number(total).toFixed(2)}` : "Checkout"}
      </h1>

      <p style={seatText}>
        Seats: <span>{seats.join(", ")}</span>
      </p>

      <input
        type="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={emailInput}
      />

      {!clientSecret && (
        <button
          type="button"
          style={prepareBtn}
          onClick={initPayment}
          disabled={loading}
        >
          {loading ? "Preparing..." : "Prepare Payment"}
        </button>
      )}

      {clientSecret && (
        <>
          <div style={itemsBox}>
            {items.map((item, i) => (
              <div key={i} style={row}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{Number(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={stripeBox}>
            <CardElement
              options={{
                style: {
                  base: {
                    color: "#fff",
                    fontSize: "16px",
                    "::placeholder": { color: "#B3B3B3" },
                  },
                },
              }}
            />
          </div>

          <button type="submit" style={payBtn} disabled={processing}>
            {processing ? "Processing..." : "Pay Now"}
          </button>
        </>
      )}
    </form>
  );
}
/* ================= PAGE ================= */

export default function PaymentPage() {
  return (
    <div style={page}>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  background: "#0B0B0B",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  background: "#1A1A1A",
  padding: 30,
  borderRadius: 22,
  width: 420,
  color: "#fff",
  boxShadow: "0 0 40px rgba(229,9,20,.6)",
};

const title = {
  textAlign: "center",
  color: "#FFC107",
  fontSize: 32,
  marginBottom: 10,
};

const seatText = {
  textAlign: "center",
  color: "#B3B3B3",
  marginBottom: 20,
};

const itemsBox = {
  marginTop: 20,
  marginBottom: 20,
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
};

const stripeBox = {
  padding: 14,
  borderRadius: 12,
  background: "#0B0B0B",
  border: "1px solid #333",
  marginTop: 10,
};

const payBtn = {
  marginTop: 20,
  width: "100%",
  background: "#E50914",
  border: "none",
  padding: 14,
  borderRadius: 14,
  color: "white",
  fontSize: 18,
  cursor: "pointer",
};

const prepareBtn = {
  marginTop: 10,
  width: "100%",
  background: "#FFC107",
  border: "none",
  padding: 12,
  borderRadius: 10,
  fontSize: 16,
  cursor: "pointer",
};

const emailInput = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "1px solid #333",
  background: "#0B0B0B",
  color: "white",
  marginBottom: 10,
};
