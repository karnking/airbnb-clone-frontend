import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios.js";
import { IoIosAdd } from "react-icons/io";

const Accommodations = () => {
  const [myListings, setMyListings] = useState([]);
  const [error , setError] = useState(null);

  useEffect(() => {
    axios.get("/userlistings").then(({ data }) => {
      setMyListings(data);
    }).catch((err) => {
      if (err.response && err.response.status === 401) {
        setError("User not logged In");
      }else if(err.response && err.response.status === 403){
        setError("Unauthorized user");
      }
      else{
        setError("An unexpected error occurred. Please try again later.")
      }
    })
  }, []);
  return (
    <div className="ml-5 mr-5 flex flex-col justify-center items-center">
      {error && (<p className="text-red-500 flex justify-center items-center">{error}</p>)}
      <div className="flex justify-around min-w-[600px]">
        <Link
          className="flex justify-center items-center bg-[#FF385C] text-white rounded-full text-1rem py-2"
          to={"/listings/new"}
        >
          {" "}
          <div className="flex gap-1 w-[360px] justify-center items-center ">
            <IoIosAdd className="w-6 h-6" />
            Create a new Listing
          </div>
        </Link>
      </div>
      <div>
        <h1 className="my-4 text-4xl underline mb-4">My Listings:</h1>
        {myListings.length > 0 &&
          myListings.map((listing) => (
            <Link
              to={"/userlistings/" + listing._id}
              key={listing._id}
              className="block sm:flex justify-between items-center bg-slate-100 rounded-xl mb-4"
            >
              {listing.photos.length > 0 && (
                <img
                  className="sm:w-1/3 rounded-[3rem] p-4"
                  src={"https://airbnb-clone-p8wh.onrender.com/uploads/" + listing.photos[0]}
                  alt=""
                />
              )}
              <div className="sm:w-2/3 p-4">
                <h2 className="text-xl font-bold">{listing.title}</h2>
                <p className="line-clamp-4">{listing.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Accommodations;
