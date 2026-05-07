import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

const About = () => {
  return (
    <div className="relative bg-[#0B0B0B] text-white min-h-screen font-inter overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative flex flex-col-reverse items-center px-6 pt-32 mx-auto md:flex-row max-w-7xl md:px-16 md:pt-40">
        <div className="space-y-6 text-center md:w-1/2 md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold font-poppins text-[#E50914]">
            About SeatServe
          </h1>
          <p className="text-[#B3B3B3] text-lg md:text-xl">
            SeatServe is designed to revolutionize your movie experience. No
            more waiting in lines for snacks — order directly from your seat and
            enjoy seamless service.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="grid grid-cols-1 gap-12 px-6 mx-auto mt-24 max-w-7xl md:px-16 md:grid-cols-2">
        {/* Mission */}
        <div className="bg-[#1A1A1A] rounded-xl p-8 shadow-lg hover:scale-105 transition transform cursor-pointer">
          <h2 className="text-3xl font-bold font-poppins text-[#FFC107] mb-4">
            Our Mission
          </h2>
          <p className="text-[#B3B3B3]">
            To enhance every movie night by providing fast, convenient, and
            premium snack delivery right to your seat.
          </p>
        </div>
        {/* Vision */}
        <div className="bg-[#1A1A1A] rounded-xl p-8 shadow-lg hover:scale-105 transition transform cursor-pointer">
          <h2 className="text-3xl font-bold font-poppins text-[#FFC107] mb-4">
            Our Vision
          </h2>
          <p className="text-[#B3B3B3]">
            To become the most loved cinema companion, combining technology,
            comfort, and luxury for a seamless movie experience.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 mx-auto mt-24 max-w-7xl md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold font-poppins text-[#FFC107] mb-12 border-b-2 border-[#FFC107] inline-block pb-2">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {["Haafil", "Vicky", "Mahesh", "Syed"].map((member) => (
            <div
              key={member}
              className="bg-[#1A1A1A] rounded-xl p-6 shadow-lg hover:scale-105 transition transform cursor-pointer text-center"
            >
              <div className="flex items-center justify-center w-32 h-32 mx-auto mb-4 text-3xl font-bold bg-gray-700 rounded-full">
                {member[0]}
              </div>
              <h3 className="text-xl font-semibold">{member}</h3>
              <p className="text-[#B3B3B3] mt-1">Team Member</p>
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
  );
};

export default About;
