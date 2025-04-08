import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import fallback from "../assets/images/fallback_img.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchGroup, fetchGroupPosts } from "../store/groupSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { deleteGroup, joinGroup } from "../services/groups-api";
import CreatePost from "../components/ui/CreatePost";
import Post from "../components/ui/Post";
import isMemberOfGroup from "../utils/checkIfMember";

function GroupResult() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMember, setIsMember] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const { group, groupPosts, isLoading } = useSelector((state) => state.group);
  const { connectedUserProfile } = useSelector((state) => state.profile);
  const isAdmin = group?.adminUser?.id === connectedUserProfile?.id;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    dispatch(fetchGroupPosts({ groupId: id }));
    dispatch(fetchGroup(id));
  }, [dispatch, trigger]);

  const { name, information, members, adminUser } = group;

  useEffect(() => {
    if (group?.members && connectedUserProfile?.id) {
      const userIsMember = isMemberOfGroup(
        group.members,
        connectedUserProfile.id
      );
      setIsMember(userIsMember);
    }
  }, [group?.members, connectedUserProfile?.id]);

  const handleJoinGroup = async (groupId, username) => {
    try {
      await joinGroup(groupId, username);
      setTrigger((prev) => !prev); // Only update trigger after success
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      await deleteGroup(id);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("group", groupPosts);

  return (
    <main className="w-full max-w-7xl mx-auto p-6 overflow-y-auto">
      <div className=" ">
        <img
          src={group?.bgImage || fallback}
          alt="prev"
          className="w-full h-auto max-h-48 sm:max-h-56 md:max-h-72 lg:max-h-96 xl:max-h-[30rem] aspect-[16/9] object-cover  rounded-lg"
        />
        <div className="flex flex-row justify-end w-full">
          {isAdmin ? (
            <Dropdown placement="bottom-end" showArrow>
              <DropdownTrigger>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className=" text-gray-500 font-semibold hover:bg-gray-200  p-3 cursor-pointer rounded-lg transition"
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </motion.div>
              </DropdownTrigger>
              <DropdownMenu variant="flat">
                <DropdownItem
                  key="edit"
                  onClick={() => navigate(`/edit-group/${id}`)}
                  startContent={<FontAwesomeIcon icon={faPencil} />}
                  classNames={{ base: " text-mainText" }}
                >
                  <p className="font-semibold">Edit Group</p>
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  color="danger"
                  startContent={<FontAwesomeIcon icon={faTrash} />}
                  onClick={onOpen}
                  classNames={{ base: " text-danger" }}
                >
                  <p className="font-semibold">Delete Group</p>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <p></p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4 ">
          <div className="my-5 flex flex-col space-y-3 col-span-2 border-1 border-gray-200 rounded-xl shadow-md p-5">
            <h1 className="font-semibold text-mainText text-3xl ">{name}</h1>
            <p className="font-semibold text-secondary-text text-md">
              {group.privacy}
            </p>

            <p className="font-semibold text-secondary-text text-sm">
              {information}
            </p>
            {!isAdmin ? (
              <div className="flex flex-grow flex-col justify-end">
                {isMember ? (
                  <Button
                    color="primary"
                    variant="bordered"
                    className="font-semibold w-1/4"
                    disabled
                  >
                    Joined {`${name}`}
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    className="font-semibold w-1/4"
                    onClick={() =>
                      handleJoinGroup(id, connectedUserProfile?.username)
                    }
                  >
                    Join {`${name}`}
                  </Button>
                )}
              </div>
            ) : (
              <p></p>
            )}
          </div>
          <div className="border-1 border-gray-200 rounded-xl shadow-md p-5 my-5 space-y-3">
            <h1 className="font-semibold text-mainText text-lg">Admin</h1>
            <div
              className="flex flex-row space-x-5 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
              onClick={() => navigate(`/profile/${adminUser?.username}`)}
            >
              <Avatar
                radius="full"
                src={adminUser?.imageUrl}
                alt="profile"
                className="w-10 h-10"
              />
              <div className="flex flex-col">
                <h1 className="text-mainText font-semibold">
                  {adminUser?.firstname}
                  {adminUser?.lastname}
                </h1>
                <h1 className="text-secondary-text">@{adminUser?.username}</h1>
              </div>
            </div>
            <hr />
            <h1 className="font-semibold text-mainText text-lg">Members</h1>
            {members && members.length > 0 ? (
              members.map((member, index) => (
                <div className="flex flex-row space-x-5 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
                  <Avatar
                    radius="full"
                    src={member.imageUrl}
                    alt="profile"
                    className="w-10 h-10"
                  />
                  <h1 key={index} className="font-semibold text-secondary-text">
                    @{member.username}
                  </h1>
                </div>
              ))
            ) : (
              <p className="text-secondary-text font-semibold">
                No members yet
              </p>
            )}
          </div>
        </div>
        <div className="w-full max-w-7xl mx-auto mt-4">
          {isMember || isAdmin ? (
            <div className="grid grid-cols-3 ">
              <div className="col-span-2">
                <CreatePost groupId={id} user={connectedUserProfile} />
              </div>
            </div>
          ) : (
            <p></p>
          )}
          <div className="w-full grid grid-cols-3 ">
            {Array.isArray(groupPosts) && groupPosts?.length > 0 ? (
              groupPosts.map((post, index) => (
                <Post
                  key={index}
                  user={post.user}
                  description={post.description}
                  location={post.location}
                  tags={post.tags}
                  rating={post.ratingType}
                  imageUrl={post.imageUrl}
                  timestamp={post.timestamp}
                  post={post}
                  className="w-full  mx-auto "
                  groupStyle="col-span-2"
                  authUser={connectedUserProfile}
                />
              ))
            ) : (
              <div className="w-full col-span-2 justify-center">
                <p className="font-semibold text-secondary-text text-center ">
                  No posts yet—be the first to share your travel stories, tips,
                  or photos with the group! Your adventure could inspire others
                  to explore.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Group
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this group? This action cannot
                  be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={() => handleDeleteGroup()}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}

export default GroupResult;
