import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import ProductBanner from "../components/Product/ProductBanner";
import { fetchFiltered } from "../helpers";

export default function Landing() {
  const [trending, setTrending] = useState([]);
  const [topPicks, setTopPicks] = useState([]);
  const [valueForMoney, setValueForMoney] = useState([]);

  useEffect(() => {
    fetchFiltered({ category: ["Trending"] }, (data) => setTrending(data));
    fetchFiltered({ category: ["Top Picks"] }, (data) => setTopPicks(data));
    fetchFiltered({ category: ["Value for Money"] }, (data) =>
      setValueForMoney(data)
    );
  }, []);

  return (
    <div className="w-full md:w-11/12">
      <div className="md:w-2/3 mx-auto">
        <Carousel images={["/assets/logo.svg", "/assets/redbag.png"]} />
      </div>
      <ProductBanner
        products={trending}
        viewAllLink="/products?category=Trending"
        title="Trending"
      />
      <ProductBanner
        products={topPicks}
        viewAllLink="/products?category=Top Picks"
        title="Top Picks"
      />
      <ProductBanner
        products={valueForMoney}
        viewAllLink="/products?category=Value for Money"
        title="Value for Money"
      />
      <Link
        to="/products"
        className="btn btn-primary flex justify-center mx-auto text-lg w-8/12"
      >
        Browse hundreds of other products
      </Link>
    </div>
  );
}
