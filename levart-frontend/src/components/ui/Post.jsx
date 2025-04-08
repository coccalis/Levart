import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";
import { HeartIcon } from "../../assets/icons/HeartIcon";
import { CommentIcon } from "../../assets/icons/CommentIcon";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ViewPost from "./ViewPost";
import checkIfMyPost from "../../utils/checkIfMyPost";
import { refactorPostDate } from "../../utils/refactorTimeDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { renderCategoryIcon } from "../../utils/typeIconService";

function Post({
  user,
  description,
  imageUrl,
  location,
  tags,
  className = "w-full",
  groupStyle = "",
  post = null,
  authUser,
}) {
  const isMyPost = checkIfMyPost(authUser, user);

  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const formatedTags = tags
    .split(",")
    .map((tag) => `#${tag.trim()}`)
    .join(" ");

  return (
    <>
      <motion.div
        // whileHover={{ scale: 1.1 }}
        onClick={onOpen}
        className={`cursor-pointer ${groupStyle}`}
      >
        <Card
          className={`${className} ${
            imageUrl ? "min-h-[350px]" : "h-auto"
          } flex flex-col p-2`}
        >
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <Avatar
                className="cursor-pointer hover:border-1 hover:border-hoverLinkBtn"
                radius="full"
                size="lg"
                src={user?.imageUrl}
                onClick={() => navigate(`/profile/${user?.username}`)}
              />
              <div className="flex flex-col space-y-2">
                <a
                  href={`/profile/${user?.username}`}
                  className="text-small font-semibold leading-none text-mainText hover:text-secondary-text"
                >
                  {`${user.firstname} ${user.lastname} - @${user.username}`}
                </a>

                <div className="flex flex-row items-center gap-1">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-secondary-text size-4"
                  />
                  <a
                    href={`/profile/${user?.username}`}
                    className="text-small tracking-tight text-secondary-text "
                  >
                    {location}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-5 pe-5">
              <button className="bg-transparent hover:text-hoverLinkBtn">
                <HeartIcon />
              </button>
              <button className="bg-transparent hover:text-hoverLinkBtn">
                <CommentIcon />
              </button>
            </div>
          </CardHeader>
          <CardBody className="text-small text-default-400 flex flex0col justify-between">
            <p className=" text-mainText font-semibold text-md line-clamp-1">
              {description}
            </p>

            <div className="my-5 flex flex-col ">
              <p className="text-small text-secondary-text flex flex-row items-center gap-1 font-semibold">
                Category:
                <span className=" capitalize"> {post?.category}</span>
                <span>
                  {renderCategoryIcon({
                    category: post?.category,
                    size: 3,
                    extraStyle: "secondary-text",
                  })}
                </span>
              </p>
              <span className=" text-hoverText font-bold text-md">
                {formatedTags}
              </span>
            </div>
            {imageUrl !=
            "https://cocc.blob.core.windows.net/cock/1d3de56b-762e-4dea-92d0-2d096161d71e_default_name.jpg" ? (
              <div className="flex flex-row space-x-5 w-full justify-start">
                <img
                  alt="Card background"
                  className="object-cover rounded-xl min-w-full h-2/3 aspect-[21/9] "
                  src={imageUrl}
                />
              </div>
            ) : null}
          </CardBody>
          <CardFooter className="p-3">
            <p className="font-semibold text-small text-secondary-text">
              Posted on {refactorPostDate(post?.timestamp)}
            </p>
          </CardFooter>
        </Card>
      </motion.div>
      {isOpen ? (
        <ViewPost
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          post={post}
          isMyPost={isMyPost}
          userAuth={authUser}
        />
      ) : null}
    </>
  );
}

export default Post;
