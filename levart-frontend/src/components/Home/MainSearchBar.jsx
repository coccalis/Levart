import pic1 from "../../assets/images/two_travelers.webp";
import pic2 from "../../assets/images/alone_traveller.webp";
import { Button, Spinner } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchActivities,
  fetchCities,
  fetchHotels,
  fetchVenues,
} from "../../store/browseSlice";
import { getDailySuggestedSearches } from "../../utils/suggestedSearchesUtil";
import SearchBar from "../ui/SearchBar";
import SearchResult from "../ui/SearchResult";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { renderCategoryIcon } from "../../utils/typeIconService";

function MainSearchBar() {
  const navigate = useNavigate();
  const [results, setResults] = useState({});
  const [showContainer, setShowContainer] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { cityNames, hotelNames, activityTitles, venueTitles } = useSelector(
    (state) => state.browse
  );

  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchHotels());
    dispatch(fetchActivities());
    dispatch(fetchVenues());
  }, [dispatch]);

  const suggestedSearches = getDailySuggestedSearches(
    cityNames,
    hotelNames,
    activityTitles,
    venueTitles
  );

  const [suggestedCount, setSuggestedCount] = useState(
    window.innerWidth < 768 ? 4 : 9
  );

  useEffect(() => {
    const handleResize = () => {
      setSuggestedCount(window.innerWidth < 768 ? 4 : 9);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-navClr to-white">
      <div className="flex flex-col items-center pt-16">
        {/* Top Section */}
        <div className="flex flex-row gap-x-10 justify-center md:border-b-1 border-gray-300 ">
          <div className="xsm:hidden md:flex ">
            <img alt="Picof 2 travellers" src={pic1} className="w-9/12" />
          </div>
          <div>
            <h1 className="text-mainText font-bold xsm:text-xl md:text-3xl text-center">
              Discover Your World:
              <br />
              Welcome to the Gateway of Your Exploration!
            </h1>
          </div>
          <div className="xsm:hidden md:flex ">
            <img alt="Picof 2 travellers" src={pic2} className="w-10/12" />
          </div>
        </div>

        {/* Middle Section */}
        <div className="max-w-7xl w-full">
          <SearchBar
            setResults={setResults}
            setIsLoading={setIsLoading}
            setSearchInput={setSearchInput}
            setShowContainer={setShowContainer}
          />
          {showContainer && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 2, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="bg-white max-w-5xl px-4  mt-2 p-5 rounded-lg shadow-xl overflow-y-auto min-h-32 h-auto max-h-[40vh] xsm:max-h-[40vh] md:max-h-[50vh] lg:max-h-[60vh] xsm:mx-2 lg:mx-auto"
            >
              {results &&
                (isLoading ? (
                  <div className="flex justify-center items-center ">
                    <Spinner />
                  </div>
                ) : results && Object.keys(results).length === 0 ? (
                  <p className="flex justify-center items-center text-center text-gray-500 font-semibold">
                    No results found.
                  </p>
                ) : (
                  <>
                    {results.cities.length > 0 && (
                      <div className=" border-b-2 border-gray-[#ddd] ">
                        <div className="flex flex-row justify-between items-center">
                          <h1 className="font-semibold text-lg text-third-text px-5">
                            Cities
                          </h1>
                          <a
                            href={`/search-list/${searchInput}/cities`}
                            className=" text-mainBtn hover:text-hoverText cursor-pointer font-semibold text-sm "
                          >
                            View All
                          </a>
                        </div>
                        {results.cities.slice(0, 2).map((result, index) => (
                          <SearchResult
                            key={index}
                            result={result}
                            category="city"
                          />
                        ))}
                      </div>
                    )}
                    {results.hotels.length > 0 && (
                      <div className=" border-b-2 border-gray-[#ddd] pt-5">
                        <div className="flex flex-row items-center justify-between">
                          <h1 className="font-semibold text-lg text-third-text px-5">
                            Hotels
                          </h1>
                          <a
                            href={`/search-list/${searchInput}/hotels`}
                            className=" text-mainBtn hover:text-hoverText cursor-pointer font-semibold text-sm "
                          >
                            View All
                          </a>
                        </div>
                        {results.hotels.slice(0, 2).map((result, index) => (
                          <SearchResult
                            key={index}
                            result={result}
                            category="hotel"
                          />
                        ))}
                      </div>
                    )}
                    {results.activities.length > 0 && (
                      <div className=" border-b-2 border-gray-[#ddd] pt-5">
                        <div className="flex flex-row items-center justify-between">
                          <h1 className="font-semibold text-lg text-third-text px-5">
                            Activities
                          </h1>
                          <a
                            href={`/search-list/${searchInput}/activities`}
                            className=" text-mainBtn hover:text-hoverText cursor-pointer font-semibold text-sm "
                          >
                            View All
                          </a>
                        </div>
                        {results.activities.slice(0, 2).map((result, index) => (
                          <SearchResult
                            key={index}
                            result={result}
                            category="activity"
                          />
                        ))}
                      </div>
                    )}
                    {results.venues.length > 0 && (
                      <>
                        <div>
                          <div className="flex flex-row items-center justify-between">
                            <h1 className="font-semibold text-lg text-third-text px-5 pt-5">
                              Venues
                            </h1>
                            <a
                              href={`/search-list/${searchInput}/venues`}
                              className=" text-mainBtn hover:text-hoverText cursor-pointer font-semibold text-sm "
                            >
                              View All
                            </a>
                          </div>
                          {results.venues.slice(0, 2).map((result, index) => (
                            <SearchResult
                              key={index}
                              result={result}
                              category="venue"
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ))}
            </motion.div>
          )}
        </div>
        {/* Bottom Section */}
        <div className="w-full my-5">
          <div className="mx-auto max-w-5xl">
            <h1 className=" text-mainText xsm:text-center md:text-start md:px-5 font-bold text-lg xsm:mx-5 md:mx-auto">
              Suggested searches of the day:
            </h1>
            <div className="flex flex-row flex-wrap gap-x-8 gap-y-5 my-5 xsm:justify-center ">
              {suggestedSearches.slice(0, suggestedCount).map((item, index) => (
                <Button
                  className="font-semibold border-0 bg-transparent hover:bg-hoverLinkBtn group hover:text-white transition"
                  key={index}
                  onClick={() =>
                    navigate(`/search/${item.category}/${item.name}`)
                  }
                >
                  {renderCategoryIcon({
                    category: item.category,
                    size: 4,
                    extraStyle: "group-hover:text-white",
                  })}
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainSearchBar;
