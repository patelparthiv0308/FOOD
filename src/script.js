// --- Firebase Configuration ---
// TODO: Replace with your Firebase config
/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
*/

// --- Cart Logic ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
window.saveCart = saveCart;

// Add item to cart
function addToCart(name, price, img = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200") {
  let item = cart.find(i => i.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, img, qty: 1 });
  }

  saveCart();
  updateCartUI();
  showToast(`${name} added to cart!`);
}
window.addToCart = addToCart;

// Increase quantity
function increaseQty(index) {
  cart[index].qty++;
  saveCart();
  refreshAll();
}
window.increaseQty = increaseQty;

// Decrease quantity
function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty--;
  } else {
    cart.splice(index, 1);
  }
  saveCart();
  refreshAll();
}
window.decreaseQty = decreaseQty;

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  refreshAll();
}
window.removeItem = removeItem;

// Refresh all UI elements
function refreshAll() {
  updateCartUI();
  if (typeof loadCartPage === "function") loadCartPage();
  if (typeof loadLiveCart === "function") loadLiveCart();
}

// Update Cart Dropdown UI (Navbar)
function updateCartUI() {
  console.log("Updating Cart UI... Current cart:", cart);
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  if (cartCount) cartCount.innerText = cart.reduce((sum, i) => sum + i.qty, 0);

  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <div class="mb-3 border-bottom border-secondary pb-2">
        <div class="d-flex align-items-center mb-2">
          <img src="${item.img}" class="rounded me-2" style="width: 40px; height: 40px; object-fit: cover; border: 1px solid rgba(255,255,255,0.1);">
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between">
              <strong style="font-size: 14px;">${item.name}</strong>
              <span class="text-warning small fw-bold">₹${item.price * item.qty}</span>
            </div>
            <div class="mt-1 d-flex align-items-center">
              <button onclick="decreaseQty(${index})" class="btn btn-sm btn-outline-danger py-0 px-2" style="font-size: 10px;">-</button>
              <span class="mx-2 small text-light">${item.qty}</span>
              <button onclick="increaseQty(${index})" class="btn btn-sm btn-outline-success py-0 px-2" style="font-size: 10px;">+</button>
              <button onclick="removeItem(${index})" class="btn btn-sm text-muted ms-auto p-0" style="font-size: 10px;">Remove</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  if (cartTotal) cartTotal.innerText = "Total: ₹" + total;
}
window.updateCartUI = updateCartUI;

// Load Cart Page (cart.html)
function loadCartPage() {
  const container = document.getElementById("cart-container");
  const totalEl = document.getElementById("cart-total");
  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<div class='text-center py-5'><h5>Your cart is empty 😢</h5><a href='index.html' class='btn btn-warning mt-3'>Order Something</a></div>";
    if (totalEl) totalEl.innerText = "Total: ₹0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    container.innerHTML += `
      <div class="cart-card d-flex align-items-center justify-content-between shadow-sm p-3 mb-3 bg-dark border border-secondary rounded">
        <div class="d-flex align-items-center">
          <img src="${item.img}" class="cart-img me-3 rounded" style="width: 70px; height: 70px; object-fit: cover;">
          <div>
            <h5 class="mb-0 text-white">${item.name}</h5>
            <p class="mb-0 text-secondary">₹${item.price}</p>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <button onclick="decreaseQty(${index})" class="btn btn-outline-warning btn-sm">-</button>
          <span class="mx-3 fw-bold text-white">${item.qty}</span>
          <button onclick="increaseQty(${index})" class="btn btn-outline-success btn-sm">+</button>
        </div>
        <div class="text-end">
          <h6 class="text-white">₹${item.price * item.qty}</h6>
          <button onclick="removeItem(${index})" class="btn btn-link btn-sm text-danger p-0">Remove</button>
        </div>
      </div>
    `;
  });

  if (totalEl) totalEl.innerText = "₹" + total;
  const subtotalEl = document.getElementById("summary-subtotal");
  if (subtotalEl) subtotalEl.innerText = "₹" + total;
}
window.loadCartPage = loadCartPage;

// Load Live Cart (Sidebar on menu pages)
function loadLiveCart() {
  const container = document.getElementById("live-cart-items"); // Use specific ID for menu pages
  const totalEl = document.getElementById("cart-total");
  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    container.innerHTML += `
      <div class="mb-3 border-bottom border-secondary pb-2">
        <div class="d-flex align-items-center">
          <img src="${item.img}" width="40" height="40" class="me-2 rounded">
          <div class="flex-grow-1">
            <small class="d-block text-white">${item.name}</small>
            <small class="text-secondary">₹${item.price} x ${item.qty}</small>
          </div>
          <button onclick="removeItem(${index})" class="btn btn-sm text-danger">×</button>
        </div>
      </div>
    `;
  });

  if (totalEl) totalEl.innerText = "₹" + total;
  const subtotalEl = document.getElementById("summary-subtotal");
  if (subtotalEl) subtotalEl.innerText = "₹" + total;
}
window.loadLiveCart = loadLiveCart;

// Order Now button scroll
function orderNow() {
  const menuSection = document.getElementById("menu");
  if (menuSection) {
    menuSection.scrollIntoView({ behavior: "smooth" });
    
    // Add a subtle glow effect to the menu section to highlight it
    menuSection.style.transition = "0.5s";
    menuSection.style.boxShadow = "0 0 50px rgba(255, 193, 7, 0.5)";
    setTimeout(() => {
      menuSection.style.boxShadow = "none";
    }, 2000);
  }
}
window.orderNow = orderNow;

// Checkout redirect
function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty 😢");
  } else {
    window.location.href = "payment.html";
    return true;
  }
}
window.checkout = checkout;

// Toast Notification
function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.style.cssText = "position:fixed; bottom:20px; right:20px; background:#28a745; color:#fff; padding:10px 20px; border-radius:5px; z-index:9999; display:none;";
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.style.display = "block";
  setTimeout(() => { toast.style.display = "none"; }, 3000);
}

// Database function (Mock for now, can be connected to Firebase)
async function saveOrderToDB(orderData) {
  console.log("Saving order to DB:", orderData);
  // To connect Firebase:
  // 1. Add Firebase SDK to your HTML
  // 2. Use db.collection('orders').add(orderData)
  
  // For now, we simulate a database save by storing in another localStorage key for "admin" view
  let orders = JSON.parse(localStorage.getItem("all_orders")) || [];
  orders.push(orderData);
  localStorage.setItem("all_orders", JSON.stringify(orders));
  
  return true;
}

// Global window load
window.addEventListener("load", () => {
  updateCartUI();
  if (document.getElementById("cart-container")) loadCartPage();
  if (document.getElementById("live-cart-items")) loadLiveCart();
});

// --- Search Filter Logic ---
function filterMenu() {
  const input = document.getElementById("menuSearch");
  const resultsDiv = document.getElementById("searchResults");
  if (!input || !resultsDiv) return;
  
  const filter = input.value.toLowerCase();
  const menuItems = document.querySelectorAll(".col-md-4"); // Grid items
  
  resultsDiv.innerHTML = ""; // Clear suggestions

  if (filter === "") {
    resultsDiv.style.display = "none";
    menuItems.forEach(item => item.style.display = "");
    return;
  }

  let foundCount = 0;
  menuItems.forEach(item => {
    const titleEl = item.querySelector(".card-title");
    const imgEl = item.querySelector("img");
    const priceEl = item.querySelector(".text-warning.fw-bold");

    if (titleEl) {
      const name = titleEl.innerText;
      const img = imgEl ? imgEl.src : "";
      const price = priceEl ? priceEl.innerText : "";

      if (name.toLowerCase().includes(filter)) {
        item.style.display = "";
        foundCount++;

        // Add to suggestions dropdown
        const resultItem = document.createElement("div");
        resultItem.className = "search-result-item";
        resultItem.innerHTML = `
          <img src="${img}" alt="${name}">
          <div class="text-start">
            <div class="fw-bold text-white">${name}</div>
            <div class="small text-warning">${price}</div>
          </div>
        `;
        resultItem.onclick = () => {
          item.scrollIntoView({ behavior: "smooth", block: "center" });
          input.value = name;
          resultsDiv.style.display = "none";
          
          // Highlight effect
          item.style.transition = "0.5s";
          item.style.boxShadow = "0 0 30px #ffc107";
          setTimeout(() => item.style.boxShadow = "none", 2000);
        };
        resultsDiv.appendChild(resultItem);
      } else {
        item.style.display = "none";
      }
    }
  });

  resultsDiv.style.display = foundCount > 0 ? "block" : "none";
}
window.filterMenu = filterMenu;

// Close search suggestions when clicking outside
document.addEventListener("click", (e) => {
  const resultsDiv = document.getElementById("searchResults");
  const searchInput = document.getElementById("menuSearch");
  if (resultsDiv && e.target !== searchInput) {
    resultsDiv.style.display = "none";
  }
});
