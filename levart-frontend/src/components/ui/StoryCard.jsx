import prev from "../../assets/images/cities/athens-gr.jpg";
import { motion } from "framer-motion";
function StoryCard({ postImg, userPost }) {
  return (
    <motion.div className="relative border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
      <motion.img
        whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
        src={postImg}
        alt="Story"
        className="w-[200px] h-[300px] object-cover shadow-inner"
      />
      <div className="w-full absolute bottom-0 left-0 flex items-center space-x-2  text-white p-2  bg-gradient-to-b from-transparent to-black ">
        <img
          src={userPost?.imageUrl}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-sm font-medium">@{userPost?.username}</span>
      </div>
    </motion.div>
  );
}

export default StoryCard;
