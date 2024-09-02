import { useState } from "react";
import Avatar from "./Avatar";

interface CommentFormProps {
  readonly currentUser: User;
  readonly onAddComment: (comment: Comment) => void;
}

export function CommentForm({ currentUser, onAddComment }: CommentFormProps) {
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddComment({
      id: Date.now().toString(),
      content: comment,
      createdAt: "Just now",
      score: 0,
      user: currentUser,
      replies: [] as Reply[],
    } as Comment);
    setComment("");
  };

  return (
    <form
      className="bg-white rounded-lg p-6 flex flex-col md:flex-row gap-4 items-start"
      onSubmit={handleSubmit}
    >
      <textarea
        className="md:hidden w-full block  p-3 border border-lightGray rounded-lg resize-none min-h-[96px]"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <div className="flex justify-between  w-full gap-4 items-start">
        <Avatar image={currentUser.image.png} username={currentUser.username} />
        <textarea
          className="hidden w-full md:flex  p-3 border border-lightGray rounded-lg resize-none min-h-[96px]"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-moderateBlue flex-none  text-white font-medium py-3 px-6 rounded-lg uppercase hover:bg-lightGrayishBlue"
        >
          Send
        </button>
      </div>
    </form>
  );
}
