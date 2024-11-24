document.addEventListener("DOMContentLoaded", () => {
  const cartItems = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  let totalPrice = 0;

  const cart = {};

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const card = event.target.closest(".card");
      const itemName = card.querySelector(".card-text").textContent.trim();
      const itemPrice = parseFloat(
        card.querySelector("small").textContent.replace("eiro", "").trim()
      );
      const quantityInput = card.querySelector(".pizza-quantity");
      const quantity = parseInt(quantityInput.value);

      if (cart[itemName]) {
        cart[itemName].quantity += quantity;
      } else {
        cart[itemName] = { price: itemPrice, quantity: quantity };
      }

      totalPrice += itemPrice * quantity;
      totalPriceElement.textContent = totalPrice.toFixed(2);
      renderCart();
    });
  });

  function renderCart() {
    cartItems.innerHTML = "";

    for (const [itemName, itemDetails] of Object.entries(cart)) {
      const { price, quantity } = itemDetails;

      const listItem = document.createElement("li");
      listItem.textContent = `${itemName} x${quantity} - ${(
        price * quantity
      ).toFixed(2)} eiro`;
      listItem.style.cursor = "pointer";

      let timer = null;

      listItem.addEventListener("click", () => {
        if (!timer) {
          if (cart[itemName].quantity > 1) {
            cart[itemName].quantity -= 1;
            totalPrice -= price;
          } else {
            delete cart[itemName];
            totalPrice -= price * quantity;
          }

          totalPriceElement.textContent = totalPrice.toFixed(2);
          renderCart();
        }
      });

      listItem.addEventListener("mousedown", (event) => {
        if (event.button === 0) {
          timer = setTimeout(() => {
            const totalItemPrice = price * quantity;
            totalPrice -= totalItemPrice;
            delete cart[itemName];

            totalPriceElement.textContent = totalPrice.toFixed(2);
            renderCart();
          }, 400);
        }
      });

      listItem.addEventListener("mouseup", () => {
        clearTimeout(timer);
        timer = null;
      });

      cartItems.appendChild(listItem);
    }
  }
});
