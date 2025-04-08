import { Avatar } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";

function ChatUserList({ myProfile, user }) {
  const navigate = useNavigate();
  console.log(user);
  return (
    <Link to={`chatroom/${user.username}`}>
      <div className="p-2 flex flex-row justify-between items-center my-2 hover:bg-gray-100 cursor-pointer rounded-lg">
        <div className="flex flex-row items-center space-x-5">
          <Avatar
            className="cursor-pointer hover:border-1 hover:border-hoverLinkBtn"
            radius="full"
            size="lg"
            src={user.imageUrl}
            onClick={() => navigate(`/profile/${user?.username}`)}
          />
          <div className="flex flex-col space-y-2">
            <p className="text-md font-semibold leading-none text-mainText">
              {user?.username}
            </p>
            <p className=" text-sm text-secondary-text font-semibold  ">
              View messages
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ChatUserList;
