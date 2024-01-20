import React, { useEffect, useState } from "react";
import Perks from "./Perks.jsx";
import PhotosSection from "./PhotosSection.jsx";
import { Navigate, useParams } from "react-router-dom";
import axios from "../../axios.js";

const ListingForm = () => {
  const { id } = useParams();

  // State variables to store form input values
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const [addedPhotos, setAddedPhotos] = useState([]);

  const [perks, setPerks] = useState([]);

  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState(10);
  const [checkOut, setCheckOut] = useState(7);
  const [maxGuests, setMaxGuests] = useState(2);
  const [price, setPrice] = useState(0);

  const [redirect, setRedirect] = useState("");
  const [error , setError] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/userlistings/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setDescription(data.description);
      setAddedPhotos(data.photos);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    }).catch((error) => {
      if (error.response && error.response.status === 400) {
        setError("Invalid Listing Id");
      }else if(error.response && error.response.status === 404){
        setError("Listing not found");
      }
      else{
        setError("An unexpected error occurred. Please try again later.")
      }
    })
  }, [id]);

  async function createListing(event) {
    event.preventDefault();
    try {
      const listingData = {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      };
      if (id) {
        // update
        await axios.put("/listings", {
          id,
          ...listingData,
        });
        setRedirect("/account");
      } else {
        // add listing
        await axios.post("/listings", listingData);
        setRedirect("/account");
      }
    } catch (err) {
      if (error.response && error.response.status === 401) {
        setError("User not logged In");
      } else if (error.response && error.response.status === 400) {
        setError("All fields are required");
      } else if(error.response && error.response.status === 403){
        setError("Unauthorized user");
      }else if(error.response && error.response.status === 404){
        setError("Listing not found");
      }
      else{
        setError("An unexpected error occurred. Please try again later.")
      }
    }
  }

  if (redirect === "/account") {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="ml-5 mr-5 mt-4 flex flex-col justify-center items-center">
      <h1 className=" text-4xl text-center mb-4 mt-5">Create a Listing</h1>
      {error && (<p className="text-red-500 mt-[10px]">{error}</p>)}
      <form
        className="max-w-[1400px] mx-auto space-y-4 mb-4"
        onSubmit={createListing}
      >
        <div className="flex flex-col">
          <label className="text-sm font-semibold" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="border border-gray-300 focus:outline-none rounded p-2"
            placeholder="Anita's Palace"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold" htmlFor="address">
            Address:
          </label>
          <input
            type="text"
            id="address"
            className="border border-gray-300 focus:outline-none rounded p-2"
            placeholder="Vindhyanagar"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            className="border border-gray-300 focus:outline-none rounded p-2 h-24 resize-none"
            value={description}
            placeholder="Nestled within a pristine emerald-green forest, the breathtaking waterfall cascades down the rugged cliffs like liquid crystal, weaving a mesmerizing tapestry of nature's grandeur."
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <PhotosSection addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        <div>
          <Perks selected={perks} onChange={setPerks} />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold" htmlFor="extraInfo">
            Extra Info:
          </label>
          <textarea
            className="border border-gray-300 focus:outline-none rounded p-2 h-24 resize-none"
            id="extraInfo"
            value={extraInfo}
            placeholder="Breathtaking views of rolling hills and tranquil valleys, a haven of serenity where the sunsets paint the sky in warm hues and the gentle breeze carries the sweet scent of wildflowers."
            onChange={(e) => setExtraInfo(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          <div className="flex flex-col">
            <label className="text-sm font-semibold" htmlFor="checkIn">
              Checkin Time:
            </label>
            <input
              className="border border-gray-300 focus:outline-none rounded p-2"
              type="number"
              id="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold" htmlFor="checkOut">
              Checkout Time:
            </label>
            <input
              className="border border-gray-300 focus:outline-none rounded p-2"
              type="number"
              id="checkOut"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold" htmlFor="maxGuests">
              Max Guests:
            </label>
            <input
              className="border border-gray-300 focus:outline-none rounded p-2"
              type="number"
              id="maxGuests"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              min="1"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold" htmlFor="price">
              Price:
            </label>
            <input
              className="border border-gray-300 focus:outline-none rounded p-2"
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
            />
          </div>
        </div>

        <button
          className="flex justify-center items-center bg-[#FF385C] text-white py-2 px-4 rounded-md cursor-pointer w-full"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ListingForm;
