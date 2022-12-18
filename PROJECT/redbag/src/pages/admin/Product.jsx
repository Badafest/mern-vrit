import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductController from "../../controllers/ProductController";
import Toast from "../../components/Toast";
import EditDeleteButtons from "../../components/EditDeleteButtons";
import UserAvatar from "../../components/Image/UserAvatar";

import { fetchAll as fetchAllProducts } from "../../slices/product.slice";
import { fetchAll as fetchAllCategories } from "../../slices/category.slice";
import { fetchAll as fetchAllVendors } from "../../slices/vendor.slice";

export default function Product() {
  const products = useSelector((state) => state.product.value);
  const vendors = useSelector((state) => state.vendor.value);
  const categories = useSelector((state) => state.category.value);

  const dispatch = useDispatch();

  const addProductAvatarRef = useRef();
  const addProductNameRef = useRef();
  const addProductDescriptionRef = useRef();
  const addProductPriceRef = useRef();
  const addProductStockRef = useRef();
  const addProductVendorRef = useRef();
  const addProductCategoryRef = useRef();

  const [toast, setToast] = useState({ message: "", type: "" });

  const [selected, setSelected] = useState("");

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllVendors());
    dispatch(fetchAllProducts());
  }, [toast.message]);

  const handleAddProduct = async () => {
    const name = addProductNameRef.current.value;
    const description = addProductDescriptionRef.current.value;
    const price = addProductPriceRef.current.value;
    const stock = addProductStockRef.current.value;
    const avatar = addProductAvatarRef.current.files[0];
    const vendor = addProductVendorRef.current.value;
    const category = new FormData(addProductCategoryRef.current).keys();

    try {
      addProductAvatarRef.current.value = "";
      if (avatar) {
        if (
          ["image/jpeg", "image/jpg", "image/png"].includes(avatar.type) ===
            -1 ||
          avatar.size >= 500000
        ) {
          throw new Error(
            "Image should be jpg or png and less than 500kb in size"
          );
        }
      }
      // console.log(Array.from(category));
      const data = await ProductController.add(
        name,
        vendor,
        price,
        stock,
        Array.from(category),
        avatar,
        description
      );
      setToast({ message: data.message, type: "success" });
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    }
  };

  const handleEditProduct = async () => {
    const name = addProductNameRef.current.value;
    const description = addProductDescriptionRef.current.value;
    const price = addProductPriceRef.current.value;
    const stock = addProductStockRef.current.value;
    const avatar = addProductAvatarRef.current.files[0];
    const vendor = addProductVendorRef.current.value;
    const category = new FormData(addProductCategoryRef.current).keys();

    try {
      addProductAvatarRef.current.value = "";
      const data = await ProductController.edit(
        selected,
        name,
        vendor,
        price,
        stock,
        Array.from(category),
        avatar,
        description
      );
      setToast({ message: data.message, type: "success" });
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const data = await ProductController.delete(selected);
      setToast({ message: data.message, type: "success" });
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    }
  };

  const handleSelectProduct = (product) => {
    setSelected((prev) => (prev === product ? "" : product));
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
      <div className="flex justify-around bg-white border border-primary mx-2 my-1 rounded-md p-2 text-center">
        <span className="3/12">Name</span>
        <span className="2/12">Vendor</span>
        <span className="3/12">Categories</span>
        <span className="1/12">Price | Stock</span>
        <span className="3/12">Description</span>
      </div>
      <div className="m-1 p-2 rounded-md overflow-auto border border-secondary h-3/6">
        {products && (
          <ProductList
            products={products}
            selected={selected}
            handleDeleteProduct={handleDeleteProduct}
            handleEditProduct={handleEditProduct}
            handleSelectProduct={handleSelectProduct}
          />
        )}
      </div>

      <div className="flex justify-end p-4 gap-x-2 gap-y-4 flex-wrap h-2/6 overflow-auto mt-8">
        <div className="flex flex-col flex-grow w-60">
          <label htmlFor="avatar" className="text-tertiary_dark pl-2">
            Avatar
          </label>
          <input
            type="file"
            ref={addProductAvatarRef}
            id="avatar"
            name="avatar"
          />
        </div>

        <div className="flex flex-col flex-grow w-80">
          <label htmlFor="name" className="text-tertiary_dark pl-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Name of product..."
            ref={addProductNameRef}
            id="name"
            name="name"
          />
        </div>

        <div className="flex flex-col flex-grow w-40">
          <label htmlFor="price" className="text-tertiary_dark pl-2">
            Price
          </label>
          <input
            type="number"
            placeholder="Price in NPR"
            ref={addProductPriceRef}
            id="price"
            name="price"
          />
        </div>

        <div className="flex flex-col flex-grow w-40">
          <label htmlFor="stock" className="text-tertiary_dark pl-2">
            Stock
          </label>
          <input
            type="number"
            placeholder="Number in Stock"
            ref={addProductStockRef}
            id="stock"
            name="stock"
          />
        </div>

        <div className="flex flex-col flex-grow w-80">
          <label htmlFor="description" className="text-tertiary_dark pl-2">
            Description
          </label>
          <textarea
            placeholder="Description of product..."
            ref={addProductDescriptionRef}
            className="p-2 h-48 flex-grow resize-none outline-none bg-light rounded-md border-b-contrast border-b-2"
          />
        </div>

        <div className="flex flex-col flex-grow w-60">
          <label htmlFor="vendor" className="text-tertiary_dark pl-2">
            Vendor
          </label>
          <select
            ref={addProductVendorRef}
            className="p-2 cursor-pointer resize-none outline-none bg-light rounded-md border-b-contrast border-b-2"
          >
            {vendors &&
              vendors.map((vendor, index) => (
                <option key={index} value={vendor._id}>
                  {vendor.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col flex-grow w-60">
          <label className="text-tertiary_dark pl-2">Categories</label>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
            }}
            ref={addProductCategoryRef}
            className="h-48 overflow-auto bg-light rounded-md border-b-contrast border-b-2"
          >
            <CategoryOptions categories={categories} />
          </form>
        </div>
        <div className="w-full text-right">
          <button onClick={handleAddProduct} className="btn btn-primary icon">
            add
          </button>
        </div>
      </div>
    </>
  );
}

const ProductHead = ({
  item,
  selected,
  handleEditProduct,
  handleSelectProduct,
  handleDeleteProduct,
}) => (
  <div className="flex justify-between">
    <div className="flex flex-wrap w-full max-h-24">
      <div className="min-w-sm flex gap-2 border-x p-2 justify-center items-center h-max w-3/12">
        <UserAvatar
          user={{ username: item.name, avatar: item.avatar }}
          size={36}
        />
        <div>{item.name}</div>
      </div>
      <div className="min-w-sm border-x p-2 flex items-center justify-center h-max w-2/12">
        {item.vendor}
      </div>
      <div className="min-w-sm border-x p-2 flex flex-col h-24 overflow-auto w-3/12">
        {item.categories.map((category, index) => (
          <div key={index} className="w-full border-y">
            {category}
          </div>
        ))}
      </div>
      <div className="min-w-sm border-x p-2 flex items-center justify-center h-max w-1/12">
        {item.price} | {item.stock}
      </div>
      <div className="min-w-sm border p-2  flex items-center justify-center h-24 overflow-auto w-3/12">
        <pre>{item.description}</pre>
      </div>
    </div>
    <div className="m-2 flex gap-2 items-center">
      {item.name === selected ? (
        <EditDeleteButtons
          handleEdit={handleEditProduct}
          handleDelete={handleDeleteProduct}
        />
      ) : (
        <></>
      )}
      <button
        onClick={() => {
          handleSelectProduct(item.name);
        }}
        className={`cursor-pointer icon_text  p-1 rounded-full border border-secondary ${
          item.name === selected
            ? "bg-primary text-light"
            : "bg-light text-primary"
        }`}
      >
        check
      </button>
    </div>
  </div>
);

const ProductList = ({ products, ...rest }) => (
  <>
    {products.length === 0 ? (
      <></>
    ) : (
      products.map((item, index) => (
        <div
          key={index}
          className={`py-1 px-3  border ${
            item === rest.selected ? "border-primary" : "border-light"
          } ${index % 2 === 1 ? "bg-light " : "bg-white"} `}
        >
          <ProductHead item={item} {...rest} />
        </div>
      ))
    )}
  </>
);

const CategoryOptions = ({ categories }) => (
  <>
    {Object.keys(categories).map((item, index) => (
      <div key={index} className="pl-4 py-1">
        <div className="flex items-center gap-1 border border-primary px-2 py-1 rounded-md bg-white">
          <input
            type="checkbox"
            name={item}
            id={item}
            className="w-4 h-4 cursor-pointer"
          />
          <label className="flex-grow cursor-pointer" htmlFor={item}>
            {item}
          </label>
        </div>
        <CategoryOptions categories={categories[item]} />
      </div>
    ))}
  </>
);
