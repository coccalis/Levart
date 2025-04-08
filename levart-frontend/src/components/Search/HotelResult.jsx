import TabSectionHotel from "../ui/TabHotel";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchByName, fetchPostByCategory } from "../../store/browseSlice";
import StarRating from "../ui/StarRating";
import SearchResultPosts from "../ui/SearchResultPosts";
import {
  calculateAverageRating,
  ratingTypeLabelsCalc,
} from "../../utils/calculateAverageRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLaptop,
  faMapPin,
  faPhone,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { RatingIcon } from "../../assets/icons/RatingIcon";

function HotelResult({ category, name }) {
  const dispatch = useDispatch();
  const { searchResult, postsByCategory } = useSelector(
    (state) => state.browse
  );

  console.log(searchResult);
  const lat = parseFloat(searchResult?.lat);
  const lng = parseFloat(searchResult?.lng);

  console.log(lat, lng);

  useEffect(() => {
    dispatch(fetchByName({ category, name }));
    dispatch(fetchPostByCategory({ category }));
  }, [dispatch, category, name]);

  const hotelRating = ratingTypeLabelsCalc(
    searchResult?.ratingType,
    searchResult?.category
  );
  console.log(hotelRating);
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
          <div className="flex flex-row items-center gap-2">
            <h1 className="text-2xl">
              {searchResult?.title
                ? `${searchResult?.title}, ${searchResult?.city}`
                : `${searchResult?.name}`}
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
        <div className="flex flex-row items-center gap-2">
          <FontAwesomeIcon icon={faMapPin} className="text-mainText size-5" />
          <h1 className="text-lg">{searchResult?.address}</h1>
        </div>
        <div className="flex flex-row space-x-5">
          <div className="flex flex-row items-center gap-2">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-mainText size-5"
            />
            <p>{searchResult?.email}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <FontAwesomeIcon icon={faPhone} className="text-mainText size-5" />
            <p>{searchResult?.phone}</p>
          </div>
          {/* add anchor tag instead of p vvvv*/}
          <div className="flex flex-row items-center gap-2">
            <FontAwesomeIcon icon={faLaptop} className="text-mainText size-5" />
            <a
              href={searchResult?.website}
              target="_blank"
              rel="noreferrer"
              className=" hover:underline"
            >
              {searchResult?.website}
            </a>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className=" text-mainText font-semibold">Stars: </p>
            {Array.from({ length: searchResult?.stars || 0 }).map(
              (_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className="text-mainText size-4"
                />
              )
            )}
          </div>
        </div>
      </div>
      <TabSectionHotel
        name={searchResult?.name}
        country={searchResult?.country}
        languages={searchResult?.languages}
        description={searchResult?.description}
        lat={parseFloat(searchResult?.lat)}
        lng={parseFloat(searchResult?.lng)}
        propertyAmenities={searchResult?.propertyAmenities}
        roomFeatures={searchResult?.roomFeatures}
        ratingType={searchResult?.ratingType}
      />

      <hr className="h-1 bg-divider-clr rounder-2xl my-5" />
      {/* Ratings */}
      <div className=" text-mainText font-semibold">
        <div className="flex flex-row items-center gap-2">
          <RatingIcon className="text-mainText size-10" />
          <h1 className="text-2xl my-5 ">Ratings</h1>
        </div>
        <div className="grid grid-cols-2 text-xl content-center gap-7 justify-items-center items-center">
          {hotelRating ? (
            Object.entries(hotelRating).map(([key, value], index) => (
              <div key={index} className="flex flex-row items-center space-x-3">
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

      <SearchResultPosts
        posts={postsByCategory}
        postsShown={4}
        location={
          searchResult?.address || searchResult?.location || searchResult?.city
        }
      />
    </div>
  );
}

export default HotelResult;
