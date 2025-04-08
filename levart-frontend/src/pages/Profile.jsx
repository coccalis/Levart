import { Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Post from "../components/ui/Post";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFollowers,
  fetchFollowing,
  fetchUser,
  fetchConnectedUser,
  fetchUserPosts,
} from "../store/profileSlice";
import { useParams } from "react-router-dom";
import ProfileLayoutCreative from "../components/Profile/ProfileLayoutCreative";
import ProfileLayoutProffesional from "../components/Profile/ProfileLayoutProffesional";
import ProfileMap from "../components/Profile/ProfileMap";
import CreatePost from "../components/ui/CreatePost";
import ProfileAchievements from "../components/Profile/ProfileAchievements";
import ProfileGroups from "../components/Profile/ProfileGroups";

function Profile() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const {
    followers,
    following,
    userPosts,
    userProfile,
    connectedUserProfile,
    deletePostAlert,
    triggerRefreshPosts,
    isLoading,
  } = useSelector((state) => state.profile);

  const [selected, setSelected] = useState("posts");
  const [localLoading, setLocalLoading] = useState(true);

  const isMyProfile = user?.username === username;
  useEffect(() => {
    dispatch(fetchUserPosts({ username }));
    dispatch(fetchConnectedUser());
    dispatch(fetchUser({ username }));
    dispatch(fetchFollowers({ username }));
    dispatch(fetchFollowing({ username }));
  }, [dispatch, username]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLocalLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (deletePostAlert || triggerRefreshPosts) {
      dispatch(fetchUserPosts({ username }));
    }
  }, [deletePostAlert, triggerRefreshPosts, dispatch, username]);

  // if (localLoading || isLoading === "loading") {
  //   return (
  //     <main className="w-full my-10 mx-auto max-w-7xl flex items-center justify-center">
  //       <Spinner color="primary" size="large" />
  //     </main>
  //   );
  // }

  console.log("userProfile", userProfile);

  return (
    <main className="w-full my-10 mx-auto max-w-7xl">
      {isLoading === "loading" ? (
        <h1>loading</h1>
      ) : userProfile.layout === 1 ? (
        <ProfileLayoutProffesional
          auth
          followers={followers}
          following={following}
          authUser={user?.username}
          isMyProfile={isMyProfile}
          userProfile={!isMyProfile ? userProfile : connectedUserProfile}
        />
      ) : (
        <ProfileLayoutCreative
          authUser={user?.username}
          isMyProfile={isMyProfile}
          userProfile={!isMyProfile ? userProfile : connectedUserProfile}
          followers={followers}
          following={following}
        />
      )}

      <div className="">
        <div className="flex flex-col ">
          <Tabs
            aria-label="Options"
            size="lg"
            radius="sm"
            color="primary"
            variant="bordered"
            selectedKey={selected}
            onSelectionChange={setSelected}
            className=" justify-evenly"
            classNames={{
              base: "w-full",
              tab: "font-semibold w-full",
              tabList: "w-full ",
              tabContent: "w-full",
              panel: "w-full",
            }}
          >
            <Tab key="posts" title="Posts">
              <div className="space-y-5">
                {isMyProfile ? (
                  <CreatePost user={connectedUserProfile} />
                ) : null}
                {Array.isArray(userPosts) && userPosts?.length > 0 ? (
                  userPosts?.map((post, index) => (
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
                      className="max-w-6xl mx-auto"
                      authUser={user}
                    />
                  ))
                ) : (
                  <p>nothing yet chief</p>
                )}
              </div>
            </Tab>
            <Tab key="map" title="Map">
              <ProfileMap
                username={isMyProfile ? user?.username : username}
                isMyProfile={isMyProfile}
              />
            </Tab>
            <Tab key="groups" title="Groups">
              <ProfileGroups isMyProfile={isMyProfile} />
            </Tab>
            <Tab key="achiv" title="Achievements">
              <ProfileAchievements isMyProfile={isMyProfile} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </main>
  );
}

export default Profile;
