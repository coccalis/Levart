import { Avatar } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function ChatRoomHeader({ receiver }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-row space-x-5 items-center p-2 cursor-pointer"
      onClick={() => navigate(`/profile/${receiver?.username}`)}
    >
      <Avatar src={receiver?.imageUrl} className="w-10 h-10 rounded-full " />
      <div className="flex flex-col group">
        <h1 className="text-mainText font-semibold text-lg group-hover:text-hoverText transition">
          {receiver?.firstname} {receiver?.lastname}
        </h1>
        <p className="text-sm text-secondary-text font-semibold group-hover:text-hoverText transition">
          @{receiver?.username}
        </p>
      </div>
    </div>
  );
}

export default ChatRoomHeader;
