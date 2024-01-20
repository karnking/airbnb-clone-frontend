import React, { useState } from "react";
import axios from "../../axios.js";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";

const PhotosSection = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");
  const [error , setError] = useState(null);

  async function addPhotoByLink(event) {
    event.preventDefault();
    try{
      const { data: filename } = await axios.post("/uploadbylink", {
        link: photoLink,
      });
      onChange((prev) => {
        return [...prev, filename];
      });
      setPhotoLink("");
    }catch(error){
      if (error.response && error.response.status === 400) {
        setError("link is required");
      }else {
        setError("Something went wrong. Try again later.");
      }
    }
  }

  async function uploadPhoto(event) {
    const files = event.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    await axios
      .post("/uploadfromdevice", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      })
      .catch((error) => {
        console.error("Error uploading photo:", error);
      });
  }

  function removePhoto(event, filename) {
    event.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== filename)]);
  }

  function selectAsMainPhoto(event, filename) {
    event.preventDefault();
    onChange([filename, ...addedPhotos.filter((photo) => photo !== filename)]);
  }
  return (
    <div>
      <h2 className="text-sm font-semibold">Photos (more = better)</h2>
      <p></p>
      <div className="flex justify-between gap-2 w-auto">
        {error && (<p className="text-red-500 text-sm">{error}</p>)}
        <input
          type="text"
          placeholder="your link here"
          className="border border-gray-300 focus:outline-none rounded w-auto h-[42px] p-2"
          name="photoLink"
          value={photoLink}
          onChange={(event) => setPhotoLink(event.target.value)}
        />
        <button
          className="bg-[#FF385C] text-white py-2 px-4 rounded"
          onClick={addPhotoByLink}
        >
          Add
        </button>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link, index) => (
            <div className="h-32 flex relative" key={index}>
              <img
                className="rounded-2xl w-full object-cover"
                src={"https://airbnb-clone-p8wh.onrender.com/uploads/" + link}
                alt=""
              />
              <button
                className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3"
                onClick={(event) => {
                  removePhoto(event, link);
                }}
              >
                <RiDeleteBin5Fill />
              </button>
              <button
                className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3"
                onClick={(event) => {
                  selectAsMainPhoto(event, link);
                }}
              >
                {link === addedPhotos[0] && <FaStar />}
                {link !== addedPhotos[0] && <FaRegStar />}
              </button>
            </div>
          ))}

        <label className="cursor-pointer border flex justify-center items-center gap-1 bg-transparent h-32 text-2xl text-gray-600 rounded-xl">
          <input
            className="hidden"
            type="file"
            multiple
            onChange={uploadPhoto}
          />
          <FaCloudUploadAlt />
          upload
        </label>
      </div>
    </div>
  );
};

export default PhotosSection;
