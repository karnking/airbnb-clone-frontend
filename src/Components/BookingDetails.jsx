import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { differenceInCalendarDays, format } from "date-fns";
import axios from "../axios.js";
import ListingPhotos from "./Listing/ListingPhotos.jsx";
import { IoLocation } from "react-icons/io5";
import { FaParking, FaRegCalendarAlt, FaUserAlt } from "react-icons/fa";
import { FaWifi } from "react-icons/fa6";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import {
  MdFreeBreakfast,
  MdLocalLaundryService,
  MdOutlineNightsStay,
  MdPets,
} from "react-icons/md";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";

const BookingDetails = () => {
  const [booking, setBooking] = useState({});
  const [error , setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { data } = await axios.get(`/booking/${id}`);
        setBooking(data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError("Invalid Booking Id");
        } else if (error.response && error.response.status === 404) {
          setError("Booking not found.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      }
    };

    fetchBooking();
  }, [id]);
  const getIconForPerk = (perk) => {
    switch (perk) {
      case "wifi":
        return <FaWifi />;
      case "tv":
        return <PiTelevisionSimpleBold />;
      case "laundry":
        return <MdLocalLaundryService />;
      case "breakfast":
        return <MdFreeBreakfast />;
      case "pets":
        return <MdPets />;
      case "parking":
        return <FaParking />;
      default:
        return null;
    }
  };
  return (
    <div className="mt-4 mx-4 pb-8 mb-4 bg-gray-100 px-8 py-4 rounded-md">
      {error && (<p className="text-red-500 text-xl">{error}</p>)}
      {booking.listing && (
        <>
          <h1 className="font-bold text-3xl pt-2">{booking.listing.title}</h1>
          <p className="underline text-sm flex items-center gap-1 ">
            {" "}
            <IoLocation />
            {booking.listing.address}
          </p>
          <br />
          <ListingPhotos listing={booking.listing} />

          <div className="bg-[#FF595E] flex flex-col sm:flex-row justify-between p-3 my-4 rounded-lg text-white">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1">
                <FaRegCalendarAlt />
                {format(new Date(booking.checkIn), "dd-MM-yyyy")} &rarr;{" "}
                {format(new Date(booking.checkOut), "dd-MM-yyyy")}
              </div>
              <div className="flex items-center">
                <MdOutlineNightsStay />
                {differenceInCalendarDays(
                  new Date(booking.checkOut),
                  new Date(booking.checkIn)
                )}{" "}
                nights
              </div>
            </div>

            <div className="flex items-center sm:text-2xl">
              <HiOutlineCurrencyRupee />
              Total Price: ₹{booking.price.toLocaleString("en-IN")}
            </div>
          </div>

          <div className="my-4 ">
            <h2 className="font-semibold">About this place:</h2>
            <p className="text-sm line-clamp-3 ">
              {booking.listing.description}
            </p>
          </div>

          <hr className="mt-4 mx-4" />

          <div className="my-3 ml-5 flex items-center">
            <div className="border rounded-full">
              <FaUserAlt className="w-14 h-14 px-4 py-4" />
            </div>
            <span className="font-semibold text-xl ml-3">Hosted by &nbsp;</span>{" "}
            {booking.listing.owner}
          </div>

          <hr className="mb-4 mx-4" />
          <h1 className="mx-6 font-semibold text-xl">What this place offers</h1>
          {booking.listing.perks &&
            booking.listing.perks.map((perk, index) => (
              <div key={index} className="flex items-center mx-8 my-6">
                <div className="flex items-center justify-center mr-6">
                  {getIconForPerk(perk)}
                </div>
                <div className="text-xl">{perk}</div>
              </div>
            ))}

          <hr className="mt-4 mx-4" />

          <div className="my-4 ">
            <h2 className="font-semibold">House Rules:</h2>
            <p className="text-sm line-clamp-3 ">{booking.listing.extraInfo}</p>
          </div>
          <div className="my-4 ">
            <h2 className="font-semibold">Safety & property:</h2>
            <div className="text-sm">
              <p>
                Hosts are required to inform guests of cameras and other
                security devices on the property, even if they're turned off.
                Read our Community Standards and let guests know about the
                presence of things like: Recording device: Security cameras or
                recording devices that record or send video, audio, or still
                images.
              </p>
              <br />
              <p>
                Working to keep our global community safe, both online and
                offline, is a top priority for Airbnb. There have been more than
                200 million guest arrivals in homes on Airbnb and negative
                incidents are extremely rare. In 2017, travellers took 49
                million trips with Airbnb and only .004% resulted in a
                significant property damage claim. Even so, we’re constantly
                working to improve our platform, our policies, and our
                protections because even one incident is one too many. In the
                rare event an issue should arise, every host and listing is
                covered with Airbnb’s Host Guarantee, which provides up to
                $1,000,000 USD in property damage protection. Additionally,
                Airbnb maintains Host Protection Insurance up to $1,000,000 USD.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingDetails;
