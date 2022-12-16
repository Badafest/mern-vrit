export default function EditDeleteButtons({
  handleEditCategory,
  handleDeleteCategory,
}) {
  return (
    <>
      <button
        onClick={handleEditCategory}
        className="icon_text p-1 rounded-full border border-primary text-primary"
      >
        edit
      </button>
      <button
        onClick={handleDeleteCategory}
        className="icon_text p-1 rounded-full border border-contrast_dark text-contrast_dark"
      >
        delete
      </button>
    </>
  );
}
