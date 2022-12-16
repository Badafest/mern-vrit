import Carousel from "../components/Carousel";
import ProductBanner from "../components/Product/ProductBanner";

import { PRODUCTS } from "../config/PRODUCTS";

export default function Landing() {
  return (
    <div className="w-full">
      <Carousel images={["/assets/logo.svg", "/assets/redbag.png"]} />
      <ProductBanner
        PRODUCTS={PRODUCTS.filter((product) => product.category.includes("TV"))}
      />
    </div>
  );
}
