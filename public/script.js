const loggedInUser = localStorage.getItem("loggedInUser");

const loginButton = document.getElementById("loginButton");

if (loginButton) {
    if (loggedInUser) {
        loginButton.textContent = "Logout";

        loginButton.addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            window.location.href = "login.html";
        });
    } else {
        loginButton.textContent = "Login";

        loginButton.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    }
}
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCountElement = document.getElementById("cartCount");
const cartContainer = document.getElementById("cartContainer");
const cartTotalElement = document.getElementById("cartTotal");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const categoryFilter = document.getElementById("categoryFilter");
const productCards = document.querySelectorAll(".product-card");

document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {
        const productCard = button.closest(".product-card");
        const name = productCard.querySelector("h3").textContent;
        const priceText = productCard.querySelector("strong").textContent;
        const price = Number(priceText.replace(/[₹,]/g, ""));

        const existingProduct = cart.find(product => product.name === name);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();
    });
});

function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    cartCountElement.textContent = cart.reduce(
        (total, product) => total + product.quantity,
        0
    );

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p id="emptyCartMessage">Your cart is empty.</p>';
        cartTotalElement.textContent = "0";
        return;
    }

    cart.forEach((product, index) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <h3>${product.name}</h3>
                <p>₹${product.price.toLocaleString("en-IN")}</p>
            </div>

            <div class="quantity-controls">
                <button class="decrease" data-index="${index}">−</button>
                <span>${product.quantity}</span>
                <button class="increase" data-index="${index}">+</button>
            </div>

            <strong>₹${(product.price * product.quantity).toLocaleString("en-IN")}</strong>

            <button class="remove-product" data-index="${index}">Remove</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    const total = cart.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
    );

    cartTotalElement.textContent = total.toLocaleString("en-IN");

    document.querySelectorAll(".increase").forEach(button => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.index);
            cart[index].quantity++;
            updateCart();
        });
    });

    document.querySelectorAll(".decrease").forEach(button => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.index);

            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }

            updateCart();
        });
    });

    document.querySelectorAll(".remove-product").forEach(button => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.index);
            cart.splice(index, 1);
            updateCart();
        });
    });
}
function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    let matchFound = false;

    productCards.forEach(card => {
        const productName = card.querySelector("h3").textContent.toLowerCase();
        const productDescription = card.querySelector("p").textContent.toLowerCase();
        const cardCategory = card.dataset.category;

        const matchesSearch =
            productName.includes(searchTerm) ||
            productDescription.includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            cardCategory === selectedCategory;

        const shouldDisplay = matchesSearch && matchesCategory;

        card.style.display = shouldDisplay ? "block" : "none";

        if (shouldDisplay) {
            matchFound = true;
        }
    });

    let noResultsMessage = document.getElementById("noResultsMessage");

    if (!matchFound && searchTerm !== "") {
        if (!noResultsMessage) {
            noResultsMessage = document.createElement("p");
            noResultsMessage.id = "noResultsMessage";
            noResultsMessage.textContent = "No products found.";
            document.querySelector(".products-section").appendChild(noResultsMessage);
        }
    } else if (noResultsMessage) {
        noResultsMessage.remove();
    }
}

searchButton.addEventListener("click", applyFilters);

categoryFilter.addEventListener("change", applyFilters);

document.getElementById("shopNowButton").addEventListener("click", () => {
    document.querySelector(".products-section").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("cartButton").addEventListener("click", () => {
    document.getElementById("cartSection").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("continueShoppingButton").addEventListener("click", () => {
    document.querySelector(".products-section").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("checkoutButton").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    window.location.href = "checkout.html";
});

updateCart();