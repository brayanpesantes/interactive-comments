import { useEffect, useState } from "react";
import { CommentCard } from "./components/CommentCard";
import { CommentForm } from "./components/CommentForm";
import data from "./data.json";

export default function App() {
  // TODO: Implement useLocalStorage
  const [comments, setComments] = useState<Comment[]>(() => {
    const savedComments = localStorage.getItem("comments");
    return savedComments
      ? JSON.parse(savedComments)
      : (data.comments as Comment[]);
  });

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);
  const [currentUser] = useState<User>(data.currentUser as User);

  const handleAddComment = (comment: Comment) => {
    setComments([...comments, comment]);
  };

  const handleDeleteComment = (commentId: number | string) => {
    setComments(
      comments
        .map((comment) => {
          if (comment.id === commentId) {
            return null;
          }
          return {
            ...comment,
            replies: comment.replies.filter((reply) => reply.id !== commentId),
          };
        })
        .filter(Boolean) as Comment[]
    );
  };

  const handleEditComment = (
    commentId: number | string | null,
    replyId: number | string | null,
    newContent: string
  ) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          if (replyId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId ? { ...reply, content: newContent } : reply
              ),
            };
          }
          return { ...comment, content: newContent };
        }
        return comment;
      })
    );
  };

  const handleReply = (commentId: number | string, reply: Reply) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, replies: [...comment.replies, reply] };
        }
        return comment;
      })
    );
  };
  const handleVote = (
    commentId: number | string,
    replyId: number | string | null,
    vote: number
  ) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          if (replyId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? { ...reply, score: reply.score + vote }
                  : reply
              ),
            };
          }
          return { ...comment, score: comment.score + vote };
        }
        return comment;
      })
    );
  };

  return (
    <main className="w-full min-h-screen bg-veryLightGray px-4 lg:px-0">
      <div className="max-w-screen-md mx-auto py-4 lg:py-8 space-y-4">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            onDeleteComment={handleDeleteComment}
            onEditComment={(newContent: string) =>
              handleEditComment(comment.id, null, newContent)
            }
            onReply={(reply: Reply) => handleReply(comment.id, reply)}
            isReply={false}
            onVote={(increment: number) =>
              handleVote(comment.id, null, increment)
            }
          >
            <div className="relative">
              <div className="absolute top-0 left-0 md:left-10 w-0.5 h-full bg-lightGray" />
              <div className="space-y-4">
                {comment.replies.map((reply) => (
                  <div className="pl-6 md:pl-20" key={reply.id}>
                    <CommentCard
                      comment={reply}
                      currentUser={currentUser}
                      onDeleteComment={handleDeleteComment}
                      onEditComment={(newContent: string) =>
                        handleEditComment(comment.id, reply.id, newContent)
                      }
                      onReply={(reply: Reply) => handleReply(comment.id, reply)}
                      isReply={true}
                      onVote={(increment: number) =>
                        handleVote(comment.id, reply.id, increment)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </CommentCard>
        ))}
        <CommentForm
          currentUser={currentUser}
          onAddComment={handleAddComment}
        />
      </div>
      <div className="attribution pb-2">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="https://github.com/brayanpesantes" target="_blank">
          Alexis Nuñez
        </a>
        .
      </div>
    </main>
  );
}
