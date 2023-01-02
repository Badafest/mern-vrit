import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../../components/Product/ProductCard";
import { fetchUserFavorites } from "../../slices/favorites.slice";

export default function Favorites() {
  const { products } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserFavorites());
  }, []);

  return (
    <div className="flex gap-x-4 gap-y-6 flex-wrap items-center py-4 justify-center">
      {products && products.length ? (
        <>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </>
      ) : (
        <div className="flex flex-col h-4/6 items-center justify-center text-gray-500">
          <p>You have no favorites.</p>
          <p className="text-sm"> Add products to see them here.</p>
        </div>
      )}
      <Link
        to="/products"
        className="btn btn-primary flex justify-center items-center md:w-1/2 mx-auto"
      >
        <span className="icon_text text-2xl pr-2">add</span>
        <span>Add Products</span>
      </Link>
    </div>
  );
}
