import { header } from "./header.js";
import { footer } from "./footer.js";

const layout = (content) => {
  const layout = `${header()} ${content} ${footer()}`;
  return layout;
};

export { layout };
