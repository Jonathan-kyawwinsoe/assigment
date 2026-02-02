const productList = document.getElementById("productList");
let cart = [];
let allProduct = [];

fetch("./data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Can Not Found the Data");
    }
    return response.json();
  })
  .then((data) => {
    allProduct = data;
    data.forEach((item, index) => {
      const productCard = `<div class="flex flex-col mb-10">
            <div class=" relative flex flex-col">
              <div class="">
                <img
                  class="rounded-xl hidden d-lg-block w-full"
                  src="${item.image.desktop}"
                  alt=""
                />
                <img
                  class="rounded-xl hidden md:block w-full"
                  src="${item.image.tablet}"
                  alt=""
                />
                <img
                  class="rounded-xl block md:hidden w-full object-cover"
                  src="${item.image.mobile}"
                  alt=""
                />
              </div>
              <div
                class="absolute bottom-24 left-1/2 -translate-x-1/2 translate-y-1/2 w-max"
              >
                <button
                id ="addToCard-${index}"
                onclick="BtnClick(${index})"
                  class=" flex items-center gap-2 bg-rose-50 px-6 py-3 rounded-full shadow-md hover:text-red-700 hover:border"
                >
                  <img src="./assets/images/icon-add-to-cart.svg" alt="" />
                  <span class="font-bold text-sm">Add to cart</span>
                </button>
                <div
                id="qty-btn-${index}"
                  class="hidden absolute items-center justify-between gap-4 bg-rose-700 px-6 py-3 rounded-full shadow-md w-40 text-white bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                >
                  <button
                  id ="minus-btn"
                  onclick="changeQty(${index}, -1)"
                    class=" border border-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-white hover:text-rose-500"
                  >
                    -
                  </button>

                  <span id="count-${index}" class="count font-bold">1</span>

                  <button
                  id ="plus-btn"
                  onclick="changeQty(${index}, 1)"
                    class=" border border-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-white hover:text-rose-500"
                  >
                    +
                  </button>
                </div>
              </div>
              <div class="mt-8 text-left">
                <p class="text-gray-400 text-xs font-normal">${item.category}</p>
                <h3 class="font-bold">${item.name}</h3>
                <p class=" text-rose-600 font-bold">$ ${item.price}</p>
              </div>
            </div>
          </div>`;
      productList.innerHTML += productCard;
    });
  })
  .catch((error) => {
    console.error("Error", error);
    productList.innerHTML = `<P>That is not OK!</P>`;
  });
function BtnClick(index) {
  const addBtn = document.getElementById(`addToCard-${index}`);
  addBtn.classList.add("hidden");
  const qtyBtn = document.getElementById(`qty-btn-${index}`);
  qtyBtn.classList.remove("hidden");
  qtyBtn.classList.add("flex");

  const product = allProduct[index];

  cart.push({ ...product, quantity: 1, index: index });
  renderCart();
}

function changeQty(index, change) {
  const itemInCart = cart.find((item) => item.index === index);
  const addBtn = document.getElementById(`addToCard-${index}`);
  const qtyBtn = document.getElementById(`qty-btn-${index}`);

  if (itemInCart) {
    itemInCart.quantity += change;
  }
  if (itemInCart.quantity < 1) {
    cart = cart.filter((item) => item.index !== index);
    addBtn.classList.remove("hidden");
    qtyBtn.classList.add("hidden");
    qtyBtn.classList.add("flex");
  } else {
    const count = document.getElementById(`count-${index}`);
    count.innerText = itemInCart.quantity;
  }
  renderCart();
}
function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const emptyCartView = document.getElementById("empty-cart");
  const checkOutSection = document.getElementById("checkOut");
  const totalPriceDisplay = document.getElementById("price-total");
  const cartCountLabel = document.getElementById("cart-count");

  if (cart.length === 0) {
    emptyCartView.classList.remove("hidden");
    checkOutSection.classList.add("hidden");
    checkOutSection.classList.add("flex");
    cartContainer.innerText = "";
    if (cartCountLabel) cartCountLabel.innerText = "0";
    return;
  }

  if (cartCountLabel == 0) {
    emptyCartView.classList.add("hidden");
  }

  checkOutSection.classList.remove("hidden");
  let totalOrderPrice = 0;
  let cartHTML = "";

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    totalOrderPrice = itemTotal;
    cartHTML += `
      <div class="flex justify-between items-center py-4 border-b border-gray-100">
        <div>
          <p class="font-bold text-gray-800 text-sm">${item.name}</p>
          <div class="flex gap-4 text-sm mt-1">
            <span class="text-rose-600 font-bold">${item.quantity}x</span>
            <span class="text-gray-400">@ $${item.price.toFixed(2)}</span>
            <span class="text-gray-600 font-semibold">$${itemTotal.toFixed(2)}</span>
          </div>
        </div>
        <button onclick="removeItem(${item.index})" class="text-gray-400 hover:text-gray-800 border border-gray-300 rounded-full p-1">
           <img src="./assets/images/icon-remove-item.svg" alt="remove" />
        </button>
      </div>
    `;
  });
  cartContainer.innerHTML = cartHTML;
  console.log({ type: typeof cartContainer, cartContainer });
}
