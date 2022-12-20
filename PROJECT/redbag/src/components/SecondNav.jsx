import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SecondNav() {
  const { products } = useSelector((state) => state.cart);

  return (
    <div className="bg-light flex flex-col gap-4 p-2 justify-center items-center border border-tertiary md:flex-row md:gap-12">
      <Link
        to="/products?category=Flash Sale"
        className="btn-primary btn rounded-lg w-8/12"
      >
        Only a few hours left before flash sale ends!
      </Link>
      <div className="flex gap-6">
        <Link to="/app" className="flex flex-col items-center relative">
          {products.length > 0 ? (
            <div className="absolute right-0 bg-contrast text-light px-1 text-xs flex justify-center items-center rounded-full">
              <span>{products.length}</span>
            </div>
          ) : (
            <></>
          )}
          <div className="icon bg-primary text-light">shopping_cart</div>
          <div className="text-xs">My Cart</div>
        </Link>
        <div className="flex flex-col items-center">
          <div className="icon bg-primary text-light">favorite</div>
          <div className="text-xs">Favorites</div>
        </div>
      </div>
    </div>
  );
}
