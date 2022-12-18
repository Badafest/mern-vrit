import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ClippedImg from "../components/Image/ClippedImage";
import { PRODUCTS } from "../config/PRODUCTS";
import {
  addToCart,
  removeFromCart,
  changeQuantity,
} from "../slices/cart.slice";

export default function Product() {
  const { id } = useParams();
  const product = PRODUCTS.filter((item) => item._id === id)[0];
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.products);

  const getQuantity = () => {
    const productInCart = cart.filter(
      (cartItem) => cartItem.item._id === product._id
    )[0];
    return productInCart ? productInCart.quantity : 0;
  };

  const handleAddToCart = () => {
    const quantity = getQuantity();
    if (quantity > 0) {
      dispatch(removeFromCart(product._id));
    } else {
      console.log(quantity);
      dispatch(addToCart(product));
    }
  };

  const handleChangeBtn = (change) => {
    const quantity = getQuantity();
    if (quantity === 1 && change === -1) {
      dispatch(removeFromCart(product._id));
    }
    dispatch(changeQuantity({ _id: product._id, change }));
  };

  const handleAddFavorite = () => {
    console.log("Favorites...");
  };

  return (
    <div className="w-full">
      <div className="md:w-8/12 mx-auto bg-white shadow-lg rounded-md flex flex-col gap-2 justify-center">
        <div className="bg-primary rounded-t-md text-light p-4 text-center flex items-center justify-between">
          <div className="font-bold "> {product.name}</div>
          <button
            onClick={handleAddFavorite}
            className="icon_text text-2xl p-1 rounded-full bg-light text-contrast hover:text-light hover:bg-contrast_dark active:bg-contrast_light"
          >
            favorite
          </button>
        </div>
        <div className="flex justify-center text-sm">
          {product.category.map((category, index) => (
            <div key={index} className="px-1 text-contrast_dark">
              {category}
            </div>
          ))}
        </div>
        <div className="mx-auto mb-4">
          <ClippedImg src={product.image || "/assets/logo.svg"} width="20rem" />
        </div>
        <div className="bg-light p-2 flex flex-col justify-between items-center gap-1 md:flex-row">
          <span className="text-contrast flex items-center">
            <RatingStars no={product.rating} />
            <span className="text-sm p-1">{`${product.rating} [${product.reviews}]`}</span>
          </span>
          <span className=" bg-primary text-light p-2 rounded-lg flex items-center w-full justify-center md:w-auto">
            <span className="icon_text">sell</span>
            <span className="text-sm px-1">{product.price}</span>
            <span className="text-sm px-1"> + {product.delivery}</span>
          </span>
          <div className="flex items-center gap-2 flex-grow mt-2 md:flex-grow-0">
            <button
              className="icon btn btn-primary md:w-auto"
              disabled={getQuantity() === 0}
              onClick={() => handleChangeBtn(-1)}
            >
              remove
            </button>
            <button
              className="btn btn-primary md:w-auto"
              onClick={handleAddToCart}
            >
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
        </div>

        <div className="text-primary text-sm  mx-auto px-3">
          <ul className="font-bold">
            <li>Vendor: {product.vendor}</li>
            <li>Sold: {product.sold}</li>
            <li>In Stock: {product.stock}</li>
          </ul>
          <div className="my-2">{product.description}</div>
        </div>
      </div>
    </div>
  );
}

const RatingStars = ({ no }) => {
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
    </>
  );
};
