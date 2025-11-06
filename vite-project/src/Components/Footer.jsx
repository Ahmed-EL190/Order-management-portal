import { CiTwitter } from "react-icons/ci";
import {  FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="flex text-gray-500 mx-5 p-5 justify-around">
      <div>@ 2025 OrderFlew. All rights reserved.</div>
      <div className="flex gap-5">
        <FiFacebook />
        <CiTwitter />
        <FaLinkedinIn />
        <FaInstagram />
      </div>
    </div>
  );
};

export default Footer;
