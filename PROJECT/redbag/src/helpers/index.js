import axios from "../config/axios";

export const readFile = (file) =>
  new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        resolve(event.target.result);
      };
    } catch (error) {
      reject(error);
    }
  });

export const fetchFiltered = async (filter, then) => {
  try {
    const response = await axios.post("/product/fetch_filtered", filter);
    then(response.data.products);
  } catch (error) {
    console.log(error);
    then([]);
  }
};

export const createOrder = async (products, payment) => {
  try {
    await axios.post("/user/order", {
      cart: products,
      payment_method: payment,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDeliveryPrice = (price) => {
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

export const getTotalCost = (price, quantity) => {
  const priceCost = parseFloat(price);
  const deliveryCost =
    getDeliveryPrice(priceCost) === "FREE" ? 0 : getDeliveryPrice(priceCost);
  const quantityCost = Math.round(quantity);
  return Math.round((priceCost + deliveryCost) * quantityCost * 100) / 100;
};

export const getBillTotalCost = (products) =>
  Math.round(
    products
      .map((product) => getTotalCost(product.item.price, product.quantity))
      .reduce((a, b) => a + b, 0) * 100
  ) / 100;
