import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserCart } from "../slices/cart.slice";
import { fetchUserFavorites } from "../slices/favorites.slice";

export default function SecondNav() {
  const cartCount = useSelector((state) => state.cart.products.length);
  const favCount = useSelector((state) => state.favorites.products.length);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserCart());
    dispatch(fetchUserFavorites());
  });

  return (
    <div className="bg-light flex flex-col gap-4 p-2 justify-center items-center border border-tertiary md:flex-row md:gap-12">
      <Link
        to="/products?category=Flash Sale"
        className="btn-primary btn rounded-lg w-8/12"
      >
        Only a few hours left before flash sale ends!
      </Link>
      <div className="flex gap-6">
        <Link to="/app/cart" className="flex flex-col items-center relative">
          <div className="icon bg-primary text-light">shopping_cart</div>
          <div className="text-xs">My Cart</div>
          <Indicator no={cartCount} />
        </Link>
        <Link
          to="/app/favorites"
          className="flex flex-col items-center relative"
        >
          <div className="icon bg-primary text-light">favorite</div>
          <div className="text-xs">Favorites</div>
          <Indicator no={favCount} />
        </Link>
      </div>
    </div>
  );
}

const Indicator = ({ no }) => (
  <>
    {no > 0 ? (
      <div className="absolute right-0 bg-contrast text-light px-1 text-xs flex justify-center items-center rounded-full">
        <span>{no}</span>
      </div>
    ) : (
      <></>
    )}
  </>
);
