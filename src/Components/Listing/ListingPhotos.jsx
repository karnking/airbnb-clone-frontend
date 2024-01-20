import React, { useState } from "react";
import { FaPhotoFilm } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const ListingPhotos = ({ listing }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <h1 className="font-bold text-3xl mt-4 ml-8 mr-48">{listing.title}</h1>
        <p className="underline text-sm mb-6 ml-8 ">{listing.address}</p>
        <div className="bg-black px-8 py-4 gap-2 flex flex-col items-center">
          <div>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-10 top-6 flex py-2 px-4 items-center rounded-2xl gap-1 border shadow shadow-black bg-white text-black"
            >
              <IoMdClose />
              close
            </button>
          </div>
          {listing?.photos?.length > 0 &&
            listing.photos.map((photo) => (
              <div key={photo}>
                <img
                  onClick={() => setShowAllPhotos(true)}
                  src={`https://airbnb-clone-p8wh.onrender.com/uploads/` + photo}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-rows-2 grid-flow-col gap-2">
        <div className="flex justify-center items-center row-span-2 sm:col-span-2 lg:col-span-2 md:row-span-2 md:col-span-2 lg:row-span-2">
          {listing.photos?.[0] && (
            <div>
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square object-cover rounded-md cursor-pointer"
                src={`http://localhost:3000/uploads/${listing.photos[0]}`}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="hidden sm:block">
          <div>
            {listing.photos?.[1] && (
              <div>
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover rounded-md cursor-pointer"
                  src={`http://localhost:3000/uploads/${listing.photos[1]}`}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
        <div className="hidden sm:block">
          <div>
            {listing.photos?.[2] && (
              <div>
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover rounded-md cursor-pointer"
                  src={`http://localhost:3000/uploads/${listing.photos[2]}`}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
        <div className="hidden lg:block">
          <div>
            {listing.photos?.[3] && (
              <div>
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover rounded-md cursor-pointer"
                  src={`http://localhost:3000/uploads/${listing.photos[3]}`}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
        <div className="hidden lg:block">
          <div>
            {listing.photos?.[4] && (
              <div>
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover rounded-md cursor-pointer"
                  src={`http://localhost:3000/uploads/${listing.photos[4]}`}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex items-center gap-1 absolute right-2 bottom-2 py-1 px-4 bg-white border border-black rounded shadow shadow-gray-500 text-sm"
      >
        <FaPhotoFilm />
        show more
      </button>
    </div>
  );
};

export default ListingPhotos;
