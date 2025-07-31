import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full bg-black text-white shadow-md">
      <nav className="flex flex-row items-center justify-between px-6 py-4 gap-4">
        <div
          className="cursor-pointer hover:text-gray-300 flex flex-row items-center gap-3"
          tabIndex={0}
          role="button"
          aria-label="Go to home"
          onClick={() => navigate("/")}
        >
          <img
            src="/notebook.svg"
            alt="MindBrew Logo"
            className="w-8 h-8 md:w-12 md:h-12"
          />
          <div className="flex flex-col items-start">
            <h1 className="text-2xl md:text-4xl font-bold">MindBrew</h1>
            <p className="text-xs md:text-sm pl-2 md:pl-5 pt-1">
              motivate your life
            </p>
          </div>
        </div>
        <div className="flex gap-2 md:gap-4 justify-end">
          <Button
            variant="outline"
            size="lg"
            className="bg-gradient-to-r from-purple-400 to-blue-500 text-white rounded-md border-none focus-visible:ring-2 focus-visible:ring-purple-400 hover:from-purple-500 hover:to-blue-600 cursor-pointer hover:text-white w-full md:w-auto"
            onClick={() => navigate("/inspiration")}
          >
            Find Your Quote
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
