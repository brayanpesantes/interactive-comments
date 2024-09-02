import { FC } from "react";

interface ConfirmDeleteProps {
  onCancel: () => void;
  onDelete: () => void;
}

export const ConfirmDelete: FC<ConfirmDeleteProps> = ({
  onCancel,
  onDelete,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-darkBlue/70">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-darkBlue">Confirm Delete</h2>
        <p className="mb-6 text-grayishBlue">
          Are you sure you want to delete this item?
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="bg-darkBlue text-white px-4 py-2 rounded-lg hover:bg-grayishBlue uppercase"
            onClick={onCancel}
          >
            No, Cancel
          </button>
          <button
            className="text-white bg-softRed hover:bg-paleRed font-medium px-4 py-2 rounded-lg uppercase hover:bg-red-700"
            onClick={onDelete}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};
