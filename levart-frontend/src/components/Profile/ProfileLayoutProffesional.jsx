import {
  faMapMarkerAlt,
  faPencil,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, useDisclosure } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFollowers, fetchFollowing } from "../../store/profileSlice";
import { followUser, unFollowUser } from "../../services/connection-api";
import { isFollowing } from "../../utils/checkFollowing";
import ModalConnections from "./ModalConnections";

function ProfileLayoutProffesional({
  authUser,
  isMyProfile,
  userProfile,
  followers,
  following,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [checkIsFollowing, setCheckIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleNav = () => {
    navigate("/edit-profile");
  };

  useEffect(() => {
    if (followers?.length > 0) {
      const userIsFollowing = isFollowing(followers, authUser);
      setCheckIsFollowing(userIsFollowing);
    } else {
      setCheckIsFollowing(false);
    }
  }, [followers, authUser]);

  const refetchConnections = () => {
    dispatch(fetchFollowers({ username: userProfile.username }));
    dispatch(fetchFollowing({ username: userProfile.username }));
  };

  const handleFollow = async (username) => {
    if (loading) return;
    setLoading(true);

    try {
      if (checkIsFollowing) {
        await unFollowUser({ username });
      } else {
        await followUser({ username });
      }
      refetchConnections();
    } catch (error) {
      console.error("Error updating follow status:", error);
    } finally {
      setLoading(false); // Reset button state
    }
  };

  console.log("followers gamw: ", followers);
  console.log("following gamw: ", following);

  return (
    <>
      <div>
        <div>
          <img
            src={userProfile?.backgroundImgUrl}
            alt="bg-img"
            className="w-full h-full rounded-lg aspect-[21/9] object-cover"
          />
        </div>
        <div className="mb-10">
          <div className=" flex flex-row justify-between">
            <Avatar
              radius="full"
              src={userProfile?.imageUrl}
              alt="profile"
              className="w-36 h-36 -translate-y-10 translate-x-10"
            />
            <div className="flex flex-row justify-end">
              {isMyProfile ? (
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className=" text-gray-500 font-semibold hover:bg-gray-200 p-3 cursor-pointer rounded-lg transition h-12"
                  onClick={() => handleNav()}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </motion.div>
              ) : (
                <Button
                  color="primary"
                  disabled={loading}
                  onClick={() => handleFollow(userProfile?.username)}
                  variant={checkIsFollowing ? "bordered" : "solid"}
                  className="my-5 font-semibold"
                  startContent={
                    checkIsFollowing ? null : (
                      <FontAwesomeIcon icon={faUserPlus} />
                    )
                  }
                >
                  {loading
                    ? "Processing..."
                    : checkIsFollowing
                    ? "Unfollow"
                    : "Follow"}
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-col mx-16 space-y-3">
            <div>
              <h1 className=" text-mainText font-bold text-2xl">
                {userProfile?.firstname} {userProfile?.lastname}
              </h1>
            </div>
            <div>
              <h1 className=" text-secondary-text font-semibold">
                {userProfile?.about}
              </h1>
            </div>
            <div className="flex flex-row space-x-10">
              <h1 className="text-secondary-text font-semibold">
                @{userProfile.username}
              </h1>
              <div className="flex flex-row items-center space-x-3">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-mainText"
                />
                <h1 className=" text-mainText font-semibold">
                  {userProfile.city} - {userProfile.country}
                </h1>
              </div>
              <div
                className="flex flex-row gap-5 group cursor-pointer"
                onClick={onOpen}
              >
                <h1 className="group-hover:text-hoverText text-mainText font-semibold">
                  Followers {followers.length}
                </h1>
                <h1 className="group-hover:text-hoverText text-mainText font-semibold">
                  Following {following.length}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalConnections
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        followers={followers}
        following={following}
      />
    </>
  );
}

export default ProfileLayoutProffesional;
