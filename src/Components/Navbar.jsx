import { Search, LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [user] = useAuthState(auth);

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "analytics", label: "Analytics" },
    { id: "customers", label: "Customers" },
    { id: "products", label: "Products" },
    { id: "settings", label: "Settings" },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (label) => {
    setActiveItem(label);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="w-full bg-white shadow-sm px-3 sm:px-4 md:px-5 mdl:px-6 py-3 flex items-center justify-between">

        {/* ================= Left Section ================= */}
        <div className="flex items-center gap-2 xs:gap-3">
          {/* Mobile Menu Button */}
          <button
            className="mdl:hidden text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://cdn.visily.ai/app/production/1766561085586/static/Logo-90477900.svg"
              alt="Logo"
              className="
                h-5 xs:h-6
                sm:h-6 sml:h-7
                md:h-7
                mdl:h-8
                lg:h-8
                lgl:h-9
                xl:h-10
                w-auto
              "
            />
          </div>

          {/* Nav Items (Desktop) */}
          <ul className="hidden mdl:flex items-center gap-2 lg:gap-3 lgl:gap-4 xl:gap-5 ml-3 lgl:ml-4 xl:ml-6">
            {navItems.map((item) => (
              <li
                key={item.id}
                className={`
                  cursor-pointer transition-all
                  text-xs xs:text-sm sm:text-sm md:text-base
                  lg:text-sm lgl:text-base
                  whitespace-nowrap px-1
                  ${activeItem === item.label
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                  }`}
                onClick={() => setActiveItem(item.label)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* ================= Right Section ================= */}
        <div className="flex items-center gap-2 sm:gap-3 sml:gap-4">

          {/* Search Icon (Mobile) */}
          <button className="mdl:hidden text-gray-600 hover:text-blue-600 p-1">
            <Search size={18} xs:size={20} sm:size={22} />
          </button>

          {/* Search Icon (Desktop) */}
          <button className="hidden mdl:flex text-gray-600 hover:text-blue-600 p-1">
            <Search size={20} lgl:size={22} xl:size={24} />
          </button>

          {/* Logout (Desktop) */}
          {user && (
            <button
              onClick={handleLogout}
              className="
                hidden mdl:flex
                items-center gap-1.5
                text-red-600 hover:text-red-700
                text-xs xs:text-sm
                border border-red-200
                px-2 xs:px-3
                py-1.5
                rounded-full
                hover:bg-red-50
                transition
                whitespace-nowrap
              "
            >
              <LogOut size={12} xs:size={14} />
              <span>Logout</span>
            </button>
          )}

          {/* Logout Icon (Mobile) */}
          {user && (
            <button
              onClick={handleLogout}
              className="
                mdl:hidden
                text-red-600 hover:text-red-700
                p-1
              "
            >
              <LogOut size={18} xs:size={20} sm:size={22} />
            </button>
          )}

          {/* Avatar */}
          <img
            src={
              user?.photoURL ||
              "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
            }
            alt="User"
            className="
              w-7 h-7 xs:w-8 xs:h-8
              sm:w-9 sm:h-9
              md:w-10 md:h-10
              rounded-full
              border border-gray-200
              cursor-pointer
              object-cover
            "
            onClick={() => navigate(user ? "/" : "/login")}
          />
        </div>
      </nav>

      {/* ================= Mobile Menu ================= */}
      {isMobileMenuOpen && (
        <div className="mdl:hidden bg-white shadow-lg border-t">
          <ul className="px-4 py-3">
            {navItems.map((item) => (
              <li
                key={item.id}
                className={`
                  py-3 px-2 cursor-pointer transition-all
                  border-b border-gray-100 last:border-b-0
                  text-sm sm:text-base
                  ${activeItem === item.label
                    ? "text-blue-600 font-semibold bg-blue-50 rounded-lg"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                onClick={() => handleNavClick(item.label)}
              >
                {item.label}
              </li>
            ))}
          </ul>
          
          {/* Mobile User Info */}
          {user && (
            <div className="px-4 py-3 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={user.photoURL || "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"}
                  alt="User"
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <p className="font-medium text-sm">{user.displayName || "User"}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="
                  w-full
                  flex items-center justify-center gap-2
                  text-red-600 hover:text-red-700
                  text-sm
                  border border-red-200
                  px-4 py-2.5
                  rounded-lg
                  hover:bg-red-50
                  transition
                "
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;






// import { Search, LogOut, Menu, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [activeItem, setActiveItem] = useState("Dashboard");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
  
//   const [user] = useAuthState(auth);

//   const navItems = [
//     { id: "dashboard", label: "Dashboard" },
//     { id: "analytics", label: "Analytics" },
//     { id: "customers", label: "Customers" },
//     { id: "products", label: "Products" },
//     { id: "settings", label: "Settings" },
//   ];

//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate("/login");
//     setIsMobileMenuOpen(false);
//   };

//   const handleNavClick = (label) => {
//     setActiveItem(label);
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <>
//       <nav className="w-full bg-white shadow-sm px-3 sm:px-4 md:px-5 mdl:px-6 py-3 flex items-center justify-between">

//         {/* ================= Left Section ================= */}
//         <div className="flex items-center gap-2 xs:gap-3 flex-shrink-0">
//           {/* Mobile Menu Button */}
//           <button
//             className="mdl:hidden text-gray-600"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>

//           {/* Logo */}
//           <div className="flex items-center">
//             <img
//               src="https://cdn.visily.ai/app/production/1766561085586/static/Logo-90477900.svg"
//               alt="Logo"
//               className="
//                 h-5 xs:h-6
//                 sm:h-6 sml:h-7
//                 md:h-7
//                 mdl:h-8
//                 lg:h-8
//                 lgl:h-9
//                 xl:h-10
//                 w-auto
//               "
//             />
//           </div>
//         </div>

//         {/* ================= Center Section (Nav Items + Search) ================= */}
//         <div className="hidden mdl:flex items-center justify-center flex-grow max-w-4xl mx-4">
//           {/* Nav Items (Desktop) */}
//           <ul className="flex items-center gap-2 lg:gap-3 lgl:gap-4 xl:gap-5 mr-4 lgl:mr-6">
//             {navItems.map((item) => (
//               <li
//                 key={item.id}
//                 className={`
//                   cursor-pointer transition-all
//                   text-xs xs:text-sm sm:text-sm md:text-base
//                   lg:text-sm lgl:text-base
//                   whitespace-nowrap px-1
//                   ${activeItem === item.label
//                     ? "text-blue-600 font-semibold border-b-2 border-blue-600"
//                     : "text-gray-600 hover:text-blue-600"
//                   }`}
//                 onClick={() => setActiveItem(item.label)}
//               >
//                 {item.label}
//               </li>
//             ))}
//           </ul>

//           {/* Search Input (Desktop - Compact) */}
//           <div className="relative w-40 lg:w-40 lgl:w-56 xl:w-64 flex-shrink-0">
//             <Search
//               size={16}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="
              
//                 w-full
//                 border rounded-full
//                 pl-9 pr-3
//                 py-1.5 md:py-2
//                 text-sm
//                 focus:ring-2 focus:ring-blue-500 focus:outline-none
//                 truncate
//               "
//             />
//           </div>
//         </div>

//         {/* ================= Right Section ================= */}
//         <div className="flex items-center gap-1 sm:gap-2 sml:gap-3 flex-shrink-0">

//           {/* Mobile Search Toggle */}
//           <button 
//             className="mdl:hidden text-gray-600 hover:text-blue-600 p-1"
//             onClick={() => setShowSearch(!showSearch)}
//           >
//             <Search size={18} xs:size={20} sm:size={22} />
//           </button>

//           {/* Mobile Search Input */}
//           {showSearch && (
//             <div className="mdl:hidden absolute top-3 left-0 right-0 px-3 z-10">
//               <div className="relative">
//                 <Search
//                   size={16}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   autoFocus
//                   className="
//                     w-full
//                     border rounded-full
//                     pl-9 pr-3
//                     py-2
//                     text-sm
//                     bg-white
//                     shadow-lg
//                     focus:ring-2 focus:ring-blue-500 focus:outline-none
//                   "
//                   onBlur={() => setTimeout(() => setShowSearch(false), 200)}
//                 />
//                 <button
//                   onClick={() => setShowSearch(false)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Logout (Desktop) */}
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="
//                 hidden mdl:flex
//                 items-center gap-1.5
//                 text-red-600 hover:text-red-700
//                 text-xs xs:text-sm
//                 border border-red-200
//                 px-2 xs:px-3
//                 py-1.5
//                 rounded-full
//                 hover:bg-red-50
//                 transition
//                 whitespace-nowrap
//                 mr-2
//               "
//             >
//               <LogOut size={12} xs:size={14} />
//               <span>Logout</span>
//             </button>
//           )}

//           {/* Logout Icon (Mobile) */}
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="
//                 mdl:hidden
//                 text-red-600 hover:text-red-700
//                 p-1
//               "
//             >
//               <LogOut size={18} xs:size={20} sm:size={22} />
//             </button>
//           )}

//           {/* Avatar */}
//           <img
//             src={
//               user?.photoURL ||
//               "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
//             }
//             alt="User"
//             className="
//               w-7 h-7 xs:w-8 xs:h-8
//               sm:w-9 sm:h-9
//               md:w-10 md:h-10
//               rounded-full
//               border border-gray-200
//               cursor-pointer
//               object-cover
//             "
//             onClick={() => navigate(user ? "/" : "/login")}
//           />
//         </div>
//       </nav>

//       {/* ================= Mobile Menu ================= */}
//       {isMobileMenuOpen && (
//         <div className="mdl:hidden bg-white shadow-lg border-t">
//           <ul className="px-4 py-3">
//             {navItems.map((item) => (
//               <li
//                 key={item.id}
//                 className={`
//                   py-3 px-2 cursor-pointer transition-all
//                   border-b border-gray-100 last:border-b-0
//                   text-sm sm:text-base
//                   ${activeItem === item.label
//                     ? "text-blue-600 font-semibold bg-blue-50 rounded-lg"
//                     : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
//                   }`}
//                 onClick={() => handleNavClick(item.label)}
//               >
//                 {item.label}
//               </li>
//             ))}
//           </ul>
          
//           {/* Mobile User Info */}
//           {user && (
//             <div className="px-4 py-3 border-t border-gray-100">
//               <div className="flex items-center gap-3 mb-3">
//                 <img
//                   src={user.photoURL || "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"}
//                   alt="User"
//                   className="w-10 h-10 rounded-full border"
//                 />
//                 <div>
//                   <p className="font-medium text-sm">{user.displayName || "User"}</p>
//                   <p className="text-xs text-gray-500">{user.email}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="
//                   w-full
//                   flex items-center justify-center gap-2
//                   text-red-600 hover:text-red-700
//                   text-sm
//                   border border-red-200
//                   px-4 py-2.5
//                   rounded-lg
//                   hover:bg-red-50
//                   transition
//                 "
//               >
//                 <LogOut size={16} />
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;