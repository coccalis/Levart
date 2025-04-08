import { useMemo, useState } from "react";
import Post from "./Post";
import { Pagination } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignsPost } from "@fortawesome/free-solid-svg-icons";

function SearchResultPosts({ posts, postsShown = 4, location: address }) {
  const { connectedUserProfile } = useSelector((state) => state.profile);

  console.log(address);

  const [currentPage, setCurrentPage] = useState(1);
  const filteredPosts = posts?.filter((post) => post?.location === address);
  const paginatedPosts = useMemo(() => {
    if (!filteredPosts || filteredPosts.length === 0) return [];
    const startIndex = (currentPage - 1) * postsShown;
    return filteredPosts.slice(startIndex, startIndex + postsShown);
  }, [posts, currentPage, postsShown]);

  console.log(posts);
  return (
    <div className="my-5 text-mainText font-semibold">
      <div className="flex flex-row items-center gap-5">
        <FontAwesomeIcon icon={faSignsPost} className="size-6 text-mainText" />
        <h1 className="text-2xl">Posts</h1>
        <p className=" text-secondary-text font-semibold text-2xl">
          ({filteredPosts.length})
        </p>
      </div>
      {/* <div className="flex flex-row justify-start gap-x-5 my-5">
    {initialsOpt.map((opt, index) => (
      <Chip key={index} variant="bordered">
        {opt}
      </Chip>
    ))}
  </div> */}
      <div className="my-5">
        {paginatedPosts.length === 0 && (
          <p className="text-center text-mainText font-bold text-xl">
            No posts!
          </p>
        )}
        <div className="grid grid-cols-2 gap-10 ">
          {paginatedPosts?.length > 0
            ? paginatedPosts.map((post, index) => (
                <Post
                  key={index}
                  user={post.user}
                  description={post.description}
                  location={post.location}
                  tags={post.tags}
                  rating={post.rating}
                  timestamp={post.timestamp}
                  imageUrl={post.imageUrl}
                  post={post}
                  authUser={connectedUserProfile}
                />
              ))
            : null}
        </div>
        {paginatedPosts && paginatedPosts.length > 0 && (
          <div className="w-full flex justify-center my-10">
            <Pagination
              showControls
              total={Math.ceil(filteredPosts.length / postsShown)}
              initialPage={1}
              onChange={(page) => setCurrentPage(page)}
              page={currentPage}
              classNames={{
                cursor: "bg-mainBtn",
                item: "active: text-black",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResultPosts;
