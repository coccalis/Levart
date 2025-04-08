import { useNavigate } from "react-router-dom";
import { RatingIcon } from "../../assets/icons/RatingIcon";
import { renderCategoryIcon } from "../../utils/typeIconService";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faFlag,
  faMapPin,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

//bg-[#D4FBD7]

function SearchResultCard({ item, isLoading, title, category }) {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate(`/search/${category}/${item?.name || item?.title}`);
  };
  return (
    <div>
      <div className="flex flex-row items-center gap-2">
        {renderCategoryIcon({ category: category })}
        <p className="text-mainText text-xl font-bold">
          {title} <span className="text-secondary-text font-semibold">(1)</span>
        </p>
      </div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 500, damping: 90 }}
        onClick={handleNav}
        className=" border-1 border-gray-200 shadow-md rounded-lg p-5 my-5 cursor-pointer"
      >
        <div className="flex flex-row items-start gap-5">
          <div className="w-1/3">
            <img
              src={item?.imageUrl}
              alt="result"
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>

          <div className="w-2/3 flex flex-col justify-center pr-5 space-y-3">
            <h1 className="text-mainText text-2xl font-bold">
              {item?.title || item?.name}
            </h1>
            <div className="flex flex-row items-center gap-2">
              <FontAwesomeIcon
                icon={faMapPin}
                className="text-mainText size-5"
              />

              <p className="text-mainText text-lg font-semibold">
                {item?.location || item?.address}
              </p>
            </div>
            {item?.type && (
              <div className="flex flex-row items-center gap-2">
                <FontAwesomeIcon
                  icon={faFlag}
                  className=" text-mainText size-5"
                />
                <p className="text-mainText font-semibold text-lg">
                  {item?.type}
                </p>
              </div>
            )}
            {item?.hours && (
              <div className="flex flex-row items-center gap-2">
                <FontAwesomeIcon
                  icon={faClock}
                  className=" text-mainText size-5"
                />
                <p className="text-mainText font-semibold text-lg">
                  {item?.hours}
                </p>
              </div>
            )}
            {item?.stars && (
              <div className="flex flex-row items-center gap-2">
                {Array.from({ length: item?.stars || 0 }).map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    className="text-mainText size-6"
                  />
                ))}
              </div>
            )}
            <p className="text-secondary-text text-lg font-semibold line-clamp-2">
              {item?.description}
            </p>
            <div className="flex flex-row items-center gap-2 mt-2">
              <RatingIcon
                rating={item.rating}
                className=" text-mainBtn size-10"
              />
              <p className="capitalize font-bold text-mainBtn text-2xl">
                {item?.rating}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SearchResultCard;
