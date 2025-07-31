import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "MindBrew ~ Motivate Your Life";
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center text-white p-8 h-screen">
      <div className="relative z-10 max-w-2xl mx-auto text-center bg-black/50 backdrop-blur-sm p-10 rounded-xl border border-gray-800 shadow-lg">
        <h3 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          MindBrew
        </h3>
        <p className="text-xl mb-6 text-gray-300">
          A platform that helps you motivate yourself to achieve your{" "}
          <span className="bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent">
            goals.
          </span>
        </p>

        <Button
          variant="outline"
          className="mt-2 cursor-pointer p-6 text-white hover:text-white bg-gradient-to-r from-purple-400 to-blue-500 rounded-md border-none"
          onClick={() => navigate("/inspiration")}
        >
          Find Your Quote
        </Button>
      </div>
    </div>
  );
};

export default Home;
