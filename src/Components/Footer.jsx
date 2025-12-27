import { CiTwitter } from "react-icons/ci";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-10">
      <div
        className="
          max-w-7xl 
          mx-auto 
          px-4 
          py-5
          flex 
          flex-col 
          sm:flex-row 
          items-center 
          justify-between 
          gap-4
          text-gray-500
          text-xs
          sm:text-sm
        "
      >
        {/* Copyright */}
        <p className="text-center sm:text-left">
          © 2025 <span className="font-semibold text-gray-700">OrderFlew</span>. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a className="hover:text-blue-600 transition cursor-pointer">
            <FiFacebook size={18} />
          </a>
          <a className="hover:text-sky-500 transition cursor-pointer">
            <CiTwitter size={20} />
          </a>
          <a className="hover:text-blue-700 transition cursor-pointer">
            <FaLinkedinIn size={18} />
          </a>
          <a className="hover:text-pink-500 transition cursor-pointer">
            <FaInstagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
