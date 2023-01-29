import { Link } from "react-router-dom";
import ClippedImg from "../Image/ClippedImage";

export default function ProductCard({ product }) {
  return (
    <Link
      to={"/product/" + product._id}
      className="w-72 rounded-xl bg-white shadow-lg flex flex-col p-2 cursor-pointer h-96"
    >
      <div className="mx-auto">
        <ClippedImg
          width="175px"
          ratio={1 / 1}
          radius="0.75rem"
          src={product.avatar || "/assets/logo.svg"}
          alt={product.name}
        />
      </div>
      <div className="px-4 my-2 flex flex-col gap-1 overflow-hidden">
        <div className="text-center text-lg">{product.name}</div>
        <div className="text-xs text-contrast flex justify-between">
          <span>{product.vendor.name}</span>
          <span className="flex items-center">
            <span className="icon_text text-sm">star</span>
            {getRating(product.reviews)} ({product.reviews.length})
          </span>
        </div>
        <div className="flex justify-between font-bold text-sm">
          <span>{product.price}</span>
          <span>{product.stock} in stock</span>
        </div>
        <div className="text-xs whitespace-pre-wrap">{product.description}</div>
      </div>
    </Link>
  );
}

const getRating = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return "NA";
  }
  const ratings = reviews.map((review) => review.rating);
  const rating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  return Math.round(rating * 100) / 100;
};
