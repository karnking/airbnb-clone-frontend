import React from "react";
import { FaWifi, FaParking } from "react-icons/fa";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { MdPets, MdLocalLaundryService, MdFreeBreakfast } from "react-icons/md";

const Perks = ({ selected, onChange }) => {
  function handleCbClick(event) {
    const { checked, name } = event.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  }
  return (
    <>
      <h2 className="text-sm font-semibold mb-2">Perks:</h2>

      <div className="grid grid-cols-2 gap-2 ">
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            checked={selected.includes("wifi")}
            type="checkbox"
            name="wifi"
            onChange={handleCbClick}
          />
          <FaWifi />
          <span>WiFi</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            checked={selected.includes("parking")}
            type="checkbox"
            name="parking"
            onChange={handleCbClick}
          />
          <FaParking />
          <span>Free Parking</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            checked={selected.includes("tv")}
            type="checkbox"
            name="tv"
            onChange={handleCbClick}
          />
          <PiTelevisionSimpleBold />
          <span>TV</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            checked={selected.includes("pets")}
            type="checkbox"
            name="pets"
            onChange={handleCbClick}
          />
          <MdPets />
          <span>Pets</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            checked={selected.includes("laundry")}
            type="checkbox"
            name="laundry"
            onChange={handleCbClick}
          />
          <MdLocalLaundryService />
          <span>Free Laundry</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            checked={selected.includes("breakfast")}
            type="checkbox"
            name="breakfast"
            onChange={handleCbClick}
          />
          <MdFreeBreakfast />
          <span>Free Breakfast</span>
        </label>
      </div>
    </>
  );
};

export default Perks;
