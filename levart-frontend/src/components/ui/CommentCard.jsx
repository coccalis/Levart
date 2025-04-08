import {
  faEllipsisVertical,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import checkIsMyComment from "../../utils/checkIsMyComment";
import { deleteComment, editComment } from "../../services/post-api";
import { useState } from "react";
import { refactorDate, refactorTime } from "../../utils/refactorTimeDate";

function CommentCard({ comment, isMyPost, userAuth }) {
  const [editCommentStatus, setEditCommentStatus] = useState(false);
  const [commentForm, setCommentForm] = useState({
    id: comment?.id,
    content: comment?.content || "",
  });

  console.log("comment", comment);
  console.log("userAuth", userAuth);
  const isMyComment = checkIsMyComment(comment?.user, userAuth);

  const handleDeleteComment = async () => {
    try {
      await deleteComment(comment.id);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(commentForm);

  const handleEditComment = async () => {
    try {
      await editComment(commentForm);
      comment.content = commentForm.content;
      setEditCommentStatus(false);
    } catch (error) {
      console.log(error);
    } finally {
      setEditCommentStatus(false);
    }
  };

  return (
    <div className="flex flex-row gap-5 my-5 justify-between">
      <div className="flex flex-row space-x-5 items-center">
        <Avatar
          className="cursor-pointer hover:border-1 hover:border-hoverLinkBtn"
          radius="full"
          size="lg"
          src={comment?.user?.imageUrl}
        />
        <div className="flex flex-col space-y-2">
          <a
            href={`/profile/${comment?.user?.username}`}
            className="text-small font-semibold leading-none text-mainText"
          >
            {comment?.user?.firstname} {comment?.user?.lastname}
          </a>

          {editCommentStatus ? (
            <>
              <div className="flex flex-col">
                <input
                  placeholder={comment?.content}
                  value={commentForm.content}
                  onChange={(e) =>
                    setCommentForm({ ...commentForm, content: e.target.value })
                  }
                />
                <div className="flex flex-row space-x-3">
                  <button
                    className="hover:bg-red-200 rounded-lg text-red-500 font-semibold text-sm p-1"
                    onClick={() => setEditCommentStatus(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="hover:bg-green-200 rounded-lg text-green-500 font-semibold text-sm p-1"
                    onClick={handleEditComment}
                  >
                    Save
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="text-small text-mainText">{comment?.content}</p>
          )}

          <p className=" text-xs text-secondary-text font-semibold">
            {refactorDate(comment?.date)} - {refactorTime(comment?.time)}
          </p>
        </div>
      </div>
      <div>
        {isMyPost || isMyComment ? (
          <Dropdown placement="bottom-end" showArrow>
            <DropdownTrigger>
              <div className="bg-transparent hover:text-hoverLinkBtn cursor-pointer">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
            </DropdownTrigger>
            <DropdownMenu variant="flat">
              {isMyComment && (
                <DropdownItem
                  key="edit"
                  onClick={() => setEditCommentStatus(true)}
                  startContent={<FontAwesomeIcon icon={faPencil} />}
                >
                  <p>Edit Comment</p>
                </DropdownItem>
              )}
              <DropdownItem
                key="delete"
                color="danger"
                onClick={handleDeleteComment}
                startContent={<FontAwesomeIcon icon={faTrashCan} />}
              >
                <p>Delete Comment</p>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : null}
      </div>
    </div>
  );
}

export default CommentCard;
