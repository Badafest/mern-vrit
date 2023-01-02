import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

export default function ProductContainer() {
  const products = useSelector((state) => state.product.value);
  return (
    <div className="flex gap-x-4 gap-y-6 flex-wrap items-center py-4 justify-center">
      {products.length ? (
        <>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </>
      ) : (
        <div className="bg-white flex flex-col h-60 w-full p-8 items-center justify-center shadow-md rounded-md text-gray-500">
          <p>Nothing was found to show here</p>
        </div>
      )}
    </div>
  );
}
