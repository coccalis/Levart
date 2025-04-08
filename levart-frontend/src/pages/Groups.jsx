import { Button, Spinner } from "@nextui-org/react";
import GroupPrev from "../components/ui/GroupPrev";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchGroups,
  fetchJoinedGroups,
  fetchOwnedGroups,
} from "../store/groupSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Groups() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { groups, isLoading, myGroups, joinedGroups } = useSelector(
    (state) => state.group
  );
  const { connectedUserProfile } = useSelector((state) => state.profile);
  console.log(connectedUserProfile);
  const username = connectedUserProfile?.username;
  console.log("username", username);

  useEffect(() => {
    if (username) {
      dispatch(fetchGroups());
      dispatch(fetchOwnedGroups({ username }));
      dispatch(fetchJoinedGroups({ username }));
    }
  }, [dispatch, username]);

  console.log(groups);

  const handleNav = () => {
    navigate("/create-group");
  };

  console.log("groups", groups);
  console.log("myGroups", myGroups);

  console.log("joinedGroups", joinedGroups);

  return (
    <main className="mx-16 p-6 overflow-y-auto">
      <div className="w-full max-w-7xl mx-auto ">
        <div className="my-5 flex flex-col space-y-3">
          <h1 className="font-semibold text-mainText text-3xl ">
            Levart Nomads
          </h1>
          <p className="font-semibold text-secondary-text text-sm">
            Discover a vibrant community of explorers who share your love for
            adventure and discovery. Join our groups to connect with fellow
            travelers, swap insider tips, and plan unforgettable journeys
            together. Whether you're a seasoned globetrotter or just starting
            your travel journey, you'll find inspiration, support, and endless
            possibilities here. Let’s explore the world—one connection at a
            time!
          </p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-semibold text-xl text-mainText">Discover: </h1>
          <Button
            color="primary"
            className="font-semibold"
            onClick={() => handleNav()}
            startContent={<FontAwesomeIcon icon={faPlus} />}
          >
            Create Group
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-6 my-5">
          {!isLoading ? (
            groups && groups.length > 0 ? (
              groups.map((group, index) => (
                <GroupPrev key={index} id={group.id} group={group} />
              ))
            ) : (
              <p>No groups available</p>
            )
          ) : (
            <Spinner color="primary" size="large" />
          )}
        </div>
      </div>
    </main>
  );
}

export default Groups;
