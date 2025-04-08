import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Spinner } from "@nextui-org/react";
import { leaveGroup } from "../../services/groups-api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setDeleteTrigger } from "../../store/groupSlice";

function MembersCard({ key, member, groupId }) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await leaveGroup(groupId, member.username);
      setIsLoading(false);
      dispatch(setDeleteTrigger(true));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      key={key}
      className="w-full border-1 border-gray-200 rounded-lg p-2 my-5"
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-start items-center space-x-10">
          <Avatar
            radius="full"
            src={member?.imageUrl}
            alt="profile"
            className="w-14 h-14"
          />
          <div className="flex flex-col ">
            <h1 className="text-mainText font-semibold">
              {member?.firstname} {member?.lastname}
            </h1>
            <h1 className="text-secondary-text">@{member?.username}</h1>
          </div>
        </div>
        <Button color="danger" isIconOnly onClick={() => handleDelete()}>
          {isLoading ? (
            <Spinner color="white" size="md" />
          ) : (
            <FontAwesomeIcon icon={faTrashCan} color="white" />
          )}
        </Button>
      </div>
    </div>
  );
}

export default MembersCard;
