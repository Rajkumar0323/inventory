//Should be in assests as main.js
document.addEventListener("variant:change", (event) => {
  const variant = event.detail.variant;

  const stockText = document.querySelector(".variant-stock-widget");

  if (variant.inventory_quantity > 0) {
    stockText.innerHTML = `✅ In stock: ${variant.inventory_quantity} items left`;
  } else {
    stockText.innerHTML = `❌ Out of Stock`;
  }
});
document.addEventListener("variant:change", (event) => {
  const variant = event.detail.variant;

  const stockText = document.querySelector(".variant-stock-widget");

  if (variant.inventory_quantity > 0) {
    stockText.innerHTML = `✅ In stock: ${variant.inventory_quantity} items left`;
  } else {
    stockText.innerHTML = `❌ Out of Stock`;
  }
});
