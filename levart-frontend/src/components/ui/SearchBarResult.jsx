import React, { useState } from "react";
import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchBarResult({ setCurrentSearchInput, currentSearchInput }) {
  const [localInput, setLocalInput] = useState(currentSearchInput || "");

  const handleInputChange = (e) => {
    setLocalInput(e.target.value);
  };

  const handleSearch = () => {
    if (localInput.trim()) {
      setCurrentSearchInput(localInput);
    }
  };

  return (
    <div className="xsm:mx-5 sm:mx-10 md:mx-10 lg:mx-0">
      <div className="relative group">
        <div className="absolute top-0 bottom-0 w-6 h-9 my-auto text-[#808080] group-focus:text-mainText left-3 text-2xl">
          <FontAwesomeIcon icon={faMagnifyingGlassLocation} />
        </div>
        <input
          type="text"
          placeholder="Search your next destination.."
          className="w-full py-3 pl-12 pr-4 text-gray-500 font-semibold border border-gray-300 rounded-2xl outline-none bg-white group-focus:bg-white group-focus:border-border-dark focus:text-mainText"
          value={localInput}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
      </div>
    </div>
  );
}

export default SearchBarResult;
