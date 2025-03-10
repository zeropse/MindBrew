import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between items-center text-white relative z-10 p-4">
      <div
        className="cursor-pointer hover:text-gray-300"
        onClick={() => navigate("/")}
      >
        <h1 className="text-2xl md:text-4xl font-bold">motivatecore</h1>
        <p className="text-xs md:text-sm pl-2 md:pl-5 pt-1">
          motivate your life
        </p>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop navigation */}
      <div className="hidden md:block">
        <ul className="flex gap-4">
          <li
            className="cursor-pointer hover:text-gray-300 p-3"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className="cursor-pointer font-bold bg-white text-black p-3 rounded-md hover:bg-gray-300"
            onClick={() => navigate("/inspiration")}
          >
            Find Your Quote
          </li>
        </ul>
      </div>

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black bg-opacity-90 md:hidden">
          <ul className="flex flex-col w-full">
            <li
              className="cursor-pointer hover:text-gray-300 p-4 border-b border-gray-800"
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
            >
              Home
            </li>
            <li
              className="cursor-pointer p-4 font-bold"
              onClick={() => {
                navigate("/inspiration");
                setIsMenuOpen(false);
              }}
            >
              <span className="bg-white text-black py-2 px-3 rounded-md hover:bg-gray-300 inline-block">
                Find Your Quote
              </span>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
