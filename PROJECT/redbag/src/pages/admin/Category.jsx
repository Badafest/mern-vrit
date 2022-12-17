import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryController from "../../controllers/CategoryController";
import { fetchAll } from "../../slices/category.slice";
import Toast from "../../components/Toast";
import EditDeleteButtons from "../../components/EditDeleteButtons";

export default function Category() {
  const categories = useSelector((state) => state.category.value);
  const dispatch = useDispatch();

  const addCategoryRef = useRef();

  const [toast, setToast] = useState({ message: "", type: "" });

  const [selected, setSelected] = useState("");

  useEffect(() => {
    dispatch(fetchAll());
  }, [toast.message]);

  const handleAddCategory = async () => {
    const name = addCategoryRef.current.value;
    try {
      const data = await CategoryController.add(selected, name);
      setToast({ message: data.message, type: "success" });
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    }
  };

  const handleEditCategory = async () => {
    const name = addCategoryRef.current.value;
    try {
      const data = await CategoryController.edit(selected, name);
      setToast({ message: data.message, type: "success" });
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const data = await CategoryController.delete(selected);
      setToast({ message: data.message, type: "success" });
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    }
  };

  const handleSelectCategory = (category) => {
    setSelected((prev) => (prev === category ? "" : category));
  };

  const handleToastClose = () => setToast({ message: "", type: "" });

  return (
    <>
      <div className="px-4">
        {toast.message.length ? (
          <Toast {...toast} onClose={handleToastClose} />
        ) : (
          <></>
        )}
      </div>

      <div className="m-1 p-2 rounded-md border border-secondary h-5/6 overflow-auto">
        {categories && (
          <CategoryList
            categories={categories}
            selected={selected}
            handleDeleteCategory={handleDeleteCategory}
            handleEditCategory={handleEditCategory}
            handleSelectCategory={handleSelectCategory}
          />
        )}
      </div>
      <div className="flex justify-end p-4 gap-2 bg-white">
        <input
          type="text"
          placeholder="Name of category..."
          ref={addCategoryRef}
          className="w-80"
        />
        <button onClick={handleAddCategory} className="btn btn-primary icon">
          add
        </button>
      </div>
    </>
  );
}

const CategoryHead = ({
  item,
  selected,
  handleEditCategory,
  handleSelectCategory,
  handleDeleteCategory,
}) => (
  <div className="flex justify-between">
    <span>{item}</span>
    <div className="flex gap-2 items-center">
      {item === selected ? (
        <EditDeleteButtons
          handleEdit={handleEditCategory}
          handleDelete={handleDeleteCategory}
        />
      ) : (
        <></>
      )}
      <button
        onClick={() => {
          handleSelectCategory(item);
        }}
        className={`cursor-pointer icon_text  p-1 rounded-full border border-secondary ${
          item === selected ? "bg-primary text-light" : "bg-light text-primary"
        }`}
      >
        check
      </button>
    </div>
  </div>
);

const CategoryList = ({ categories, ...rest }) => (
  <>
    {categories.length === 0 ? (
      <></>
    ) : (
      Object.keys(categories).map((item, index) => (
        <div
          key={index}
          className={`py-1 px-3  border ${
            item === rest.selected ? "border-primary" : "border-light"
          } ${index % 2 === 1 ? "bg-light " : "bg-white"} `}
        >
          <CategoryHead item={item} {...rest} />
          <CategoryList categories={categories[item]} {...rest} />
        </div>
      ))
    )}
  </>
);
