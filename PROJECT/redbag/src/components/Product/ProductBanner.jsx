import ProductCard from "./ProductCard";

export default function ProductBanner({ PRODUCTS, title = "Products" }) {
  return (
    <div className="w-full ">
      <div className="flex justify-between items-center p-2 ">
        <div className="text-lg font-bold ">{title}</div>
        <div className="btn btn-primary flex items-center gap-2">
          <span className="text-sm">View All</span>
          <span className="icon_text text-2xl p-1">read_more</span>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-scroll items-center py-4">
        {PRODUCTS.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
