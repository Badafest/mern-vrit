import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ClippedImg from "../components/Image/ClippedImage";
import { PRODUCTS } from "../config/PRODUCTS";
import { addToCart } from "../slices/cart.slice";

export default function Product() {
  const { id } = useParams();
  const product = PRODUCTS[id];

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart([product]));
  };

  const handleAddToFav = () => {
    dispatch(addToCart([product]));
  };

  return (
    <div className="w-full">
      <div className="md:w-8/12 mx-auto bg-white shadow-lg rounded-md flex flex-col gap-2 justify-center">
        <div className="bg-primary rounded-t-md text-light font-bold p-4 text-center">
          {product.title}
        </div>
        <div className="flex justify-center text-sm">
          {product.category.map((category, index) => (
            <div key={index} className="px-1 text-contrast_dark">
              {category}
            </div>
          ))}
        </div>
        <div className="mx-auto mb-4">
          <ClippedImg src={product.image || "/assets/logo.svg"} width="20rem" />
        </div>
        <div className="bg-light p-2 flex flex-col justify-between items-center gap-1 md:flex-row">
          <span className="text-contrast flex items-center">
            <RatingStars no={product.rating} />
            <span className="text-sm p-1">{`${product.rating} [${product.reviews}]`}</span>
          </span>
          <span className=" bg-primary text-light p-2 rounded-lg flex items-center w-full justify-center md:w-auto">
            <span className="icon_text">sell</span>
            <span className="text-sm px-1">{product.price}</span>
            <span className="text-sm px-1"> + {product.delivery}</span>
          </span>
          <button
            className="btn btn-primary w-full md:w-auto"
            onClick={handleAddToFav}
          >
            Add to Favorites
          </button>
          <button
            className="btn btn-primary w-full md:w-auto"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>

        <div className="text-primary text-sm  mx-auto px-3">
          <ul className="font-bold">
            <li>Vendor: {product.vendor}</li>
            <li>Sold: {product.sold}</li>
            <li>In Stock: {product.stock}</li>
          </ul>
          <div className="my-2">{product.description}</div>
        </div>
      </div>
    </div>
  );
}

const RatingStars = ({ no }) => {
  const Complete = () =>
    Array(parseInt(no))
      .fill(1)
      .map((_, index) => (
        <span key={index} className="icon_text">
          star
        </span>
      ));
  const Half = () =>
    no - parseInt(no) >= 0.5 ? (
      <span className="icon_text">star_half</span>
    ) : (
      <></>
    );
  return (
    <>
      <Complete />
      <Half />
    </>
  );
};
