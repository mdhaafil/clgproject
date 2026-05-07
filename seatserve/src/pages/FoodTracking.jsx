import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Back from "../components/Back.jsx";

const API = "http://localhost:5000";
const steps = ["preparing", "on_the_way", "delivered"];

export default function TrackOrder() {
  const { id } = useParams();

  const [status, setStatus] = useState(null);
  const [loadingStage, setLoadingStage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    animateLoader();
    fetchStatus();
    const timer = setInterval(fetchStatus, 4000);
    return () => clearInterval(timer);
  }, []);

  const animateLoader = () => {
    setTimeout(() => setLoadingStage(1), 700);
    setTimeout(() => setLoadingStage(2), 1400);
  };

  const fetchStatus = async () => {
    try {
      const res = await axios.get(`${API}/order/track-food/${id}`);
      setStatus(res.data.foodStatus);
      setTimeout(() => setLoading(false), 500);
    } catch {}
  };

  const activeIndex = steps.indexOf(status);

  return (
    <div>
      <Back />
      <div style={page}>
        {loading ? (
          <SeatServeLoader stage={loadingStage} />
        ) : (
          <>
            <h1 style={title}>Live Order Tracking</h1>

            <div style={timeline}>
              {steps.map((s, i) => (
                <div key={i} style={stepWrap}>
                  <div
                    style={{
                      ...dot,
                      background: i <= activeIndex ? "#E50914" : "#444",
                    }}
                  />
                  {i < 2 && (
                    <div
                      style={{
                        ...line,
                        background: i < activeIndex ? "#E50914" : "#333",
                      }}
                    />
                  )}
                  <p>{s.replace("_", " ")}</p>
                </div>
              ))}
            </div>

            <div style={statusBox}>🍽 Food is {status.replace("_", " ")}</div>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= REAL LOADER ================= */

const SeatServeLoader = ({ stage }) => {
  const messages = [
    "Connecting to kitchen...",
    "Fetching live order...",
    "Syncing food status...",
  ];

  return (
    <div style={loaderWrap}>
      <div style={ring}></div>
      <p style={loaderText}>{messages[stage]}</p>
    </div>
  );
};

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  background: "radial-gradient(circle,#111,#000)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const title = {
  fontSize: 34,
  color: "#E50914",
  marginBottom: 60,
};

const timeline = {
  display: "flex",
  alignItems: "center",
};

const stepWrap = {
  width: 140,
  textAlign: "center",
};

const dot = {
  width: 22,
  height: 22,
  borderRadius: "50%",
  margin: "auto",
  transition: ".4s",
};

const line = {
  height: 4,
  width: 120,
  margin: "10px auto",
  borderRadius: 10,
  transition: ".4s",
};

const statusBox = {
  marginTop: 60,
  background: "#151515",
  padding: "18px 50px",
  borderRadius: 18,
  boxShadow: "0 0 25px rgba(229,9,20,.5)",
  fontSize: 22,
};

const loaderWrap = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const ring = {
  width: 90,
  height: 90,
  border: "6px solid #222",
  borderTop: "6px solid #E50914",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const loaderText = {
  marginTop: 20,
  fontSize: 18,
  color: "#aaa",
};

/* ================= ANIMATION ================= */

const style = document.createElement("style");
style.innerHTML = `
@keyframes spin {
  to { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);
