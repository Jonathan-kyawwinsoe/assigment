let cart = [];

const productCards = document.querySelectorAll(".product-card");

productCards.forEach((productCard) => {
  const addBtn = productCard.querySelector(".add_to_card");
  const qtySelector = productCard.querySelector(".quantity");
  const minusBtn = productCard.querySelector(".minus-btn");
  const countQty = productCard.querySelector(".count");
  const plusBtn = productCard.querySelector(".plus-btn");

  const productName = productCard.querySelector("h3").innerText;
  const priceText = productCard.querySelector(".priceText").innerText;
  const productPrice = parseFloat(priceText.replace("$", ""));

  let currentQty = 1;

  function syncQty(qty) {
    const existingItem = cart.find((item) => item.name === productName);
    if (existingItem) {
      existingItem.quantity = qty;
    } else {
      cart.push({ name: productName, price: productPrice, quantity: qty });
    }
    if (qty <= 0) {
      cart = cart.filter((item) => item.name !== productName);
    }
    renderCardUI();
  }
  addBtn.addEventListener("click", () => {
    currentQty = 1;
    addBtn.classList.add("hidden");
    qtySelector.classList.remove("hidden");
    qtySelector.classList.add("flex");

    countQty.innerText = currentQty;
    syncQty(currentQty);
  });
  plusBtn.addEventListener("click", () => {
    currentQty++;
    countQty.innerText = currentQty;
    syncQty(currentQty);
  });
  minusBtn.addEventListener("click", () => {
    if (currentQty > 1) {
      currentQty--;
      countQty.innerText = currentQty;
      syncQty(currentQty);
    } else {
      currentQty = 0;
      qtySelector.classList.add("hidden");
      qtySelector.classList.remove("flex");
      addBtn.classList.remove("hidden");
      syncQty(currentQty);
    }
  });
});

function renderCardUI() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const TotalDisplay = document.getElementById("grand-total");
  const emptyCard = document.getElementById("empty-cart");
  const checkOut = document.getElementById("checkOut");

  const rows = cartItemsContainer.querySelectorAll(".cart-row");
  rows.forEach((row) => row.remove());
  if (cart.length === 0) {
    emptyCard.classList.remove("hidden");
    checkOut.classList.add("hidden");
    cartCount.innerText = "0";
    TotalDisplay.innerText = "$0.00";
    return;
  }
  emptyCard.classList.add("hidden");
  checkOut.classList.remove("hidden")
  let totalcash = 0;
  let totalQty = 0;

  cart.forEach((item) => {
    totalcash += item.price * item.quantity;
    totalQty += item.quantity;

    const div = document.createElement("div");
    div.className =
      "cart-row flex justify-between items-center py-4 border-b border-gray-100";
    div.innerHTML = `<div>
        <p class="font-bold text-gray-800 text-sm mb-1">${item.name}</p>
        <div class="flex gap-2 text-sm">
          <span class="text-rose-600 font-bold">${item.quantity}x</span>
          <span class="text-gray-400">@ $${item.price.toFixed(2)}</span>
          <span class="text-gray-500 font-semibold">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
      <button onclick="removeItemFromCart('${item.name}')" class=" border rounded-full w-5 h-5 flex items-center justify-center hover:border-red-700 ">
      <img src="./assets/images/icon-remove-item.svg" alt="">
        </button>
    `;
    cartItemsContainer.appendChild(div);
  });
  cartCount.innerText = totalQty;
  TotalDisplay.innerText = `$${totalcash.toFixed(2)}`;
}

window.removeItemFromCart = function (name) {
  cart = cart.filter((item) => item.name !== name);
  const allCards = document.querySelectorAll(".product-card");
  allCards.forEach((card) => {
    if (card.querySelector("h3").innerText === name) {
      card.querySelector(".add_to_card").classList.remove("hidden");
      card.querySelector(".quantity").classList.add("hidden");
      card.querySelector(".quantity").classList.remove("flex");
    }
  });

  renderCardUI();
};
