import { createPortal } from "react-dom";
import { FaEdit, FaReply, FaTrash } from "react-icons/fa";
import { ConfirmDelete } from "./ConfirmDelete";

export const ActionButtons: React.FC<{
  isCurrentUser: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onReply: () => void;
  isOpenModal: boolean;
  setIsOpenModal: (isOpenModal: boolean) => void;
}> = ({
  isCurrentUser,
  onDelete,
  onEdit,
  onReply,
  isOpenModal,
  setIsOpenModal,
}) => (
  <div>
    {isOpenModal &&
      createPortal(
        <ConfirmDelete
          onCancel={() => setIsOpenModal(false)}
          onDelete={onDelete}
        />,
        document.body
      )}
    {isCurrentUser ? (
      <>
        <button
          className=" text-softRed font-bold inline-flex items-center gap-2 hover:text-paleRed mr-4"
          onClick={() => setIsOpenModal(true)}
        >
          <FaTrash />
          Delete
        </button>
        <button
          className="text-moderateBlue font-bold inline-flex items-center gap-2 hover:text-lightGrayishBlue"
          onClick={onEdit}
        >
          <FaEdit />
          Edit
        </button>
      </>
    ) : (
      <button
        className=" text-moderateBlue font-bold inline-flex items-center gap-2 hover:text-lightGrayishBlue"
        onClick={onReply}
      >
        <FaReply />
        Reply
      </button>
    )}
  </div>
);
