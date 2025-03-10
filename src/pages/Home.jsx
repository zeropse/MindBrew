import { useNavigate } from "react-router-dom";
import React from "react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto text-center bg-black/50 backdrop-blur-sm p-10 rounded-xl border border-gray-800 shadow-lg">
        <h3 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          MotivateCore
        </h3>
        <p className="text-xl mb-6 text-gray-300">
          A platform that helps you motivate yourself to achieve your{" "}
          <span className="bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent">
            goals.
          </span>
        </p>

        <button
          className="cursor-pointer font-bold bg-white text-black px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
          onClick={() => navigate("/choose-topic")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
