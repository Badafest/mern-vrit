import { useSelector } from "react-redux";

export default function Checkout() {
  const products = useSelector((state) => state.cart.products);
  return (
    <div className="w-8/12 bg-white shadow-md rounded-lg flex-col gap-2">
      {products.length ? (
        products.map((product, index) => (
          <div key={index} className="bg-primary p-2 rounded-md">
            {product.title}
          </div>
        ))
      ) : (
        <>Your cart is empty. Add some products now!</>
      )}
    </div>
  );
}
