import { motion } from "framer-motion";
import { fetchTypeIcon } from "../../utils/typeIconService";
import { useNavigate } from "react-router-dom";
import { RatingIcon } from "../../assets/icons/RatingIcon";

function CustomCard({
  key,
  imageUrl,
  title,
  location,
  rating,
  type,
  category,
}) {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate(`/search/${category}/${title}`);
  };

  return (
    <motion.div
      key={key}
      className="group rounded-xl my-5  cursor-pointer"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 500, damping: 90 }}
      onClick={handleNav}
    >
      <div className="relative w-max-screen group-hover:shadow-lg">
        <img
          alt="placeholder"
          src={imageUrl}
          className="w-full h-full rounded-xl aspect-[4/3]"
        />
        {type && (
          <div className="absolute bottom-2 right-2 bg-mainBtn/65 rounded-md p-1">
            {fetchTypeIcon({
              type: type,
              color: "white",
              size: "4",
            })}
          </div>
        )}
      </div>

      <div className="p-2 my-2 rounded-xl  border-1 border-gray-200 group-hover:shadow-lg">
        <p className="font-semibold text-xl text-mainText truncate">{title}</p>
        <p className="font-semibold text-lg text-secondary-text">{location}</p>
        <div className="flex flex-row items-center space-x-3">
          <RatingIcon className="text-mainBtn size-8" />
          <span className=" text-hoverText font-bold text-lg">{rating}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default CustomCard;
