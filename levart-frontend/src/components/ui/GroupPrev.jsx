import { useNavigate } from "react-router-dom";
import prev from "../../assets/images/bgImg.png";
import { motion } from "framer-motion";

function GroupPrev({ id, group }) {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate(`/groups-result/${id}/${group.name}`);
  };
  console.log(group);
  return (
    <motion.div
      key={id}
      // whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500, damping: 90 }}
      className="w-full group cursor-pointer"
      onClick={handleNav}
    >
      <div className="w-max-screen group-hover:shadow-md">
        <img
          alt="placeholder"
          src={group.bgImage || prev}
          className="w-full h-full rounded-xl aspect-[16/9] hover:shadow-md"
        />
      </div>
      <div className="flex flex-col space-y-2 p-5 my-2 font-semibold border-1 border-gray-200 rounded-lg group-hover:shadow-md">
        <h1 className="text-2xl text-mainText">{group.name}</h1>
        <h1 className="text-secondary-text ">{group.information}</h1>
        <p className=" text-mainText text-sm">
          Memebers: {group.members.length}
        </p>
      </div>
    </motion.div>
  );
}

export default GroupPrev;
