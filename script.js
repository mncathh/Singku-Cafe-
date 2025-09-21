const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");
let total = 0;

document.querySelectorAll(".menu-card button").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".menu-card");
    const itemName = card.querySelector("h3").textContent;
    const itemPrice = parseInt(card.querySelector("span").textContent.replace("₱", ""));

    // Add item to cart list
    const li = document.createElement("li");
    li.textContent = `${itemName} - ₱${itemPrice}`;
    cartItems.appendChild(li);

    // Update total
    total += itemPrice;
    totalDisplay.textContent = total;
  });
});

document.getElementById("checkout").addEventListener("click", () => {
  if (total === 0) {
    alert("Your cart is empty!");
  } else {
    alert(`Thank you for your order! Your total is ₱${total}.`);
    cartItems.innerHTML = "";
    total = 0;
    totalDisplay.textContent = total;
  }
});

// ====== SEARCH, FILTER & SORT ======
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");
const menuItems = document.querySelector(".menu-items");

// Function to filter and sort menu
function updateMenu() {
  let searchValue = searchInput.value.toLowerCase();
  let filterValue = filterSelect.value;
  let sortValue = sortSelect.value;

  // Get all cards
  let cards = Array.from(document.querySelectorAll(".menu-card"));

  // Filter by search + category
  cards.forEach((card) => {
    let name = card.querySelector("h3").textContent.toLowerCase();
    let category = card.getAttribute("data-category");

    let matchSearch = name.includes(searchValue);
    let matchCategory = filterValue === "all" || category === filterValue;

    if (matchSearch && matchCategory) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  // Sort by price
  let visibleCards = cards.filter((card) => card.style.display !== "none");

  if (sortValue === "price-low") {
    visibleCards.sort(
      (a, b) =>
        parseInt(a.getAttribute("data-price")) -
        parseInt(b.getAttribute("data-price"))
    );
  } else if (sortValue === "price-high") {
    visibleCards.sort(
      (a, b) =>
        parseInt(b.getAttribute("data-price")) -
        parseInt(a.getAttribute("data-price"))
    );
  }

  // Re-append sorted cards
  visibleCards.forEach((card) => menuItems.appendChild(card));
}

// Event listeners
searchInput.addEventListener("input", updateMenu);
filterSelect.addEventListener("change", updateMenu);
sortSelect.addEventListener("change", updateMenu);

// ====== TAG-BASED RATING FUNCTION ======
function selectTag(tag) {
  document.querySelectorAll(".tag-rating span").forEach((el) => {
    el.classList.remove("selected");
  });
  tag.classList.add("selected");
  document.getElementById("rating").value = tag.textContent;
}

// ====== STAR RATING FUNCTION ======
function setRating(rating) {
  const stars = document.querySelectorAll(".star-rating span");
  stars.forEach((star, index) => {
    star.classList.toggle("active", index < rating);
  });
  document.getElementById("star-rating").value = rating;
}

// ====== FEEDBACK FORM SUBMISSION ======
function showModal(message) {
  document.getElementById("modal-message").textContent = message;
  document.getElementById("confirmation-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("confirmation-modal").style.display = "none";
}

// Feedback form
// Feedback form
const feedbackForm = document.getElementById("feedback-form");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show confirmation text
    const message = document.getElementById("feedback-message");
    message.textContent = "✅ Thank you for your feedback!";
    message.style.display = "block";

    // Reset form and stars
    feedbackForm.reset();
    document.querySelectorAll(".star-rating span").forEach((star) =>
      star.classList.remove("active")
    );
  });
}

// Concern form
const concernForm = document.getElementById("concern-form");
if (concernForm) {
  concernForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show confirmation text
    const message = document.getElementById("concern-message");
    message.textContent = "📩 Thank you for reaching out! We’ll get back to you shortly.";
    message.style.display = "block";

    // Reset form
    concernForm.reset();
  });
}


