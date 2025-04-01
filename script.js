import { products } from "./products.js";
import { layout } from "./layout/layout.js";

const productContent = document.querySelector("#product");
productContent.innerHTML = products();

const body = document.querySelector("main");
const app = document.querySelector("#app");
// Khởi tạo layout ban đầu
app.innerHTML = layout(body.innerHTML);
