import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  useEffect(() => {
    document.title = "404 - Page Not Found";
  }, []);

  return (
    <main>
      <StarsBackground
        allStarsTwinkle={true}
        starDensity={0.001}
        minTwinkleSpeed={0.5}
        maxTwinkleSpeed={1}
      />
      <ShootingStars minDelay={800} maxDelay={2200} />
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <h1 className="text-4xl font-bold text-white">404 - Page Not Found</h1>
        <p className="text-gray-500 mt-2">
          The page you are looking for does not exist.
        </p>
        <Button
          onClick={handleGoHome}
          className="mt-4 p-5 text-white cursor-pointer bg-gradient-to-r from-purple-400 to-blue-500 rounded-md"
        >
          Go back to the home page
        </Button>
      </div>
    </main>
  );
};

export default NotFound;
