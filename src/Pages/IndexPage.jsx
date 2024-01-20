import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axios.js";

const IndexPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await axios.get("/listings");
        setListings(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="mx-4 mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {loading && (
        <p className="flex justify-center items-center">Loading..</p>
      )}
      {listings.length === 0 && !loading && (
        <p className="flex justify-center items-center">No listings found.</p>
      )}
      {listings.length > 0 &&
        listings.map((listing) => (
          <Link to={`/listings/${listing._id}`} key={listing._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {listing.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"https://airbnb-clone-p8wh.onrender.com/uploads/" + listing.photos?.[0]}
                  alt="listing_image"
                />
              )}
            </div>
            <h2 className="font-bold">{listing.address}</h2>
            <h3 className="text-sm text-gray-500">{listing.title}</h3>
            <div className="mt-1 font-semibold">
              {"\u20B9" + listing.price + "/night"}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
