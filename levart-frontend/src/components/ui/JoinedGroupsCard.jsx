import { Avatar } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function JoinedGroupsCard({ id, group }) {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate(`/groups-result/${id}/${group.name}`);
  };

  return (
    <div
      key={id}
      className="flex flex-row items-center space-x-7 border-1 border-gray-200 rounded-lg p-2 hover:shadow-lg cursor-pointer"
      onClick={() => handleNav()}
    >
      <Avatar
        radius="full"
        src={group.bgImage}
        alt="profile"
        className="w-10 h-10"
      />
      <div className="flex flex-col">
        <h1>{group.name}</h1>
      </div>
    </div>
  );
}

export default JoinedGroupsCard;
