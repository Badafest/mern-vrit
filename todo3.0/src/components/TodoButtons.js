import { IconButton } from "./Elements";

import EditIcon from "../icons/edit.svg";
import TrashIcon from "../icons/trash.svg";

const TodoButons = ({ handleDelete, handleEdit }) => {
  return (
    <div className="btn-container">
      <IconButton text={"Edit"} icon={EditIcon} onClick={handleEdit} />
      <IconButton text={"Delete"} icon={TrashIcon} onClick={handleDelete} />
    </div>
  );
};

export default TodoButons;
