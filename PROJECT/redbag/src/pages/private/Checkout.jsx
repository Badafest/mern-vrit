import { useSelector } from "react-redux";

export default function Checkout() {
  const products = useSelector((state) => state.cart.products);
  return (
    <div className="w-8/12 bg-white shadow-md rounded-lg flex-col gap-2 p-2">
      {products.length ? (
        products.map((product, index) => (
          <div
            key={index}
            className="border border-tertiary p-2 rounded-md flex"
          >
            <div className="w-3/6">{product.item.name}</div>
            <div className="w-1/6">
              {product.item.price}+{product.item.delivery}
            </div>
            <div className="w-1/6">{product.quantity}</div>
            <div className="w-1/6">
              NPR{" "}
              {getTotalCost(
                product.item.price,
                product.item.delivery,
                product.quantity
              )}
            </div>
          </div>
        ))
      ) : (
        <>Your cart is empty. Add some products now!</>
      )}
    </div>
  );
}

const getTotalCost = (price, delivery, quantity) => {
  const priceCost = parseFloat(price.split(" ")[1]);
  const deliveryCost =
    delivery === "FREE" ? 0 : parseFloat(delivery.split(" ")[1]);
  const quantityCost = parseInt(quantity);
  return Math.round((priceCost + deliveryCost) * quantityCost * 100) / 100;
};
