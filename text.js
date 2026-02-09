let products = [];
let cart = [];

async function initApp() {
  try {
    const response = await fetch("./data.json");
    products = await response.json();
    renderProducts();
  } catch (err) {
    console.error("Data loading error:", err);
  }
}

function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach((p, index) => {
    const inCart = cart.find((item) => item.id === index);

    list.innerHTML += `
            <div class="flex flex-col">
                <div class="relative mb-8">
                    <img src="${p.image.desktop}" 
                         class="rounded-xl w-full border-2 ${inCart ? "border-[#c73a0f]" : "border-transparent"}">
                    
                    <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 w-40 h-11">
                        ${
                          inCart
                            ? `
                            <div class="bg-[#c73a0f] text-white flex justify-between items-center rounded-full px-4 h-full shadow-md whitespace-nowrap">
                                <button onclick="changeQty(${index}, -1)" class="w-5 h-5 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#c73a0f]">-</button>
                                <span class="font-bold">${inCart.qty}</span>
                                <button onclick="changeQty(${index}, 1)" class="w-5 h-5 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#c73a0f]">+</button>
                            </div>
                        `
                            : `
                            <button onclick="addToCart(${index})"
                             class="bg-white border border-stone-400 w-full h-full rounded-full flex items-center justify-center gap-2 font-semibold hover:border-[#c73a0f] hover:text-[#c73a0f] shadow-sm transition text-sm">
                                <img src="./assets/images/icon-add-to-cart.svg" alt="Add to Cart"> Add to Cart
                            </button>
                        `
                        }
                    </div>
                </div>
                <p class="text-stone-400 text-sm">${p.category}</p>
                <h3 class="font-bold text-stone-900">${p.name}</h3>
                <p class="text-[#c73a0f] font-bold">$${p.price.toFixed(2)}</p>
            </div>
        `;
  });
}

function addToCart(index) {
  const p = products[index];
  cart.push({
    id: index,
    name: p.name,
    price: p.price,
    qty: 1,
    thumb: p.image.thumbnail
  });
  updateUI();
}

function changeQty(id, amt) {
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.qty += amt;
    if (item.qty <= 0) {
      cart = cart.filter((i) => i.id !== id);
    }
  }
  updateUI();
}

function updateUI() {
  renderProducts();

  const cartList = document.getElementById("cart-items-list");
  const totalCountLabel = document.getElementById("cart-count");
  const totalPriceLabel = document.getElementById("order-total");
  const emptyState = document.getElementById("empty-state");
  const cartSummary = document.getElementById("cart-footer");

  let totalQty = 0;
  let totalPrice = 0;

  cartList.innerHTML = "";

  if (cart.length === 0) {
    emptyState.classList.remove("hidden");
    cartSummary.classList.add("hidden");
  } else {
    emptyState.classList.add("hidden");
    cartSummary.classList.remove("hidden");

    cart.forEach((item) => {
      totalQty += item.qty;
      totalPrice += item.price * item.qty;

      cartList.innerHTML += `
                <div class="py-4 flex justify-between items-center border-b border-stone-50">
                    <div>
                        <p class="font-bold text-stone-900 text-sm">${item.name}</p>
                        <div class="flex gap-2 text-sm mt-1">
                            <span class="text-[#c73a0f] font-bold">${item.qty}x</span>
                            <span class="text-stone-400">@ $${item.price.toFixed(2)}</span>
                            <span class="text-stone-500 font-bold">$${(item.price * item.qty).toFixed(2)}</span>
                        </div>
                    </div>
                    <button onclick="changeQty(${item.id}, -${item.qty})" class="text-stone-300 border border-stone-300 rounded-full w-4 h-4 flex items-center justify-center hover:text-stone-900 hover:border-stone-900">×</button>
                </div>
            `;
    });
  }

  totalCountLabel.innerText = totalQty;
  totalPriceLabel.innerText = `$${totalPrice.toFixed(2)}`;
}

function showModal() {
  const modal = document.getElementById("modal");
  const modalSummary = document.getElementById("modal-summary");
  let totalPrice = 0;

  modalSummary.innerHTML = cart
    .map((item) => {
      const itemTotal = item.price * item.qty;
      totalPrice += itemTotal;

      return `
        <div class="flex justify-between items-center py-3 border-b border-stone-100 last:border-0">
            <div class="flex gap-4 items-center" style="gap:16px">
                <img src="${item.thumb}" alt="${item.name}" class="w-12 h-12 rounded-md object-cover" style="width: 48px; height:48px; border-radius:6px">
                <div class="flex flex-col">
                    <span class="font-bold text-stone-900 text-sm truncate w-32 md:w-48">${item.name}</span>
                        <div class="flex gap-3 text-sm" style="gap:12px">
                            <span class="text-[#c73a0f] font-bold">${item.qty}x</span>
                            <span class="text-stone-400 font-normal">@ $${item.price.toFixed(2)}</span>
                        </div>
                </div>
            </div>
            <span class="font-semibold text-stone-900 text-sm">$${(item.price * item.qty).toFixed(2)}</span>
        </div>
        `;
    })
    .join("");

  modalSummary.innerHTML += `
        <div class="flex justify-between items-center pt-6 mt-2">
            <span class="text-stone-600 text-sm">Order Total</span>
            <span class="text-2xl font-bold text-stone-900">$${totalPrice.toFixed(2)}</span>
        </div>
    `;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function resetOrder() {
  cart = [];
  updateUI();

  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

initApp();