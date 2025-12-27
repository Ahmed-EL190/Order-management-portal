import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "analytics", label: "Analytics" },
    { id: "customers", label: "Customers" },
    { id: "products", label: "Products" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <nav className="w-full bg-white shadow-sm px-3 xs:px-4 sm:px-5 md:px-6 py-3 flex items-center justify-between relative">
      {/* Logo Section */}
      <div className="flex items-center flex-shrink-0 z-10">
        <img
          src="https://cdn.visily.ai/app/production/1766561085586/static/Logo-90477900.svg"
          alt="Logo"
          className="
            h-6 
            xs:h-7
            sm:h-7
            sml:h-7.5
            md:h-8
            mdl:h-8.5
            lg:h-9
            lgl:h-9
            xl:h-10
            w-auto 
            object-contain
          "
        />
      </div>

      {/* Navigation Menu - Visible from mdl (768px) */}
      <ul className="hidden mdl:flex items-center gap-3 lg:gap-4 lgl:gap-6 xl:gap-8 mx-3 lgl:mx-6 xl:mx-8 z-10">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={`
              cursor-pointer 
              transition-all 
              duration-200 
              whitespace-nowrap
              text-sm
              mdl:text-sm
              lg:text-base
              lgl:text-base
              xl:text-base
              ${activeItem === item.label 
                ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1" 
                : "text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-300 pb-1"
              }
            `}
            onClick={() => setActiveItem(item.label)}
          >
            {item.label}
          </li>
        ))}
      </ul>

      {/* Search Bar in Center - Visible when nav menu is hidden (on mobile) */}
      <div className="
        absolute 
        left-1/2 
        -translate-x-1/2 
        top-1/2 
        -translate-y-1/2
        mdl:hidden
        w-[60%]
        max-w-[280px]
        z-0
      ">
        <div className="relative w-full">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full 
              border 
              rounded-full 
              pl-9 
              pr-4 
              py-1.5 
              xs:py-2
              text-xs
              xs:text-sm
              sm:text-sm
              focus:outline-none 
              focus:ring-1 
              focus:ring-blue-500 
              focus:border-transparent
              bg-white
              shadow-sm
            "
          />
        </div>
      </div>

      {/* Search and User Section - Right Side */}
      <div className="flex items-center gap-2 xs:gap-3 sm:gap-3 sml:gap-4 z-10">
        {/* Search Bar - Visible on mdl and above */}
        <div className="relative hidden mdl:block">
          <div className="
            w-32 
            md:w-40 
            mdl:w-48 
            lg:w-56 
            lgl:w-64 
            xl:w-72
          ">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full 
                border 
                rounded-full 
                pl-9 
                pr-4 
                py-1.5 
                xs:py-2
                text-xs
                xs:text-sm
                sm:text-sm
                focus:outline-none 
                focus:ring-1 
                xs:focus:ring-2
                focus:ring-blue-500 
                focus:border-transparent
              "
            />
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center">
          <img
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
            alt="User"
            className="
              w-6 
              h-6 
              xs:w-7 
              xs:h-7
              sm:w-7.5
              sm:h-7.5
              sml:w-8
              sml:h-8
              md:w-8
              md:h-8
              mdl:w-8.5
              mdl:h-8.5
              lg:w-9
              lg:h-9
              lgl:w-9
              lgl:h-9
              xl:w-10
              xl:h-10
              rounded-full 
              border 
              xs:border-2
              border-gray-200 
              cursor-pointer 
              hover:ring-1 
              xs:hover:ring-2
              hover:ring-blue-500 
              hover:border-blue-300 
              transition-all 
              duration-200
              object-cover
            "
            onClick={() => navigate("/login")}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;