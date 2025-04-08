import { useDispatch, useSelector } from "react-redux";
import { fetchSuggestedUsers } from "../../store/profileSlice";
import { useEffect } from "react";

import SuggestedCard from "../ui/SuggestedCard";
import { fetchJoinedGroups } from "../../store/groupSlice";
import JoinedGroupsCard from "../ui/JoinedGroupsCard";

function SideBarRight() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { suggestUsers } = useSelector((state) => state.profile);
  const { joinedGroups } = useSelector((state) => state.group);

  const { username } = user;
  useEffect(() => {
    if (username) {
      dispatch(fetchJoinedGroups({ username }));
    }
    dispatch(fetchSuggestedUsers());
  }, [dispatch]);

  console.log("suggestedUsers", suggestUsers);
  console.log(joinedGroups);
  return (
    <div className="h-full">
      <div className="sticky top-0 flex flex-col me-5 my-5">
        <div className="w-72 bg-white border-1 border-gray-200 shadow-md rounded-2xl p-5 space-y-5">
          <h1 className=" font-semibold text-mainText">Suggested Friends</h1>

          {Array.isArray(suggestUsers) && suggestUsers?.length > 0 ? (
            suggestUsers?.map((user, index) => (
              <SuggestedCard
                key={index}
                profileImg={user.imageUrl}
                name={`${user.firstname} ${user.lastname}`}
                username={user.username}
              />
            ))
          ) : (
            <h1>No suggested users</h1>
          )}
        </div>
        <div className="my-10 w-72 bg-white border-1 border-gray-200 shadow-md rounded-2xl p-5 space-y-5">
          <h1 className=" font-semibold text-mainText">Joined Groups</h1>
          {Array.isArray(joinedGroups) && joinedGroups?.length > 0 ? (
            joinedGroups?.map((group, index) => (
              <JoinedGroupsCard id={group.id} group={group} />
            ))
          ) : (
            <h1>No groups joined yet</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBarRight;
