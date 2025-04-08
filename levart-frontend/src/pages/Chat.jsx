import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchConnectedUser, fetchFollowing } from "../store/profileSlice";
import ChatUserList from "../components/ui/ChatUserList";

function Chat() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { following, connectedUserProfile } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(fetchFollowing({ username: user.username }));
    dispatch(fetchConnectedUser());
  }, [dispatch]);

  return (
    <div className="border-1 p-5 rounded-lg shadow-md">
      {following?.map((user) => (
        <ChatUserList
          key={user.follower.id}
          myProfile={connectedUserProfile}
          user={user.follower}
        />
      ))}
    </div>
  );
}

export default Chat;
