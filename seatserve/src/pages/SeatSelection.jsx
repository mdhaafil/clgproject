import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Back from "../components/Back.jsx";

import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const SeatSelection = () => {
  const [seats, setSeats] =
    useState([]);

  const [selected, setSelected] =
    useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const res = await axios.get(
        `${API}/seats`
      );

      setSeats(res.data.data || []);
    } catch (err) {
      console.error(
        "Seat fetch failed",
        err
      );
    }
  };

  const toggleSeat = (
    seatId,
    isBooked
  ) => {
    if (isBooked) return;

    setSelected((prev) =>
      prev.includes(seatId)
        ? prev.filter(
            (s) => s !== seatId
          )
        : [...prev, seatId]
    );
  };

  /* ================= PAYMENT ================= */

  const proceedToPayment = () => {
    if (!selected.length) {
      alert(
        "Please select seats first"
      );

      return;
    }

    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    if (!cart.length) {
      alert(
        "Your food cart is empty"
      );

      return;
    }

    navigate("/payment", {
      state: {
        seats: selected,
        cart,
      },
    });
  };

  /* ================= GROUP SEATS ================= */

  const groupedSeats =
    seats.reduce((acc, seat) => {
      acc[seat.row] =
        acc[seat.row] || [];

      acc[seat.row].push(seat);

      return acc;
    }, {});

  return (
    <>
      <Back />

      <style>{`
        body {
          background:
            radial-gradient(
              circle at top,
              #111 0%,
              #000 60%
            );

          color: #fff;
          font-family:
            Inter,
            sans-serif;
        }

        .wrapper {
          max-width: 1300px;
          margin: auto;
          padding: 40px 20px;
        }

        h1 {
          text-align: center;
          letter-spacing: 3px;
          color: #f5c518;
          margin-bottom: 30px;
        }

        .screen {
          width: 70%;
          margin:
            0 auto 40px;

          padding: 14px;

          background:
            linear-gradient(
              to bottom,
              #eee,
              #aaa
            );

          color: #111;

          text-align: center;

          border-radius:
            0 0 80px 80px;

          box-shadow:
            0 12px 40px
            rgba(
              255,
              255,
              255,
              0.25
            );

          font-weight: bold;
          letter-spacing: 4px;
        }

        .row {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
        }

        .row-label {
          width: 30px;
          font-weight: bold;
          color: #f5c518;
          margin-right: 10px;
        }

        .seat {
          width: 34px;
          height: 34px;
          margin: 5px;
          border-radius: 8px;

          background: #2ecc71;

          box-shadow:
            0 0 8px
            rgba(
              46,
              204,
              113,
              0.6
            );

          cursor: pointer;

          font-size: 12px;

          line-height: 34px;

          text-align: center;

          transition:
            all 0.25s ease;
        }

        .seat:hover {
          transform: scale(1.15);
        }

        .seat.booked {
          background: #e50914;
          box-shadow: none;
          cursor: not-allowed;
        }

        .seat.selected {
          background: #f5c518;
          color: #000;

          box-shadow:
            0 0 15px
            rgba(
              245,
              197,
              24,
              0.9
            );
        }

        .aisle {
          width: 40px;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 40px;
          font-size: 18px;
          gap: 20px;
          flex-wrap: wrap;
        }

        button {
          background:
            linear-gradient(
              135deg,
              #e50914,
              #ff4c4c
            );

          border: none;

          padding: 14px 32px;

          font-size: 16px;

          color: white;

          border-radius: 30px;

          cursor: pointer;

          box-shadow:
            0 0 20px
            rgba(
              229,
              9,
              20,
              0.5
            );

          transition:
            0.25s ease;
        }

        button:hover {
          transform: scale(1.05);
        }

        .legend {
          display: flex;
          gap: 20px;
          margin-top: 25px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .legend span {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
        }

        .box {
          width: 16px;
          height: 16px;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .screen {
            width: 100%;
          }

          .seat {
            width: 28px;
            height: 28px;
            line-height: 28px;
            font-size: 10px;
            margin: 3px;
          }

          .aisle {
            width: 18px;
          }

          .footer {
            flex-direction: column;
            align-items: flex-start;
          }

          button {
            width: 100%;
          }
        }
      `}</style>

      <div className="wrapper">
        <h1>
          SEATSERVE CINEMA
        </h1>

        <div className="screen">
          SCREEN
        </div>

        {Object.keys(
          groupedSeats
        ).map((row) => (
          <div
            className="row"
            key={row}
          >
            <div className="row-label">
              {row}
            </div>

            {groupedSeats[row].map(
              (seat, index) => (
                <React.Fragment
                  key={seat.seatId}
                >
                  {index ===
                    Math.floor(
                      groupedSeats[
                        row
                      ].length / 2
                    ) && (
                    <div className="aisle"></div>
                  )}

                  <div
                    className={`seat ${
                      seat.isBooked
                        ? "booked"
                        : selected.includes(
                              seat.seatId
                            )
                          ? "selected"
                          : ""
                    }`}
                    onClick={() =>
                      toggleSeat(
                        seat.seatId,
                        seat.isBooked
                      )
                    }
                  >
                    {seat.number}
                  </div>
                </React.Fragment>
              )
            )}
          </div>
        ))}

        <div className="footer">
          <div>
            Selected Seats:{" "}
            <strong>
              {selected.length
                ? selected.join(", ")
                : "None"}
            </strong>
          </div>

          <button
            onClick={
              proceedToPayment
            }
          >
            PROCEED TO PAYMENT 💳
          </button>
        </div>

        <div className="legend">
          <span>
            <div
              className="box"
              style={{
                background:
                  "#2ecc71",
              }}
            ></div>
            Available
          </span>

          <span>
            <div
              className="box"
              style={{
                background:
                  "#f5c518",
              }}
            ></div>
            Selected
          </span>

          <span>
            <div
              className="box"
              style={{
                background:
                  "#e50914",
              }}
            ></div>
            Booked
          </span>
        </div>
      </div>
    </>
  );
};

export default SeatSelection;