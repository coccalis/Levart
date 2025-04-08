import { faPencil, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, useDisclosure } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { followUser, unFollowUser } from "../../services/connection-api";
import { isFollowing } from "../../utils/checkFollowing";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowers, fetchFollowing } from "../../store/profileSlice";
import ModalConnections from "./ModalConnections";

function ProfileLayoutCreative({
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

  console.log("followers: ", followers);
  console.log("following: ", following);

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
  //use callback
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

  console.log("followers", followers);
  console.log("following", following);

  return (
    <>
      <div className="grid grid-cols-3 gap-x-5 my-5">
        <div className="flex flex-col justify-center border-1 border-gray-200 rounded-lg p-5 shadow-md">
          {isMyProfile ? (
            <div className="flex flex-row justify-end  space-x-5">
              <motion.div
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className=" text-gray-500 font-semibold hover:bg-gray-200 p-3 cursor-pointer rounded-lg transition"
                onClick={() => handleNav()}
              >
                <FontAwesomeIcon icon={faPencil} />
              </motion.div>
            </div>
          ) : (
            <></>
          )}
          <div>
            <div className="flex justify-center">
              <Avatar
                radius="full"
                src={userProfile?.imageUrl}
                alt="profile"
                className="w-36 h-36"
              />
            </div>
            <div className="flex flex-col my-2 mx-5  font-semibold text-mainText justify-center ">
              <div className="text-center space-y-2">
                <p className="font-bold text-mainText text-2xl">
                  {userProfile?.firstname} {userProfile?.lastname}
                </p>
                <p className="font-semibold text-secondary-text text-lg">
                  @{userProfile?.username}
                </p>
                <p
                  className="hover:text-hoverText cursor-pointer"
                  onClick={onOpen}
                >
                  Followers {followers?.length} | Following {following?.length}
                </p>
                <p className="font-semibold text-lg text-mainText">{`${userProfile?.city} - ${userProfile?.country}`}</p>
                <p className="w-full">{userProfile?.about}</p>
              </div>
              {!isMyProfile && (
                <Button
                  color="primary"
                  disabled={loading}
                  onClick={() => handleFollow(userProfile?.username)}
                  variant={checkIsFollowing ? "bordered" : "solid"}
                  startContent={
                    checkIsFollowing ? null : (
                      <FontAwesomeIcon icon={faUserPlus} />
                    )
                  }
                  className="my-5"
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
        </div>
        <div className="w-full flex justify-center col-span-2 shadow-sm">
          <img
            src={userProfile?.backgroundImgUrl}
            alt="bg-img"
            className="w-full h-full rounded-lg object-cover aspect-[16/9]"
          />
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

export default ProfileLayoutCreative;
