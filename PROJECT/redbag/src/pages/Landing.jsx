import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import ProductBanner from "../components/Product/ProductBanner";
import axios from "../config/axios";

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
    <div className="w-full">
      <Carousel images={["/assets/logo.svg", "/assets/redbag.png"]} />
      <ProductBanner
        products={trending}
        viewAllLink="/products?category=Trending"
        title="Trending"
      />
      <ProductBanner
        products={topPicks}
        viewAllLink="/products?category=topPicks"
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

const fetchFiltered = async (filter, then) => {
  try {
    const response = await axios.post("/product/fetch_filtered", filter);
    then(response.data.products);
  } catch (error) {
    console.log(error);
    then([]);
  }
};
