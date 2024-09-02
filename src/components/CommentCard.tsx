import { useState } from "react";
import { createPortal } from "react-dom";
import { FaEdit, FaMinus, FaPlus, FaReply, FaTrash } from "react-icons/fa";
import { ConfirmDelete } from "./ConfirmDelete";
import { ReplayForm } from "./ReplayForm";

interface CommentCardProps {
  readonly comment: Comment | Reply;
  readonly children?: React.ReactNode;
  readonly currentUser: User;
  readonly onDeleteComment: (id: number | string) => void;
  readonly onEditComment: (newContent: string) => void;
  readonly onReply: (reply: Reply) => void;
  readonly isReply: boolean;
  readonly onVote: (increment: number) => void;
}

export function CommentCard({
  comment,
  children,
  currentUser,
  onDeleteComment,
  onEditComment,
  onReply,
  onVote,
  isReply,
}: CommentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isReplying, setIsReplying] = useState(false);
  const [userVote, setUserVote] = useState<number | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleVote = (increment: number) => {
    if (userVote === null) {
      onVote(increment);
      setUserVote(increment);
    } else {
      setUserVote(null);
      onVote(increment);
    }
  };

  const handleEditComment = () => {
    onEditComment(editedContent);
    setIsEditing(false);
  };

  const handleReply = (content: string) => {
    onReply({
      id: Date.now().toString(),
      content: content,
      createdAt: "Just now",
      score: 0,
      user: currentUser,
      replyingTo: comment.user.username,
    });
    setIsReplying(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg p-6 flex flex-col-reverse lg:flex-row  gap-6 items-start">
        <div className="flex gap-4 flex-row lg:flex-col  bg-veryLightGray p-4 rounded-lg">
          <button
            className={userVote === 1 ? "cursor-not-allowed" : "cursor-pointer"}
            onClick={() => handleVote(1)}
            disabled={userVote === 1}
          >
            <FaPlus className="text-lightGrayishBlue group-hover:text-moderateBlue" />
          </button>
          <span className="text-moderateBlue font-bold">{comment.score}</span>
          <button
            className={
              userVote === null ? "cursor-not-allowed" : "cursor-pointer"
            }
            onClick={() => handleVote(-1)}
            disabled={userVote === null}
          >
            <FaMinus className="text-lightGrayishBlue group-hover:text-moderateBlue" />
          </button>
        </div>
        <div className="w-full">
          <div className="flex gap-4 items-center justify-between">
            <div className="inline-flex gap-4 items-center">
              <img
                src={comment.user.image.png}
                alt={comment.user.username}
                className="size-11"
              />

              <span className="text-darkBlue font-bold">
                {comment.user.username}
              </span>
              {comment.user.username === currentUser.username && (
                <span className="text-white bg-moderateBlue px-2 py-1 rounded-sm text-sm font-medium">
                  you
                </span>
              )}
              <time className="text-grayishBlue" dateTime={comment.createdAt}>
                {comment.createdAt}
              </time>
            </div>
            <div>
              {comment.user.username === currentUser.username && (
                <button
                  className="hidden text-softRed font-bold md:inline-flex items-center gap-2 hover:text-paleRed mr-4"
                  onClick={() => {
                    setIsOpenModal(true);
                  }}
                >
                  <FaTrash />
                  Delete
                </button>
              )}
              {isOpenModal &&
                createPortal(
                  <ConfirmDelete
                    onCancel={() => setIsOpenModal(false)}
                    onDelete={() => onDeleteComment(comment.id)}
                  />,
                  document.body
                )}
              {comment.user.username !== currentUser.username ? (
                <button
                  className="hidden  text-moderateBlue font-bold md:inline-flex items-center gap-2 hover:text-lightGrayishBlue"
                  onClick={() => setIsReplying(true)}
                >
                  <FaReply />
                  Reply
                </button>
              ) : (
                <button
                  className="hidden text-moderateBlue font-bold md:inline-flex items-center gap-2 hover:text-lightGrayishBlue"
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit />
                  Edit
                </button>
              )}
            </div>
          </div>
          {isEditing ? (
            <form onSubmit={handleEditComment}>
              <textarea
                className="flex-grow  w-full p-3 border border-lightGray rounded-lg resize-none min-h-[96px]"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleEditComment();
                  }
                }}
              />
            </form>
          ) : (
            <p className="text-grayishBlue mt-3">
              {isReply && (
                <span className="text-moderateBlue">
                  @{(comment as Reply).replyingTo}
                </span>
              )}{" "}
              {comment.content}
            </p>
          )}
        </div>
      </div>
      {isReplying ? <ReplayForm onSubmit={handleReply} /> : null}
      {children}
    </div>
  );
}
