import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function ProductBanner({ products, viewAllLink, title }) {
  return (
    <div className="w-full ">
      <div className="flex justify-between items-center p-2 ">
        <div className="text-lg font-bold ">{title || "Products"}</div>
        <Link
          to={viewAllLink}
          className="btn btn-primary flex items-center gap-2"
        >
          <span className="text-sm">View All</span>
          <span className="icon_text text-2xl p-1">read_more</span>
        </Link>
      </div>
      <div className="flex gap-2 overflow-x-scroll items-center py-4">
        {products.length ? (
          <>
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </>
        ) : (
          <div className="bg-white shadow-md rounded-md flex justify-center items-center w-full h-60">
            <p className="text-gray-500">Nothing was found to show here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
