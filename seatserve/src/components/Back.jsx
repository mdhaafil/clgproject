import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute px-5 py-2 font-semibold text-white transition-all duration-300 rounded-full shadow-lg  top-6 left-6 bg-gradient-to-r from-orange-500 to-red-600 hover:scale-105 hover:shadow-xl"
    >
      ← Back
    </button>
  );
};

export default BackButton;
