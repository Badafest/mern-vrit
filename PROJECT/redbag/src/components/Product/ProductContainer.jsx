import ProductCard from "./ProductCard";

export default function ProductContainer({ PRODUCTS }) {
  return (
    <div className="flex gap-x-4 gap-y-6 flex-wrap items-center py-4 justify-center">
      {PRODUCTS.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}
