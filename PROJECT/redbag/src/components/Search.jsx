import axios from "../config/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState({
    products: [],
    categories: [],
    vendors: [],
  });

  const resetSearch = () => {
    setQuery("");
    setSuggestions({
      products: [],
      categories: [],
      vendors: [],
    });
  };

  useEffect(() => {
    axios
      .get(`/product/search?query=${query}`)
      .then((res) => setSuggestions(res.data.suggestions))
      .catch((err) => {
        console.log(err.message);
        resetSearch();
      });
  }, [query]);

  const ProductSuggestions = () => (
    <>
      {suggestions.products.map((product, index) => (
        <Link
          key={index}
          to={`/product/${product._id}`}
          className="px-4 py-2 flex justify-between gap-2 items-center border-b"
          onClick={resetSearch}
        >
          <span>{product.name}</span>
          <span className="text-xs text-gray-500">product</span>
        </Link>
      ))}
    </>
  );

  const CategorySuggestions = () => (
    <>
      {suggestions.categories.map((category, index) => (
        <Link
          key={index}
          to={`/products?category=${category}`}
          className="px-4 py-2 flex justify-between gap-2 items-center border-b"
          onClick={resetSearch}
        >
          <span>{category}</span>
          <span className="text-xs text-gray-500">category</span>
        </Link>
      ))}
    </>
  );

  const VendorSuggestions = () => (
    <>
      {suggestions.vendors.map((vendor, index) => (
        <Link
          key={index}
          to={`/products?vendor=${vendor}`}
          className="px-4 py-2 flex justify-between gap-2 items-center border-b"
          onClick={resetSearch}
        >
          <span>{vendor}</span>
          <span className="text-xs text-gray-500">vendor</span>
        </Link>
      ))}
    </>
  );

  return (
    <div className="flex flex-col gap-2 md:w-1/3">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="What do you want today?"
          name="query"
          id="query"
          className="rounded-full pr-12 py-2.5 flex-grow"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="absolute right-3 text-primary_dark icon_text text-2xl">
          search
        </span>
      </div>
      {suggestions.categories.length ||
      suggestions.vendors.length ||
      suggestions.products.length ? (
        <div className="bg-white rounded-md shadow-lg max-h-64 overflow-auto absolute top-16 z-10 w-full left-1/2 -translate-x-1/2 md:w-1/3 md:left-auto md:translate-x-0 text-primary p-2 flex flex-col">
          {suggestions.products && <ProductSuggestions />}
          {suggestions.categories && <CategorySuggestions />}
          {suggestions.vendors && <VendorSuggestions />}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
