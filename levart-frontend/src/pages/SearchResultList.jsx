import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSearchData } from "../store/browseSlice";
import { useEffect, useMemo, useState } from "react";
import SearchCard from "../components/ui/SearchCard";
import { Chip, Spinner } from "@nextui-org/react";
import SearchBarResult from "../components/ui/SearchBarResult";
import { filterTypes } from "../data/filterTypes";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBicycle,
  faCity,
  faHotel,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

function SearchResultList() {
  const { searchInput, filter } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchData, isLoading } = useSelector((state) => state.browse);
  const [currentSearchInput, setCurrentSearchInput] = useState(
    searchInput || ""
  );
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(filter);

  useEffect(() => {
    setCurrentSearchInput(searchInput || "");
  }, []);
  useEffect(() => {
    if (currentSearchInput.trim()) {
      setIsLoadingData(true);
      navigate(`/search-list/${currentSearchInput}/${selectedFilter}`);
      dispatch(fetchSearchData({ searchInput: currentSearchInput }));
    }
  }, [currentSearchInput, selectedFilter, dispatch]);

  const filteredData = useMemo(() => {
    if (selectedFilter === "all") {
      return {
        cities: searchData.cities || [],
        hotels: searchData.hotels || [],
        activities: searchData.activities || [],
        venues: searchData.venues || [],
      };
    }
    return searchData[selectedFilter] || [];
  }, [searchData, selectedFilter]);

  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => {
        setIsLoadingData(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  const renderFilterCards = () => {
    if (!Array.isArray(filteredData)) return null;

    return filteredData.map((item) => (
      <SearchCard
        key={item.id}
        imageUrl={item.imageUrl}
        title={item.title || item.name}
        location={item.location || item.country || item.city}
        description={item.description}
        rating={item.rating || "N/A"}
        category={item.category}
      />
    ));
  };

  const renderAllCards = () => {
    return (
      <>
        {filteredData.cities?.length > 0 && (
          <div className="flex flex-row items-center gap-2">
            <FontAwesomeIcon
              icon={faCity}
              className="text-secondary-text size-6"
            />
            <h2 className=" font-semibold text-secondary-text text-xl">
              Cities
            </h2>
          </div>
        )}
        {filteredData.cities?.map((city) => (
          <SearchCard
            key={city.id}
            imageUrl={city.imageUrl}
            title={city.name}
            location={city.country}
            description={city.description}
            rating={city.rating}
            category="city"
          />
        ))}

        {filteredData.hotels?.length > 0 && (
          <>
            <hr className="h-1 bg-divider-clr rounded-2xl" />
            <div className="flex flex-row items-center gap-2">
              <FontAwesomeIcon
                icon={faHotel}
                className="text-secondary-text size-6"
              />
              <h2 className=" font-semibold text-secondary-text text-xl">
                Hotels
              </h2>
            </div>
          </>
        )}
        {filteredData.hotels?.map((hotel) => (
          <SearchCard
            key={hotel.id}
            imageUrl={hotel.imageUrl}
            title={hotel.name}
            location={hotel.city}
            description={hotel.description}
            rating={hotel.rating}
            category="hotel"
          />
        ))}

        {filteredData.activities?.length > 0 && (
          <>
            <hr className="h-1 bg-divider-clr rounded-2xl" />
            <div className="flex flex-row items-center gap-2">
              <FontAwesomeIcon
                icon={faBicycle}
                className="text-secondary-text size-6"
              />
              <h2 className=" font-semibold text-secondary-text text-xl">
                Activities
              </h2>
            </div>
          </>
        )}
        {filteredData.activities?.map((activity) => (
          <SearchCard
            key={activity.id}
            imageUrl={activity.imageUrl}
            title={activity.title}
            location={activity.city}
            description={activity.description}
            rating={activity.rating}
            category="activity"
          />
        ))}
        {filteredData.venues?.length > 0 && (
          <>
            <hr className="h-1 bg-divider-clr rounded-2xl" />
            <div className="flex flex-row items-center gap-2">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-secondary-text size-6"
              />
              <h2 className=" font-semibold text-secondary-text text-xl">
                Venues
              </h2>
            </div>
          </>
        )}
        {filteredData.venues?.map((venue) => (
          <SearchCard
            key={venue.id}
            imageUrl={venue.imageUrl}
            title={venue.title}
            location={venue.city}
            description={venue.description}
            rating={venue.rating}
            category="venue"
          />
        ))}
      </>
    );
  };

  return (
    <div className="w-full min-h-fit flex flex-col my-16 xsm:mx-3.5 sm:mx-5 md:mx-10 lg:mx-auto max-w-6xl">
      <h1 className=" text-mainText lg:text-left xsm:text-center font-semibold text-2xl my-5">
        Search result for {currentSearchInput}{" "}
        {filter === "all" ? null : `- ${filter}`}
      </h1>
      <SearchBarResult
        setCurrentSearchInput={setCurrentSearchInput}
        currentSearchInput={currentSearchInput}
      />
      <div className="my-5 flex flex-row lg:justify-start xsm:justify-center space-x-5">
        {filterTypes.map((type) => (
          <Chip
            key={type.id}
            variant={selectedFilter === type.label ? "filled" : "bordered"}
            color={selectedFilter === type.label ? "primary" : "default"}
            classNames={{
              base: "font-semibold hover:text-white",
            }}
            className={`${
              selectedFilter === type.label
                ? "bg-mainBtn text-white"
                : "hover:bg-hoverLinkBtn "
            } font-bold   cursor-pointer`}
            onClick={() => setSelectedFilter(type.label)}
          >
            {capitalizeFirstLetter(type.label)}
          </Chip>
        ))}
      </div>
      {isLoadingData ? (
        <div className="flex justify-center items-center my-10">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="flex flex-col space-y-10 my-5 flex-grow">
          {Object.values(filteredData).flat().length === 0 ? (
            <div className="flex-grow flex justify-center items-center">
              <h1 className="text-lg font-semibold text-gray-600">
                No results found for {searchInput}.
              </h1>
            </div>
          ) : filter === "all" ? (
            renderAllCards()
          ) : (
            renderFilterCards()
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResultList;
