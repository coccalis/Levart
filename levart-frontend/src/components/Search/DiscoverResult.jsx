import { useEffect } from "react";
import { fetchByName, fetchPostByCategory } from "../../store/browseSlice";
import { useDispatch, useSelector } from "react-redux";
import DiscoverInfoBox from "../ui/DiscoverInfoBox";
import SearchResultPosts from "../ui/SearchResultPosts";
import { RatingIcon } from "../../assets/icons/RatingIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faEnvelope,
  faFlag,
  faLaptop,
  faMapPin,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { shortenUrl } from "../../utils/generalUtils";

function DiscoverResult({ category, name }) {
  const dispatch = useDispatch();
  const { searchResult, postsByCategory } = useSelector(
    (state) => state.browse
  );

  useEffect(() => {
    dispatch(fetchByName({ category, name }));
    dispatch(fetchPostByCategory({ category }));
  }, [dispatch, category, name]);

  console.log(searchResult);

  return (
    <div className="w-full my-10 mx-auto max-w-7xl">
      <div className="flex justify-center my-5">
        <img
          src={searchResult?.imageUrl}
          alt={searchResult?.title || "Result"}
          className="rounded-lg w-full object-cover aspect-[21/9]"
        />
      </div>
      {/* info of result */}
      <div className=" text-mainText font-semibold flex flex-col space-y-2">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-2xl">
              {searchResult?.title
                ? `${searchResult?.title}, ${searchResult?.city}`
                : `${searchResult?.name}, ${searchResult?.city}`}
            </h1>
          </div>
          <div className="justify-end">
            <div className="flex flex-row items-center gap-5">
              <RatingIcon className="text-mainBtn size-8" />
              <h1 className="text-xl font-bold text-mainBtn">
                {searchResult?.rating}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <FontAwesomeIcon icon={faMapPin} className="text-mainText size-5" />
          <h1 className="text-lg">
            {searchResult?.address
              ? searchResult?.address
              : searchResult?.location}
          </h1>
        </div>
        <div className="flex flex-row space-x-5">
          {searchResult?.email ? (
            <div className="flex flex-row items-center gap-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-mainText size-5"
              />
              <p>{searchResult?.email}</p>
            </div>
          ) : null}
          {searchResult?.telephone ? (
            <div className="flex flex-row items-center gap-2">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-mainText size-5"
              />
              <p>{searchResult?.telephone}</p>
            </div>
          ) : null}

          {searchResult?.website ? (
            <div className="flex flex-row items-center gap-2">
              <FontAwesomeIcon
                icon={faLaptop}
                className="text-mainText size-5"
              />
              <a
                href={searchResult?.website}
                target="_blank"
                className=" hover:underline"
              >
                {shortenUrl(searchResult?.website)}
              </a>
            </div>
          ) : null}
          {searchResult?.openHours && searchResult?.closeHours ? (
            <div className="flex flex-row items-center gap-2">
              <FontAwesomeIcon
                icon={faClock}
                className="text-mainText size-5"
              />
              <p className=" text-mainText font-semibold">
                Open: &nbsp;
                {searchResult?.openHours} - {searchResult?.closeHours}
              </p>
            </div>
          ) : null}
          {searchResult?.hours ? (
            <div className="flex flex-row items-center gap-2">
              <FontAwesomeIcon
                icon={faClock}
                className="text-mainText size-5"
              />
              <p className=" text-mainText font-semibold">
                {searchResult?.hours}
              </p>
            </div>
          ) : null}
          {searchResult?.type ? (
            <div className="flex flex-row items-center gap-2">
              <FontAwesomeIcon
                icon={faFlag}
                className=" text-mainText size-5"
              />
              <p className=" text-mainText font-semibold">
                {searchResult?.type}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <DiscoverInfoBox
        category={category}
        description={searchResult?.description}
        priceRange={searchResult?.priceRange}
        ticketPrice={searchResult?.ticketPrice ? searchResult?.ticketPrice : 0}
        openHours={searchResult?.openHours}
        closeHours={searchResult?.closeHours}
        lat={searchResult?.lat}
        lng={searchResult?.lng}
        zoom={15}
      />

      <hr className="h-1 bg-divider-clr rounder-2xl my-5" />
      <SearchResultPosts
        posts={postsByCategory}
        postsShown={4}
        location={searchResult?.address}
      />
    </div>
  );
}

export default DiscoverResult;
