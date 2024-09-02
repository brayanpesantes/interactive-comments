import { useState } from "react";

export const useVoting = (
  initialScore: number,
  onVote: (increment: number) => void
) => {
  const [userVote, setUserVote] = useState<number | null>(null);
  const [score, setScore] = useState(initialScore);

  const handleVote = (increment: number) => {
    if (userVote === null) {
      onVote(increment);
      setUserVote(increment);
      setScore(score + increment);
    } else {
      setUserVote(null);
      onVote(-userVote);
      setScore(score - userVote);
    }
  };

  return { userVote, score, handleVote };
};
