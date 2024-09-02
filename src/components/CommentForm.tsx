import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";

dayjs.extend(relativeTime);
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
      createdAt: dayjs().fromNow(),
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
      <img
        src={currentUser.image.png}
        alt={currentUser.username}
        className="size-10 rounded-full order-2
        "
      />
      <textarea
        className="w-full block  p-3 border border-lightGray rounded-lg resize-none min-h-[96px]"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="bg-moderateBlue flex-none order-3 text-white font-medium py-3 px-6 rounded-lg uppercase hover:bg-lightGrayishBlue"
      >
        Send
      </button>
    </form>
  );
}
