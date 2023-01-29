import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";

export default function Order() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await axios.get("/user/order");
    setOrders(data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePayClick = async (order_id) => {
    await axios.patch("/user/order/pay", { order: order_id });
    await fetchOrders();
  };

  const handleConfirmClick = async (order_id) => {
    await axios.patch("user/order/confirm", { order: order_id });
    await fetchOrders();
  };

  return (
    <div className="w-full md:max-w-3xl flex flex-col gap-2">
      {orders.map((order) => (
        <OrderDisplay
          key={order._id}
          order={order}
          handleConfirmClick={handleConfirmClick}
          handlePayClick={handlePayClick}
        />
      ))}
    </div>
  );
}

function OrderDisplay({ order, handleConfirmClick, handlePayClick }) {
  const [show, setShow] = useState(false);
  const handleProductsClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      <OrderHead
        order={order}
        onProductsClick={handleProductsClick}
        onConfirmClick={() => handleConfirmClick(order._id)}
        onPayClick={() => handlePayClick(order._id)}
      />
      {show ? (
        <OrderProducts order_id={order._id} products={order.cart} />
      ) : (
        <></>
      )}
    </>
  );
}

function OrderHead({ order, onProductsClick, onPayClick, onConfirmClick }) {
  const date = new Date(order.createdAt);
  return (
    <div className="bg-white rounded flex flex-col gap-2 md:flex-row justify-between px-4 py-2 md:items-center">
      <button
        className="btn btn-primary cursor-pointer"
        onClick={onProductsClick}
      >
        {order.cart.length} Products
      </button>
      <div className="text-tertiary_dark text-center flex-grow">
        {date.toDateString()}
      </div>
      <div className="flex md:gap-4 flex-grow justify-around md:justify-end text-sm items-center">
        <span className="bg-primary_light text-light p-1 px-2 rounded">
          NPR {order.bill_amount}
        </span>
        <span
          className={
            (order.isPaid ? "bg-green-700" : "bg-red-700") +
            " text-light p-1 px-2 rounded cursor-pointer"
          }
          onClick={onPayClick}
        >
          {order.isPaid ? "Paid" : "Pay"}
        </span>
        <span
          className={
            (order.isConfirmed ? "bg-green-700" : "bg-red-700") +
            " text-light p-1 px-2 rounded cursor-pointer"
          }
          onClick={onConfirmClick}
        >
          {order.isConfirmed ? "Confirmed" : "Confirm"}
        </span>
      </div>
    </div>
  );
}

function OrderProducts({ order_id, products }) {
  return (
    <div className="bg-white rounded px-4 py-2 flex-col gap-2 flex ">
      {products.map((product, index) => (
        <ProductDetails key={index} product={product} order_id={order_id} />
      ))}
    </div>
  );
}

function ProductDetails({ product, order_id }) {
  const navigate = useNavigate();
  const handleReview = async (rating, review) => {
    await axios.post("/user/order/review", {
      order_id,
      product_name: product.item.name,
      rating,
      review,
    });
    navigate("/product/" + product.item._id);
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-primary md:text-lg border-b border-tertiary">
        {product.item.name} x {product.quantity}
      </span>
      <ReviewForm handleReview={handleReview} />
    </div>
  );
}

function ReviewForm({ handleReview }) {
  const [rating, setRating] = useState(5);
  const review = useRef();

  return (
    <div className="flex flex-col w-full gap-2">
      <Stars rating={rating} setRating={setRating} />
      <div className="flex flex-col gap-2 md:flex-row items-center">
        <input
          type="text"
          name="review"
          className="px-4 py-2 text-primary_dark rounded"
          ref={review}
          required
        />
        <button
          className="btn btn-primary flex-shrink-0 md:mx-auto"
          onClick={() => {
            handleReview(rating, review.current.value);
          }}
        >
          Leave Review
        </button>
      </div>
    </div>
  );
}

function Stars({ rating, setRating }) {
  return (
    <div className="flex gap-1 justify-center">
      <span
        onClick={() => setRating((prev) => (prev === 0 ? 1 : 0))}
        className={`icon_text  cursor-pointer text-lg ${
          rating > 0 ? "text-contrast_light" : "text-tertiary_dark"
        }`}
      >
        star
      </span>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <span
            key={index}
            onClick={() => setRating(index + 2)}
            className={`icon_text cursor-pointer text-lg ${
              rating > index + 1 ? "text-contrast_light" : "text-tertiary_dark"
            }`}
          >
            star
          </span>
        ))}
    </div>
  );
}
