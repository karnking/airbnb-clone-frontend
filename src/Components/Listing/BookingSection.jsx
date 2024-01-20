import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "../../axios.js";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext.jsx";

const BookingSection = ({ listing }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const {user} = useContext(UserContext);

  const [error , setError] = useState(null);

  useEffect(()=> {
    if(user){
      setName(user.name);
    }
  },[user]);

  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookPlace() {
    // const response =
    try{
      const response = await axios.post("/booking", {
      checkIn,
      checkOut,
      guests,
      name,
      phone,
      listing: listing._id,
      price: numberOfDays * listing.price,
    }
    );
    const bookingId = response.data._id;
    setRedirect("/account");
    }catch(error){
      if (error.response && error.response.status === 401) {
        setError("Unauthorized User");
      } else if (error.response && error.response.status === 400) {
        setError("All fields are required");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="px-4">
      <h1 className="flex items-center justify-center pt-4 font-semibold text-2xl">
        Price ₹{listing.price} /night
      </h1>
      {error && (<p className="text-red-500 flex justify-center items-center">{error}</p>)}
      <div className="border rounded-2xl mt-4">
        <div className="flex justify-around md:text-sm">
          <div className="py-3 px-4 flex flex-col">
            <label className="cursor-pointer" htmlFor="checkin">
              Check In
            </label>
            <input
              className="py-1 cursor-pointer border-black bg-transparent focus:outline-none"
              type="date"
              id="checkin"
              value={checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
              required
            />
          </div>
          <div className="border"></div>
          <div className="py-3 px-4 flex flex-col">
            <label className="cursor-pointer" htmlFor="checkout">
              Check Out
            </label>
            <input
              className="py-1 cursor-pointer border-black bg-transparent focus:outline-none"
              type="date"
              id="checkout"
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
              required
            />
          </div>
        </div>
        <div className="py-3 px-4 flex items-center justify-center text-xl border-t">
          <label htmlFor="guests">Number of guests</label>
          <input
            className="w-16 pl-[4px] border-none focus:outline-none"
            type="number"
            id="guests"
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
            required
          />
        </div>
        {numberOfDays > 0 && (
          <div>
            <div className="flex flex-col px-8 py-3 border-t">
              <label htmlFor="name">Full Name</label>
              <input
                className="pl-[20px] rounded-xl py-3 border border-black focus:outline-none placeholder:text-gray-500 "
                type="text"
                id="name"
                placeholder="Anuraj Gupta"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="flex flex-col px-8 py-3 border-t">
              <label htmlFor="phone">Phone Number</label>
              <input
                className="pl-[20px] rounded-xl py-3 border border-black focus:outline-none placeholder:text-gray-500 "
                type="tel"
                id="phone"
                pattern="[0-9]{10}"
                maxLength="10"
                placeholder="Enter Phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
            </div>
          </div>
        )}
      </div>
      <button
        onClick={bookPlace}
        className="flex justify-center items-center bg-[#ff385c] w-full  rounded-2xl py-4 my-2 text-white text-2xl"
      >
        Book this place &nbsp;
        {numberOfDays > 0 && <span>₹{numberOfDays * listing.price}</span>}
      </button>
      <hr className="mb-4 mx-2 my-4" />
    </div>
  );
};

export default BookingSection;
