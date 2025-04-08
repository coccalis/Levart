import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";

function SearchCard({
  imageUrl,
  title,
  location,
  description,
  rating,
  category,
}) {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate(`/search/${category}/${title}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className=" max-w-screen-xl mx-10 rounded-lg grid grid-cols-2 gap-4 p-4 shadow-md border-1 border-gray-200"
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
            <span className=" font-semibold">Location: </span> {location}
          </p>
          <p className="text-md text-secondary-text mt-2 line-clamp-3">
            {description}
          </p>
          {/* <p className="text-2xl text-hoverText mt-2">{rating} ★★★★☆</p> */}
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

export default SearchCard;
