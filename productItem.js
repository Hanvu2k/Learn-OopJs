const productItem = (data) => {
  return `
    <div>
    <div>
      <img src="${data.image}" alt="${data.name}" />
    </div>
    <div>
      <h3>${data.name}</h3>
      <div>${data.price}đ</div>
      <div>
        <span>rating</span>
        <span>icon</span>
      </div>
    </div>
  </div>
    `;
};

export { productItem };
