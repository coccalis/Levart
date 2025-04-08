import { Avatar, Button } from "@nextui-org/react";

function SuggestedCard({ profileImg, name, username }) {
  return (
    <div className="flex flex-row items-center space-x-7 border-1 border-gray-200 rounded-lg p-2 hover:bg-gray-100 transition cursor-pointer ">
      <Avatar
        radius="full"
        src={profileImg}
        alt="profile"
        className="w-10 h-10"
      />
      <div className="flex flex-col">
        <h1 className="font-semibold text-mainText">{name}</h1>
        <p className="font-semibold text-secondary-text">@{username}</p>
      </div>
    </div>
  );
}

export default SuggestedCard;
