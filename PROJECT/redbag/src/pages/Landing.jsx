import ProductContainer from "../components/Product/ProductContainer";

import { PRODUCTS } from "../config/PRODUCTS";

export default function Landing() {
  return <ProductContainer PRODUCTS={PRODUCTS} />;
}
