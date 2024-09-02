import { FC, FormEvent } from "react";

interface ReplayFormProps {
  onSubmit: (content: string) => void;
}

export const ReplayForm: FC<ReplayFormProps> = ({ onSubmit }) => {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const content = formData.get("content") as string;
    onSubmit(content);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex  gap-4 items-start bg-white p-6 rounded-lg"
    >
      <textarea
        name="content"
        className="w-full p-4 rounded-lg border border-lightGrayishBlue"
        placeholder="Add a comment..."
        rows={3}
        required
      />
      <button
        type="submit"
        className="bg-moderateBlue text-white px-4 py-2 rounded-lg uppercase hover:bg-lightGrayishBlue"
        aria-label="Submit"
      >
        Reply
      </button>
    </form>
  );
};
