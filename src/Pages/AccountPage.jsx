import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { BsFillBuildingsFill } from "react-icons/bs";
import Profile from "../Components/Account/MyProfile";
import Bookings from "../Components/Account/Bookings";
import Accommodations from "../Components/Account/Accommodations";

const AccountPage = () => {
  const [option, setOption] = useState("My Accommodations");
  const handleOptionClick = (clickedOption) => {
    setOption(clickedOption);
  };
  return (
    <>
      <nav className="flex flex-col mx-20 sm:flex-row justify-center mt-8 gap-2 mb-8 sm:mx-16 text-1rem">
        <Link
          onClick={() => handleOptionClick("My Bookings")}
          className={`flex gap-2 text-base w-full justify-center items-center rounded-full  py-2   ${
            option === "My Bookings"
              ? "bg-[#FF385C] text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          <FaClipboardList />
          <div>My Bookings</div>
        </Link>
        <Link
          onClick={() => handleOptionClick("My Accommodations")}
          className={`flex gap-2 text-base w-full justify-center items-center rounded-full  py-2 ${
            option === "My Accommodations"
              ? "bg-[#FF385C] text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          <BsFillBuildingsFill />
          <div>My accommodations</div>
        </Link>
        <Link
          onClick={() => handleOptionClick("My Profile")}
          className={`flex gap-2 text-base w-full justify-center items-center rounded-full  py-2 ${
            option === "My Profile"
              ? "bg-[#FF385C] text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          <FaUser />
          <div>My profile</div>
        </Link>
      </nav>
      {option === "My Profile" && <Profile />}
      {option === "My Bookings" && <Bookings />}
      {option === "My Accommodations" && <Accommodations />}
    </>
  );
};

export default AccountPage;
