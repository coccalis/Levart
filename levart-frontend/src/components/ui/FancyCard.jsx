import { Card, CardFooter } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function FancyCard({
  imageUrl,
  title,
  location,
  ratio,
  category,
  extrastyle = "",
}) {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate(`/search/${category}/${title}`);
  };

  return (
    <Card
      isPressable
      disableRipple
      radius="md"
      className="border-none bg-transparent my-5 "
      classNames={{
        base: "bg-transparent border-none",
        footer: "bg-transparent",
      }}
      onClick={handleNav}
    >
      <motion.img
        whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
        src={imageUrl}
        alt="hotels"
        className={`object-cover w-full ${ratio}`}
      />
      <CardFooter className="justify-start bg-gradient-to-b from-transparent to-black border-transparent overflow-hidden py-1 absolute bottom-0 w-full h-16 rounded-b-md shadow-small z-10">
        <p className="text-lg font-semibold text-white">{title}</p>

        {location && (
          <p className="text-lg font-semibold text-white">, {location}</p>
        )}
      </CardFooter>
    </Card>
  );
}

export default FancyCard;
