import { Link } from "react-router-dom";
import { PRODUCTS } from "../../config/PRODUCTS";
import ClippedImg from "../Image/ClippedImage";

export default function ProductCard({ product }) {
  return (
    <Link
      to={"/product/" + PRODUCTS.indexOf(product)}
      className="w-60 rounded-xl bg-white shadow-lg flex-shrink-0 cursor-pointer"
    >
      <ClippedImg
        width="100%"
        height="11rem"
        radius="0.75rem"
        src="/assets/redbag.png"
        alt={product.title}
      />
      <div className="px-4 my-2 flex flex-col gap-1">
        <div className="text-center text-lg">{product.title}</div>
        <div className="text-xs text-contrast flex justify-between">
          <span>{product.vendor}</span>
          <span className="flex items-center">
            <span className="icon_text text-sm">grade</span>
            {product.rating} ({product.reviews})
          </span>
        </div>
        <div className="flex justify-between font-bold text-sm">
          <span>{product.price}</span>
          <span>{product.stock} in stock</span>
        </div>
        <div className="text-xs">{product.description}</div>
      </div>
    </Link>
  );
}
