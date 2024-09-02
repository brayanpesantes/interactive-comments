import { FaMinus, FaPlus } from "react-icons/fa";

export const VoteButtons: React.FC<{
  userVote: number | null;
  score: number;
  onVote: (increment: number) => void;
}> = ({ userVote, score, onVote }) => (
  <div className="flex gap-4 flex-row lg:flex-col bg-veryLightGray p-4 rounded-lg ">
    <button
      className={userVote === 1 ? "cursor-not-allowed" : "cursor-pointer"}
      onClick={() => onVote(1)}
      disabled={userVote === 1}
      aria-label="Vote up"
    >
      <FaPlus className="text-lightGrayishBlue group-hover:text-moderateBlue" />
    </button>
    <p className="text-moderateBlue font-bold">{score}</p>
    <button
      className={userVote === null ? "cursor-not-allowed" : "cursor-pointer"}
      onClick={() => onVote(-1)}
      disabled={userVote === null}
      aria-label="Vote down"
    >
      <FaMinus className="text-lightGrayishBlue group-hover:text-moderateBlue" />
    </button>
  </div>
);
