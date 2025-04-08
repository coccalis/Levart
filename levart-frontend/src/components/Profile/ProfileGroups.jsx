import { useDispatch, useSelector } from "react-redux";
import { fetchJoinedGroups, fetchOwnedGroups } from "../../store/groupSlice";
import { useEffect } from "react";
import GroupPrev from "../ui/GroupPrev";

function ProfileGroups({ isMyProfile }) {
  const dispatch = useDispatch();
  const { myGroups, joinedGroups } = useSelector((state) => state.group);
  const { userProfile, connectedUserProfile } = useSelector(
    (state) => state.profile
  );
  const username = isMyProfile
    ? connectedUserProfile.username
    : userProfile.username;

  useEffect(() => {
    if (username) {
      dispatch(fetchOwnedGroups({ username }));
      dispatch(fetchJoinedGroups({ username }));
    }
  }, [dispatch]);
  return (
    <div className="font-semibold  text-mainText">
      {isMyProfile ? (
        <h1 className="text-xl">Your Groups: Created & Joined</h1>
      ) : (
        <>
          <h1 className="text-xl">Explore {username}'s Groups:</h1>
          <p className=" text-secondary-text">
            {" "}
            See the communities they've created and joined. Discover shared
            interests and connect with like-minded travelers!
          </p>
        </>
      )}
      {myGroups && myGroups.length > 0 && (
        <div className="my-5">
          <h1 className="text-xl my-2">{username} groups:</h1>
          <div className="grid grid-cols-3 gap-2">
            {myGroups.map((group, index) => (
              <GroupPrev key={index} id={group.id} group={group} />
            ))}
          </div>
        </div>
      )}
      {joinedGroups && joinedGroups.length > 0 && (
        <div className="my-5">
          <h1 className="text-xl my-2">Joined Groups:</h1>
          <div className="grid grid-cols-3 gap-2">
            {joinedGroups.map((group, index) => (
              <GroupPrev key={index} id={group.id} group={group} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileGroups;
