import axios from "../config/axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ClippedImg from "../components/Image/ClippedImage";
import {
  addToCart,
  removeFromCart,
  changeQuantity,
  fetchUserCart,
} from "../slices/cart.slice";
import { fetchById } from "../slices/product.slice";
import Toast from "../components/Toast";
import {
  addToFavorites,
  fetchUserFavorites,
  removeFromFavorites,
} from "../slices/favorites.slice";

export default function Product() {
  const { id } = useParams();

  const product = useSelector((state) => state.product.value[0]);

  const cart = useSelector((state) => state.cart.products);

  const favorites = useSelector((state) => state.favorites.products);

  const dispatch = useDispatch();

  const [toast, setToast] = useState({ message: "", type: "" });

  useEffect(() => {
    dispatch(fetchById(id));
    dispatch(fetchUserCart());
    dispatch(fetchUserFavorites());
  }, [id]);

  useEffect(() => {
    axios.post("/user/cart", { cart });
  }, [cart]);

  useEffect(() => {
    axios.post("/user/favorites", { favorites });
  }, [favorites]);

  const getQuantity = () => {
    const productInCart = cart.filter(
      (cartItem) => cartItem.item._id === product._id
    )[0];
    return productInCart ? productInCart.quantity : 0;
  };

  const isInFavorites = () =>
    favorites.filter((favItem) => favItem._id === product._id).length === 1;

  const handleAddToCart = async () => {
    const quantity = getQuantity();
    if (quantity > 0) {
      dispatch(removeFromCart(product._id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleChangeBtn = async (change) => {
    const quantity = getQuantity();
    if (quantity === 1 && change === -1) {
      dispatch(removeFromCart(product._id));
    }
    dispatch(changeQuantity({ _id: product._id, change }));
  };

  const handleAddFavorite = () => {
    if (isInFavorites()) {
      dispatch(removeFromFavorites(product._id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  return (
    <div className="w-full">
      {product && (
        <div className="md:w-8/12 mx-auto bg-white shadow-lg rounded-md flex flex-col gap-2 justify-center">
          <ProductHead
            {...{ product, handleAddFavorite, isInFavorites: isInFavorites() }}
          />

          <div className="mx-auto mb-4">
            <ClippedImg
              src={product.avatar || "/assets/logo.svg"}
              width="20rem"
            />
          </div>
          {toast.message.length ? (
            <div className="flex justify-center">
              <Toast
                {...toast}
                onClose={() => setToast({ message: "", type: "" })}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="bg-light p-2 flex flex-col justify-between items-center gap-1 md:flex-row">
            <ProductDetails {...{ product }} />

            <ProductButtons
              {...{ getQuantity, handleAddToCart, handleChangeBtn }}
            />
          </div>
          <ProductFooter {...{ product }} />
        </div>
      )}
    </div>
  );
}

const ProductHead = ({ product, handleAddFavorite, isInFavorites }) => (
  <>
    <div className="bg-primary rounded-t-md text-light p-4 text-center flex items-center justify-between">
      <div className="font-bold "> {product.name}</div>
      <button
        onClick={handleAddFavorite}
        className={`icon_text text-2xl p-1 rounded-full ${
          isInFavorites
            ? "bg-contrast_dark text-light"
            : "bg-light text-contrast"
        }`}
      >
        favorite
      </button>
    </div>
    <div className="flex justify-center text-sm flex-wrap">
      {product.categories.map((category, index) => (
        <div key={index} className="px-1 text-contrast_dark">
          {category}
        </div>
      ))}
    </div>
  </>
);

const ProductDetails = ({ product }) => (
  <>
    <span className="text-contrast flex items-center">
      <RatingStars reviews={product.reviews || []} />
    </span>
    <span className=" bg-primary text-light p-2 rounded-lg flex items-center w-full justify-center md:w-auto">
      <span className="icon_text">sell</span>
      <span className="text-sm px-1">{product.price}</span>
      <span className="text-sm px-1"> + DELIVERY</span>
    </span>
  </>
);

const ProductButtons = ({ getQuantity, handleChangeBtn, handleAddToCart }) => (
  <div className="flex items-center gap-2 flex-grow mt-2 md:flex-grow-0">
    <button
      className="icon btn btn-primary md:w-auto"
      disabled={getQuantity() === 0}
      onClick={() => handleChangeBtn(-1)}
    >
      remove
    </button>
    <button className="btn btn-primary md:w-auto" onClick={handleAddToCart}>
      {(() => {
        const quantity = getQuantity();
        return quantity > 0
          ? `Remove ${quantity} item${quantity === 1 ? "" : "s"}`
          : "Add to Cart";
      })()}
    </button>
    <button
      className="icon btn btn-primary md:w-auto"
      disabled={getQuantity() === 0}
      onClick={() => handleChangeBtn(1)}
    >
      add
    </button>
  </div>
);

const ProductFooter = ({ product }) => (
  <footer className="text-primary text-sm  mx-auto px-3">
    <ul className="font-bold">
      <li>Vendor: {product.vendor}</li>
      <li>Sold: {product.sold}</li>
      <li>In Stock: {product.stock}</li>
    </ul>
    <div className="my-2">
      <pre>{product.description}</pre>
    </div>
  </footer>
);

const getRating = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return 5;
  }
  const ratings = reviews.map((review) => review.rating);
  const rating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  return rating;
};

const RatingStars = ({ reviews }) => {
  const no = getRating(reviews);
  const Complete = () =>
    Array(parseInt(no))
      .fill(1)
      .map((_, index) => (
        <span key={index} className="icon_text">
          star
        </span>
      ));
  const Half = () =>
    no - parseInt(no) >= 0.5 ? (
      <span className="icon_text">star_half</span>
    ) : (
      <></>
    );
  return (
    <>
      <Complete />
      <Half />
      <span className="text-sm p-1">{`${no} [${reviews.length}]`}</span>
    </>
  );
};
