import { useNavigate } from "react-router-dom";
import React from "react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 overflow-hidden">
      {/* Animated SVG Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Horizontal moving grid (left to right) */}
            <pattern
              id="movingGridHorizontal"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from="-40 0"
                  to="0 0"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>
            </pattern>

            {/* Vertical moving grid (top to bottom) */}
            <pattern
              id="movingGridVertical"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0 0 L 40 0 40 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from="0 -40"
                  to="0 0"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
            </pattern>

            {/* Combined pattern */}
            <pattern
              id="combinedGrid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <rect width="40" height="40" fill="url(#movingGridHorizontal)" />
              <rect width="40" height="40" fill="url(#movingGridVertical)" />
            </pattern>

            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#combinedGrid)" />
          <circle cx="50%" cy="50%" r="30%" fill="url(#grad)" />
          <circle cx="70%" cy="20%" r="10%" fill="url(#grad)" opacity="0.6" />
          <circle cx="20%" cy="70%" r="15%" fill="url(#grad)" opacity="0.4" />
        </svg>
      </div>

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
