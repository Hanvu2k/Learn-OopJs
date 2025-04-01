import { productItem } from "./productItem.js";
import { productData } from "./data.js";

const products = () => {
  let product = "";
  productData.forEach((item) => {
    product += productItem(item);
  });

  return product;
};

export { products };
