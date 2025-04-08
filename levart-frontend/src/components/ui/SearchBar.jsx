import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchData } from "../../store/browseSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function SearchBar({
  setResults,
  setIsLoading,
  setSearchInput,
  setShowContainer,
}) {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { searchData, isLoading } = useSelector((state) => state.browse);

  useEffect(() => {
    setResults(searchData || {});
  }, [searchData]);

  const handleSearch = (value) => {
    setShowContainer(true);
    // setResults({});
    setInput(value);

    if (value.trim() === "") {
      setShowContainer(false);
      setResults({});
      setIsLoading(false);
    }

    if (value.length >= 1) {
      setResults({});
      setIsLoading(true);
      const timeout = setTimeout(() => {
        dispatch(fetchSearchData({ searchInput: value })).then(() => {
          setResults(searchData);
          setSearchInput(value);
          setIsLoading(false);
        });
      }, 1000);

      return () => clearTimeout(timeout);
    }
  };

  const handleSearchNavigation = (e) => {
    if (input.trim() === "") return;
    if (e.key === "Enter") navigate(`/search-list/${input}/all`);
  };

  return (
    <div className="max-w-5xl px-4 mx-auto mt-12">
      <div className="relative group">
        <div className="absolute top-0 bottom-0 w-6 h-9 my-auto text-[#808080] group-focus:text-mainText left-3 text-2xl">
          {isLoading ? (
            <Spinner size="sm" />
          ) : (
            <FontAwesomeIcon icon={faMagnifyingGlassLocation} />
          )}
        </div>
        <input
          type="text"
          placeholder="Search your next destination.."
          className="w-full py-3 pl-12 pr-4 text-gray-500 font-semibold border border-gray-300 rounded-2xl outline-none bg-white group-focus:bg-white group-focus:border-border-dark focus:text-mainText"
          value={input}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowContainer(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchNavigation(e);
          }}
        />
      </div>
    </div>
  );
}

export default SearchBar;
