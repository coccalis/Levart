import { useDispatch, useSelector } from "react-redux";
import StoryCard from "../components/ui/StoryCard";
import { useEffect, useMemo, useState } from "react";
import { fetchConnectedUser, fetchFollowingPosts } from "../store/profileSlice";
import Post from "../components/ui/Post";
import { Spinner } from "@nextui-org/react";
import CreatePost from "../components/ui/CreatePost";

function LevartHub() {
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { followingPosts, connectedUserProfile } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(fetchFollowingPosts());
    dispatch(fetchConnectedUser());
  }, [dispatch]);

  console.log(followingPosts);

  const displayedPosts = useMemo(() => {
    const sortedPosts = [...followingPosts].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
    return sortedPosts.slice(0, visiblePosts);
  }, [followingPosts, visiblePosts]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight =
        window.innerHeight || document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
        if (visiblePosts < followingPosts.length) {
          setIsLoading(true);
          setTimeout(() => {
            setVisiblePosts((prev) => prev + 5); // Load next 5 posts
            setIsLoading(false);
          }, 1000); // Simulate loading delay
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visiblePosts, isLoading, followingPosts]);

  return (
    <main className="w-full mx-16 max-w-8xl p-5 overflow-y-auto">
      <div className="my-5">
        <h1 className=" font-semibold text-mainText text-lg">
          Explore the World Through Their Lens:
        </h1>
        <p className=" text-secondary-text font-semibold text-sm">
          Discover stunning moments shared by the travelers you follow.
        </p>
      </div>
      <div className="w-full flex flex-row space-x-5">
        {followingPosts?.length > 0
          ? followingPosts
              .slice(0, 5)
              .sort(() => Math.random() - 0.5)
              .map((post, index) => (
                <StoryCard
                  key={index}
                  postImg={post.imageUrl}
                  userPost={post.user}
                />
              ))
          : null}
      </div>
      <div className="my-10">
        <hr className="h-1 bg-divider-clr rounder-2xl my-5" />

        <h1 className="text-xl text-mainText font-semibold">Posts</h1>
        <CreatePost
          user={connectedUserProfile}
          extraStyles="max-w-6xl mx-auto"
        />
        <div className="flex flex-col space-y-5 my-5">
          {displayedPosts?.length > 0 ? (
            displayedPosts.map((post, index) => (
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
            <p className=" text-secondary-text font-semibold text-sm text-center">
              Your feed is looking a little quiet—start following more travelers
              to see their latest adventures and get inspired for your next
              trip!
            </p>
          )}
        </div>

        <div className="flex justify-center">
          {isLoading && <Spinner color="primary" />}
        </div>
      </div>
    </main>
  );
}

export default LevartHub;
