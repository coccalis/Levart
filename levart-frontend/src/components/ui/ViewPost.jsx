import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faLocationDot,
  faPaperPlane,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  createComment,
  deletePost,
  editPost,
  likePost,
  unlikePost,
} from "../../services/post-api";
import useFetchComments from "../../hooks/useFetchComments";
import useFetchLikes from "../../hooks/useFetchLikes";
import CommentCard from "./CommentCard";
import { refactorPostDate } from "../../utils/refactorTimeDate";
import { renderCategoryIcon } from "../../utils/typeIconService";
import { useDispatch } from "react-redux";
import { setDeletePostAlert } from "../../store/profileSlice";
import StarRating from "./StarRating";

function ViewPost({ isOpen, onOpenChange, post, isMyPost, userAuth }) {
  const dispatch = useDispatch();

  const { comments: postComments, loading } = useFetchComments(post?.id);
  const { likes: postLikes, updateLikes } = useFetchLikes(post?.id);
  const [liked, setLiked] = useState(false);
  const [editPostStatus, setEditPostStatus] = useState(false);
  const [comments, setComments] = useState([]);

  const [postForm, setPostForm] = useState({
    location: post?.location,
    description: post?.description,
    tags: post?.tags,
    rating: post?.rating,
    category: post?.category,
    groupId: post?.groupId,
  });

  useEffect(() => {
    if (postLikes && userAuth) {
      setLiked(postLikes.some((like) => like.id === userAuth.id));
    }
  }, [postLikes, userAuth]);

  useEffect(() => {
    if (postComments) setComments(postComments);
  }, [postComments]);

  const [commentForm, setCommentForm] = useState({
    id: post?.id,
    content: "",
  });
  const formatedTags = post?.tags
    .split(",")
    .map((tag) => `#${tag.trim()}`)
    .join(" ");

  const handleMakeComment = async () => {
    if (commentForm.content.trim() === "") return;

    try {
      const savedComment = await createComment(commentForm);
      setComments((prev) => [
        ...prev,
        {
          ...savedComment,
          user: userAuth,
          content: commentForm.content,
          date: new Date().toISOString().split("T")[0],
          time: new Date().toISOString().split("T")[1].split(".")[0],
        },
      ]);
      setCommentForm({ ...commentForm, content: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPost = async () => {
    try {
      await editPost(post.id, postForm);
    } catch (error) {
      console.log(error);
    } finally {
      setEditPostStatus(false);
    }
  };

  const handleLikeToggle = async () => {
    console.log(liked);
    try {
      if (liked) {
        await unlikePost(post.id);
        updateLikes("unlike", post.id); // Remove like locally
      } else {
        await likePost(post.id);
        updateLikes("like", post.id); // Add like locally
      }
      setLiked(!liked); // Toggle the like state
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(post.id);
      dispatch(setDeletePostAlert(true));
    } catch (error) {
      console.log(error);
    } finally {
      onOpenChange(false);
    }
  };

  console.log("rating: ", post?.ratingType);
  console.log(post?.rating);

  // console.log(postLikes);
  // console.log("postComments", postComments);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      scrollBehavior="inside"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col  gap-1">
              <div className="flex justify-between items-center gap-5">
                <div className="flex items-center gap-5">
                  <Avatar
                    className="cursor-pointer hover:border-1 hover:border-hoverLinkBtn"
                    radius="full"
                    size="lg"
                    src={post?.user?.imageUrl}
                  />
                  <div className="flex flex-col space-y-2">
                    <a
                      href={`/profile/${post?.user?.username}`}
                      className="text-small font-semibold leading-none text-default-600"
                    >
                      {`${post?.user?.firstname} ${post?.user?.lastname} - @${post?.user?.username}`}
                    </a>

                    {editPostStatus ? (
                      <Input
                        placeholder={post?.location}
                        value={postForm.location}
                        startContent={
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="size-4"
                          />
                        }
                        onChange={(e) =>
                          setPostForm({ ...postForm, location: e.target.value })
                        }
                      />
                    ) : (
                      <div className="flex flex-row items-center gap-2">
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="text-secondary-text size-4"
                        />
                        <p className="text-small text-default-500">
                          {post?.location}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ModalHeader>
            <ModalBody>
              {editPostStatus ? (
                <Input
                  placeholder={post?.description}
                  value={postForm.description}
                  onChange={(e) =>
                    setPostForm({ ...postForm, description: e.target.value })
                  }
                />
              ) : (
                <p>{post?.description}</p>
              )}
              {post?.ratingType ? (
                <Accordion>
                  <AccordionItem
                    key="1"
                    aria-label="rating"
                    title={`${post?.user?.username} Rating`}
                    classNames={{
                      title: "font-semibold text-mainText",
                    }}
                  >
                    <div
                      className={`${
                        post?.ratingType
                          ? "grid grid-cols-2 gap-7 justify-items-center content-center  items-center"
                          : ""
                      } text-sm font-semibold `}
                    >
                      {post?.ratingType ? (
                        Object.entries(post?.ratingType).map(
                          ([key, value], index) => (
                            <div
                              key={index}
                              className="flex flex-row items-center gap-5"
                            >
                              <p className="capitalize">
                                {key.replaceAll("-", " ")} ({value.toFixed(1)}):
                              </p>
                              <StarRating rating={value} />
                            </div>
                          )
                        )
                      ) : (
                        <div className="flex flex-row items-center gap-5">
                          <p className="font-semibold text-mainText text-xl">
                            {post?.rating}:{" "}
                          </p>
                          <StarRating rating={post?.rating} />
                        </div>
                      )}
                    </div>
                  </AccordionItem>
                </Accordion>
              ) : null}
              <div className="pt-2">
                {editPostStatus ? (
                  <Input
                    placeholder={post?.tags}
                    value={postForm.tags}
                    onChange={(e) =>
                      setPostForm({ ...postForm, tags: e.target.value })
                    }
                  />
                ) : (
                  <div>
                    <p className="text-small text-secondary-text flex flex-row items-center gap-1 font-semibold">
                      Category:
                      <span className=" capitalize"> {post?.category}</span>
                      <span>
                        {renderCategoryIcon({
                          category: post?.category,
                          size: 3,
                          extraStyle: "secondary-text",
                        })}
                      </span>
                    </p>
                    <span className="pt-2 text-hoverText font-bold text-md">
                      {formatedTags}
                    </span>
                  </div>
                )}
              </div>
              {post?.imageUrl ? (
                <div className="flex flex-row space-x-5 w-full justify-start">
                  <img
                    alt="Card background"
                    className="object-cover rounded-xl min-w-full h-2/3 aspect-[21/9] "
                    src={post?.imageUrl}
                  />
                </div>
              ) : null}
              <p className="text-small text-secondary-text font-semibold">
                Posted on {refactorPostDate(post?.timestamp)}
              </p>

              {editPostStatus ? null : (
                <>
                  <div className="flex flex-row space-x-5 border-1 border-gray-200 rounded-xl shadow-sm">
                    <Button
                      className=" bg-transparent font-semibold text-mainText"
                      onClick={() => handleLikeToggle()}
                    >
                      <FontAwesomeIcon
                        icon={faHeart}
                        className={`text-${
                          liked ? "linkBtn" : "secondary-text"
                        } size-5`}
                      />
                      {postLikes?.length || 0} Like
                    </Button>
                    <Button className=" bg-transparent font-semibold text-mainText">
                      <FontAwesomeIcon
                        icon={faComment}
                        className=" text-secondary-text size-5"
                      />
                      {postComments?.length || 0} Comment
                    </Button>

                    {isMyPost ? (
                      <>
                        <button
                          className="flex flex-row items-center gap-2 font-semibold text-secondary-text text-small px-2 py-1 hover:text-mainText  transition"
                          onClick={() => setEditPostStatus(!editPostStatus)}
                        >
                          <FontAwesomeIcon icon={faPencil} />
                          Edit Post
                        </button>
                        <button
                          className="flex flex-row items-center gap-2 font-semibold text-red-400 text-small px-2 py-1 hover:text-red-500  transition"
                          onClick={() => handleDeletePost()}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                          Delete Post
                        </button>
                      </>
                    ) : null}
                  </div>
                  <div className=" ">
                    {Array.isArray(comments) && comments.length > 0 ? (
                      comments.map((comment, index) => (
                        <>
                          <CommentCard
                            key={index}
                            comment={comment}
                            isMyPost={isMyPost}
                            userAuth={userAuth}
                          />
                          <hr />
                        </>
                      ))
                    ) : (
                      <p className="text-center text-small text-secondary-text font-semibold">
                        Echo... echo... Looks like this post is waiting for its
                        first fan!
                      </p>
                    )}
                  </div>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              {editPostStatus ? (
                <>
                  <Button onClick={() => setEditPostStatus(false)}>
                    Cancel
                  </Button>
                  <Button color="primary" onClick={() => handleEditPost()}>
                    Save
                  </Button>
                </>
              ) : (
                <>
                  {userAuth?.imageUrl ? (
                    <Avatar radius="full" size="md" src={userAuth?.imageUrl} />
                  ) : null}
                  <Input
                    placeholder="Write a comment"
                    value={commentForm.content}
                    onChange={(e) =>
                      setCommentForm({
                        ...commentForm,
                        content: e.target.value,
                      })
                    }
                  />
                  <Button onClick={() => handleMakeComment()} color="primary">
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className="text-white size-5"
                    />
                  </Button>
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ViewPost;
