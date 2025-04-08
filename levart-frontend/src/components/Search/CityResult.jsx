import { useDispatch, useSelector } from "react-redux";
import {
  fetchActivitiesByCity,
  fetchByName,
  fetchHotelsByCity,
  fetchPostByCity,
  fetchVenuesByCity,
} from "../../store/browseSlice";
import { useEffect, useState } from "react";
import DiscoverInfoBox from "../ui/DiscoverInfoBox";
import StarRating from "../ui/StarRating";
import CarouselCard from "../ui/CarouselCard";
import {
  calculateAverageRating,
  ratingTypeLabelsCalc,
} from "../../utils/calculateAverageRating";
import SearchResultPosts from "../ui/SearchResultPosts";
import { RatingIcon } from "../../assets/icons/RatingIcon";
import weatherFetch from "../../services/weather-api";
import WeatherSection from "../ui/WeatherSection";
import SearchResultCard from "../ui/SearchResultCard";

function CityResult({ category, name }) {
  const [cityWeather, setCityWeather] = useState(null);

  const dispatch = useDispatch();
  const {
    searchResult,
    hotelsByCity,
    activitiesByCity,
    venuesByCity,
    postsByCity,
    isLoading,
  } = useSelector((state) => state.browse);

  useEffect(() => {
    dispatch(fetchByName({ category, name }));
    dispatch(fetchPostByCity({ city: name }));
    dispatch(fetchHotelsByCity({ city: name }));
    dispatch(fetchActivitiesByCity({ city: name }));
    dispatch(fetchVenuesByCity({ city: name }));
  }, [dispatch, category, name]);

  console.log("searchResult", searchResult);

  useEffect(() => {
    async function fetchWeather() {
      const data = await weatherFetch({ city: name });
      setCityWeather(data);
    }

    fetchWeather();
  }, [name]);
  // console.log("cityWeather", cityWeather);

  const cityRating = ratingTypeLabelsCalc(
    searchResult?.ratingType,
    searchResult?.category
  );
  console.log("cityRating", cityRating);

  return (
    <div className="w-full my-10 mx-auto max-w-7xl">
      <div className="flex justify-center my-5">
        <img
          src={searchResult?.imageUrl}
          alt={searchResult?.title || "Result"}
          className="rounded-lg w-full aspect-[21/9] object-cover"
        />
      </div>
      {/* info of result */}
      <div className=" text-mainText font-semibold">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-2xl">
              {`${searchResult?.name}, ${searchResult?.country}`}
            </h1>
          </div>
          <div className="justify-end">
            <div className="flex flex-row items-center gap-5">
              <RatingIcon className="text-mainBtn size-8" />
              <h1 className="text-xl font-bold text-mainBtn">
                {searchResult?.ratingType &&
                  calculateAverageRating(searchResult?.ratingType)}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <DiscoverInfoBox
        description={searchResult.description}
        lat={searchResult?.lat ? searchResult?.lat : 1}
        lng={searchResult?.lng ? searchResult?.lng : 1}
        zoom={10}
      />
      <hr className="h-1 bg-divider-clr rounder-2xl my-5" />
      {/* Ratings */}
      <div className=" text-mainText font-semibold">
        <div className="flex flex-row items-center gap-2">
          <RatingIcon className="text-mainText size-10" />
          <h1 className="text-2xl my-5 ">Ratings</h1>
        </div>
        <div className="grid grid-cols-2 text-xl content-center gap-7 justify-items-center items-center">
          {cityRating ? (
            Object.entries(cityRating).map(([key, value], index) => (
              <div key={index} className="flex flex-row items-center gap-5">
                <p className="capitalize">
                  {key.replaceAll("-", " ")} ({value.toFixed(1)}):
                </p>
                <StarRating rating={value} />
              </div>
            ))
          ) : (
            <p>No ratings available</p>
          )}
        </div>
      </div>

      <WeatherSection city={name} weather={cityWeather} />

      <hr className="h-1 bg-divider-clr rounder-2xl my-5" />
      {activitiesByCity.length === 0 &&
      hotelsByCity.length === 0 &&
      venuesByCity.length === 0 ? (
        <p className="text-center text-mainText text-xl font-bold">
          No results for {searchResult?.name}
        </p>
      ) : null}
      <div>
        {activitiesByCity && activitiesByCity.length > 0 ? (
          activitiesByCity.length === 1 ? (
            <SearchResultCard
              item={activitiesByCity[0]}
              isLoading={isLoading}
              title="Things to do"
              category="activity"
            />
          ) : (
            <CarouselCard
              items={activitiesByCity}
              isLoading={isLoading}
              title={"Things to do"}
              category={"activity"}
            />
          )
        ) : null}
        {hotelsByCity && hotelsByCity.length > 0 ? (
          hotelsByCity.length === 1 ? (
            <SearchResultCard
              item={hotelsByCity[0]}
              isLoading={isLoading}
              title="Places to stay"
              category="hotel"
            />
          ) : (
            <CarouselCard
              items={hotelsByCity}
              isLoading={isLoading}
              title={"Places to stay"}
              category={"hotel"}
            />
          )
        ) : null}
        {venuesByCity && venuesByCity.length > 0 ? (
          venuesByCity.length === 1 ? (
            <SearchResultCard
              item={venuesByCity[0]}
              isLoading={isLoading}
              title="Places to visit"
              category="venue"
            />
          ) : (
            <CarouselCard
              items={venuesByCity}
              isLoading={isLoading}
              title={"Places to visit"}
              category={"venue"}
            />
          )
        ) : null}

        <hr className="h-1 bg-divider-clr rounder-2xl my-5" />
        <SearchResultPosts
          posts={postsByCity}
          postsShown={4}
          location={searchResult?.name}
        />
      </div>
    </div>
  );
}

export default CityResult;
