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
