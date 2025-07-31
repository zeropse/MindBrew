import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
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
