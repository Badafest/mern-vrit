import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

export default function ProductContainer() {
  const products = useSelector((state) => state.product.value);
  return (
    <div className="flex gap-x-4 gap-y-6 flex-wrap items-center py-4 justify-center">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}
