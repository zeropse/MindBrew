import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center ">
      <div
        className="p-4 cursor-pointer hover:text-gray-300"
        onClick={() => navigate("/")}
      >
        <h1 className="text-4xl font-bold">motivateCore</h1>
        <p className="text-sm pl-5 pt-1">motivate Your Life</p>
      </div>

      <div className="p-4">
        <ul className="flex gap-4">
          <li
            className="cursor-pointer hover:text-gray-300"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className="cursor-pointer hover:text-gray-300"
            onClick={() => navigate("/started")}
          >
            Get Started
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
