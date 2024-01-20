import React, { useEffect, useState } from "react";
import axios from "../../axios.js";
import { Link } from "react-router-dom";
import { differenceInCalendarDays, format } from "date-fns";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineNightsStay } from "react-icons/md";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getBooking = async () => {
      try {
        const { data } = await axios.get("/booking");
        setBookings(data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Unauthorized User");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      }
    };
    getBooking();
  }, []);
  return (
    <div className="ml-5 mr-5 flex flex-col justify-center items-center">
      <h1 className="my-4 text-4xl underline mb-4">Bookings</h1>
      {error && (<p className="text-red-500 text-xl">{error}</p>)}

      {bookings?.length > 0 &&
        bookings.map((booking) => (
          <Link
            to={`/booking/${booking._id}`}
            className="block sm:flex justify-between items-center bg-slate-100 rounded-xl mb-4"
            key={booking._id}
          >
            {booking.listing.photos && booking.listing.photos.length > 0 && (
              <img
                className="sm:w-1/3 rounded-[3rem] p-4"
                key={booking._id}
                src={`https://airbnb-clone-p8wh.onrender.com/uploads/${booking.listing.photos[0]}`}
                alt={`Photo 1`}
              />
            )}

            <div className="sm:w-2/3 p-4 ml-3">
              <h1 className="text-xl font-bold mb-2">
                {booking.listing.title}
              </h1>

              <div className="flex items-center gap-2 text-gray-500">
                <div className="flex items-center gap-1">
                  <FaRegCalendarAlt />
                  {format(new Date(booking.checkIn), "dd-MM-yyyy")}
                </div>{" "}
                &rarr;
                <div className="flex items-center gap-1">
                  <FaRegCalendarAlt />
                  {format(new Date(booking.checkOut), "dd-MM-yyyy")}
                </div>
              </div>

              <div className="flex items-center">
                <MdOutlineNightsStay />
                {differenceInCalendarDays(
                  new Date(booking.checkOut),
                  new Date(booking.checkIn)
                )}{" "}
                nights
              </div>
              <div className="flex items-center">
                <HiOutlineCurrencyRupee />
                Total Price: ₹{booking.price.toLocaleString("en-IN")}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Bookings;
