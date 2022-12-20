import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserCart } from "../../slices/cart.slice";

export default function Cart() {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserCart());
  }, []);

  return (
    <div className="md:w-8/12 bg-white shadow-md rounded-lg flex flex-col gap-2 p-2">
      {products.length ? (
        <div className="flex flex-col gap-2">
          <CartItems products={products} />
          <Checkout />
        </div>
      ) : (
        <div className="flex flex-col h-4/6 items-center justify-center text-gray-500">
          <p>Your cart is empty.</p>
          <p className="text-sm"> Add products to see them here.</p>
        </div>
      )}

      <Link
        to="/products"
        className="btn btn-primary flex justify-center items-center md:w-1/2 mx-auto"
      >
        <span className="icon_text text-2xl pr-2">add</span>
        <span>Add Products</span>
      </Link>
    </div>
  );
}

const Checkout = () => (
  <div className="flex justify-end p-2">
    <Link
      to="/app/pay"
      className="btn btn-primary flex justify-center items-center w-full md:w-max"
    >
      <span className="icon_text text-2xl pr-2">payments</span>
      <span>Checkout</span>
    </Link>
  </div>
);

const CartItems = ({ products }) => (
  <div className="min-h-4/6 m-2">
    <div className="border-y border-tertiary p-2 flex text-primary_light">
      <div className="w-2/6 px-2 overflow-auto md:w-3/6">Particular</div>
      <div className="w-1/6 px-2 overflow-auto">Rate</div>
      <div className="w-1/6 px-2 overflow-auto">Qty</div>
      <div className="w-2/6 px-2 overflow-auto md:w-1/6">Total</div>
    </div>
    {products.map((product, index) => (
      <Link
        to={"/product/" + product.item._id}
        key={index}
        className="border-b border-tertiary p-2 flex"
      >
        <InvoiceItem product={product} />
      </Link>
    ))}
    <div className="border-b border-tertiary p-2 flex text-primary_light font-bold">
      <div className="w-2/6 px-2 overflow-auto text-right md:w-5/6">Total</div>
      <InvoiceTotal products={products} />
    </div>
  </div>
);

const InvoiceItem = ({ product }) => (
  <>
    <div className="w-2/6 px-2 overflow-auto md:w-3/6">{product.item.name}</div>
    <div className="w-1/6 px-2 overflow-auto">
      {product.item.price} + {getDeliveryPrice(product.item.price)}
    </div>
    <div className="w-1/6 px-2 overflow-auto">{product.quantity}</div>
    <div className="w-2/6 px-2 overflow-auto md:w-1/6">
      NPR {getTotalCost(product.item.price, product.quantity)}
    </div>
  </>
);

const InvoiceTotal = ({ products }) => (
  <div className="w-4/6 px-2 overflow-auto text-left md:w-1/6">
    NPR {getBillTotalCost(products)}
  </div>
);

const getDeliveryPrice = (price) => {
  const priceCost = parseFloat(price);
  if (priceCost <= 100) {
    return "FREE";
  }
  if (priceCost <= 1000) {
    return Math.round(3 * priceCost) / 100;
  }
  if (priceCost <= 10000) {
    return Math.round(5 * priceCost) / 100;
  }
  return Math.min(Math.round(8 * priceCost) / 100, 5000);
};

const getTotalCost = (price, quantity) => {
  const priceCost = parseFloat(price);
  const deliveryCost =
    getDeliveryPrice(priceCost) === "FREE" ? 0 : getDeliveryPrice(priceCost);
  const quantityCost = Math.round(quantity);
  return Math.round((priceCost + deliveryCost) * quantityCost * 100) / 100;
};

const getBillTotalCost = (products) =>
  Math.round(
    products
      .map((product) => getTotalCost(product.item.price, product.quantity))
      .reduce((a, b) => a + b, 0) * 100
  ) / 100;
