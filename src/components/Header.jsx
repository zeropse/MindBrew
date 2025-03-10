import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center text-white relative z-10">
      <div
        className="p-4 cursor-pointer hover:text-gray-300"
        onClick={() => navigate("/")}
      >
        <h1 className="text-4xl font-bold">motivatecore</h1>
        <p className="text-sm pl-5 pt-1">motivate your life</p>
      </div>

      <div className="p-4">
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
    </header>
  );
};

export default Header;
