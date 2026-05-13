import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";

// --------- Imported images from src/assets ---------
import popcorn from "../assets/popcorn.jpeg";
import nachos from "../assets/nachos.jpg";
import hotdog from "../assets/hotdog.jpg";
import soda from "../assets/soda.avif";
import allsnacks from "../assets/allsnack.jpg";

const importedMenuItems = [
  { name: "Popcorn", img: popcorn },
  { name: "Nachos", img: nachos },
  { name: "Hotdog", img: hotdog },
  { name: "Soda", img: soda },
];

const Home = () => {
  return (
    <div>
      <Header />

      <div className="relative bg-[#0B0B0B] text-white min-h-screen font-inter overflow-hidden">
        {/* Hero Section */}
        <section className="relative flex flex-col-reverse items-center px-6 pt-32 mx-auto md:flex-row max-w-7xl md:px-16 md:pt-40">
          {/* Hero Text */}
          <div className="space-y-6 text-center md:w-1/2 md:text-left">
            <h1 className="text-5xl md:text-6xl font-poppins font-bold text-[#E50914]">
              Cinema & Snacks, Perfectly Served
            </h1>
            <p className="text-[#B3B3B3] text-lg md:text-xl">
              SeatServe lets you order your favorite snacks right from your
              seat. Skip the lines, enjoy your movie, and indulge in comfort.
            </p>{" "}
            <br />
            <Link
              to="/menu"
              className="mt-6 px-8 py-3 bg-[#E50914] hover:bg-[#FFC107] hover:text-black rounded-lg font-bold transition transform hover:scale-105 shadow-md"
            >
              Order Now
            </Link>
          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center mb-10 md:w-1/2 md:mb-0">
            <div className="absolute w-64 h-64 md:w-80 md:h-80 bg-gradient-to-t from-[#FFC107]/30 to-transparent rounded-full top-10 md:top-0 -z-10"></div>
            <img
              src={allsnacks}
              alt="Cinema Snacks"
              className="w-full max-w-md shadow-2xl rounded-xl"
            />
          </div>
        </section>

        {/* Popular Menu Section */}
        <section className="px-6 mx-auto mt-24 max-w-7xl md:px-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#FFC107] mb-12 border-b-2 border-[#FFC107] inline-block pb-2">
            Popular Snacks
          </h2>

          {/* ---------  Imported images from src/assets --------- */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {importedMenuItems.map((item) => (
              <div
                key={item.name}
                className="relative bg-[#1A1A1A] rounded-xl overflow-hidden shadow-lg cursor-pointer group transform transition hover:scale-105"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.img} // imported method
                    alt={item.name}
                    className="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white">
                    {item.name}
                  </h3>
                  <p className="text-[#B3B3B3] mt-1">
                    Delicious {item.name} for your movie night.
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FFC107] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Cinematic Background Lights */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-t from-[#FFC107]/20 to-transparent rounded-full -top-32 -left-32 animate-pulseSlow"></div>
          <div className="absolute w-72 h-72 bg-gradient-to-t from-[#E50914]/20 to-transparent rounded-full -bottom-40 -right-24 animate-pulseSlow delay-500"></div>
        </div>

        {/* Tailwind Animations */}
        <style>
          {`
            .animate-pulseSlow {
              animation: pulse 6s ease-in-out infinite alternate;
            }
            @keyframes pulse {
              0% { transform: scale(1) translateY(0); opacity: 0.6; }
              50% { transform: scale(1.05) translateY(-10px); opacity: 0.8; }
              100% { transform: scale(1) translateY(0); opacity: 0.6; }
            }
            .font-poppins { font-family: 'Poppins', sans-serif; }
            .font-inter { font-family: 'Inter', sans-serif; }
          `}
        </style>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
