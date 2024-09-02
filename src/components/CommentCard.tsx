import { useState } from "react";
import { useVoting } from "../hooks/useVoting";
import { ActionButtons } from "./ActionButtons";
import Avatar from "./Avatar";
import { ReplayForm } from "./ReplayForm";
import { VoteButtons } from "./VoteButtons";

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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { userVote, score, handleVote } = useVoting(comment.score, onVote);

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
      <div className="bg-white rounded-lg p-6 flex  flex-row  gap-6 items-start">
        <div className="md:block hidden">
          <VoteButtons userVote={userVote} score={score} onVote={handleVote} />
        </div>
        <div className="w-full">
          <div className="flex gap-4 items-center justify-between">
            <div className="inline-flex gap-4 items-center">
              <Avatar
                image={comment.user.image.png}
                username={comment.user.username}
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
            <div className="hidden md:block">
              <ActionButtons
                isCurrentUser={comment.user.username === currentUser.username}
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                onDelete={() => onDeleteComment(comment.id)}
                onEdit={() => setIsEditing(true)}
                onReply={() => setIsReplying(true)}
              />
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
          <div className="inline-flex gap-4 items-center justify-between w-full md:hidden mt-4 ">
            <div className="text-moderateBlue font-bold">
              <VoteButtons
                userVote={userVote}
                score={score}
                onVote={handleVote}
              />
            </div>
            <div className="text-grayishBlue">
              <ActionButtons
                isCurrentUser={comment.user.username === currentUser.username}
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                onDelete={() => onDeleteComment(comment.id)}
                onEdit={() => setIsEditing(true)}
                onReply={() => setIsReplying(true)}
              />
            </div>
          </div>
        </div>
      </div>
      {isReplying ? <ReplayForm onSubmit={handleReply} /> : null}
      {children}
    </div>
  );
}
