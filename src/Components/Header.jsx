import React, { useContext } from "react";
// import "./Header.scss";
import logo from "../logo.png";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <nav className="h-20 flex items-center justify-between p-8 box-border border-b border-black gap-2">
      <Link
        className="block object-contain w-[100px] sm:ml-[50px] ml-6 gap-2"
        to={"/"}
      >
        <img src={logo} alt="airbnb_logo" />
      </Link>

      <div className="hidden md:flex justify-center items-center gap-2 border border-gray-300 rounded-full text-black w-[350px] h-[50px] py-2 px-4 shadow-md shadow-gray-300">
        <div>Anywhere</div>
        <div className="border-l border-gray-300 h-[26px]"></div>
        <div>Any week</div>
        <div className="border-l border-gray-300 h-[26px]"></div>
        <div>Add guests</div>
        {/* <input
          className="sm:hidden sm:m-0 sm:p-0 flex-grow border-none focus:outline-none text-lg"
          type="text"
          placeholder="discover"
        /> */}
        <button className="flex items-center justify-center bg-[#FF385C] text-white rounded-full w-8 h-8 cursor-pointer">
          <FaSearch />
        </button>
      </div>

      <Link
        className="flex justify-center items-center gap-3 border border-gray-300 rounded-full text-black w-auto h-[50px] py-2 px-4 shadow-md shadow-gray-300"
        to={user ? "/account" : "/login"}
      >
        <RxHamburgerMenu className="w-6 h-6 font-extrabold" />
        <div className="bg-[#717171] text-white rounded-full h-8 w-8 cursor-pointer flex justify-center items-center">
          <FiUser className="w-6 h-6 font-extrabold " />
        </div>

        {!!user && <div>{user.name}</div>}
      </Link>
      {/* <Link
        className="flex sm:hidden justify-center items-center gap-2 border border-gray-300 rounded-full text-black w-auto h-[50px] py-2 px-4 shadow-md shadow-gray-300"
        to={user ? "/account" : "/login"}
      >
        <RxHamburgerMenu className="w-6 h-6 font-extrabold" />
      </Link> */}
    </nav>
  );
};

export default Header;
