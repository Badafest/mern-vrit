export default function EditDeleteButtons({ handleEdit, handleDelete }) {
  return (
    <>
      <button
        onClick={handleEdit}
        className="icon_text p-1 rounded-full border border-primary text-primary"
      >
        edit
      </button>
      <button
        onClick={handleDelete}
        className="icon_text p-1 rounded-full border border-contrast_dark text-contrast_dark"
      >
        delete
      </button>
    </>
  );
}
