import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full bg-white shadow-sm flex items-center justify-between py-3 gap-2 px-7 ">
      {/* Logo */}
      <span
        className="style-font text-2xl font-light italic tracking-wide text-blue-600"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Logo 
      </span>

      {/* Links */}
      <ul className="hidden md:flex items-center space-x-6 text-gray-600 font-medium">
        <li className="text-blue-600 font-semibold cursor-pointer">
          Dashboard
        </li>
        <li className="cursor-pointer hover:text-blue-600">Analytics</li>
        <li className="cursor-pointer hover:text-blue-600">Customers</li>
        <li className="cursor-pointer hover:text-blue-600">Products</li>
        <li className="cursor-pointer hover:text-blue-600">Settings</li>
      </ul>
      {/* Search + User */}
      <div className="flex items-center space-x-4">
        <div className="relative hidden lgl:flex  ">
          <input
            type="text"
            placeholder="Search orders, products, customers..."
            className=" border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className=" absolute left-3 top-2.5 text-gray-400" size={16} />
        </div>
        <img
          src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
          alt="User"
          className="w-9 h-9 rounded-full border"
          onClick={() => navigate("/login")}
        />
      </div>
    </nav>
  );
};

export default Navbar;
