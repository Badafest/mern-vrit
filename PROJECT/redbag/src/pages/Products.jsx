import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductContainer from "../components/Product/ProductContainer";
import { fetchFiltered } from "../slices/product.slice";

//products?category=category1.category2.category3....?vendor=vendor1.vendor2.vendor3....&price=MINtoMAX

export default function () {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const vendor = searchParams.get("vendor");
  const price = searchParams.get("price");

  const filter = { index: 1, total: 5 };

  if (price) {
    filter.price = price.split("to").map(parseFloat);
  }

  if (category) {
    filter.category = category.split(".");
  }

  if (vendor) {
    filter.vendor = vendor.split(".");
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFiltered(filter));
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center">
      <div>{filter.category}</div>
      <ProductContainer />
    </div>
  );
}
