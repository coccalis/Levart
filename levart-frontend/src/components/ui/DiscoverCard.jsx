import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RatingIcon } from "../../assets/icons/RatingIcon";

function DiscoverCard({
  id,
  imageUrl,
  title,
  location,
  country,
  description,
  rating,
  type = "",
  category,
}) {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate(`/search/${category}/${title}`);
  };

  return (
    <motion.div
      key={id}
      whileHover={{ scale: 1.1 }}
      className="w-full rounded-lg grid grid-cols-2 gap-4 p-4 shadow-md border-1 border-gray-200"
    >
      <div className="flex items-center">
        <img
          alt="Discover Card"
          src={imageUrl}
          className="w-full h-full rounded-lg object-cover aspect-[16/9]"
        />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-mainText">{title}</h1>
          <p className="text-md text-secondary-text ">
            <span className="font-semibold">Location: </span> {location},{" "}
            {country}
          </p>
          <p className="text-md text-secondary-text mt-2 line-clamp-2">
            {description}
          </p>
          {type === "" ? null : (
            <div className="flex flex-row items-center gap-2">
              <p className="text-md text-secondary-text font-semibold">
                Type: {type}
              </p>
            </div>
          )}
          <div className="flex flex-row items-center gap-2">
            <RatingIcon className="size-10 text-hoverText" />
            <p className="text-2xl text-hoverText font-bold">{rating} </p>
          </div>
        </div>

        <div className="mt-4">
          <Button
            color="primary"
            className="w-full font-semibold text-lg"
            onClick={handleNav}
          >
            Learn more
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default DiscoverCard;
