const products = {
    smartphone: {
        name: "Smartphone",
        category: "Electronics",
        description: "Latest generation smartphone",
        price: 29999,
        image: "📱"
    },
    laptop: {
        name: "Laptop",
        category: "Electronics",
        description: "Powerful laptop for everyday use",
        price: 59999,
        image: "💻"
    },
    tshirt: {
        name: "Casual T-Shirt",
        category: "Fashion",
        description: "Comfortable cotton t-shirt",
        price: 799,
        image: "👕"
    },
    chair: {
        name: "Office Chair",
        category: "Home & Living",
        description: "Comfortable ergonomic chair",
        price: 4999,
        image: "🪑"
    },
    book: {
        name: "Programming Book",
        category: "Books",
        description: "Learn programming fundamentals",
        price: 599,
        image: "📚"
    },
    headphones: {
        name: "Wireless Headphones",
        category: "Electronics",
        description: "Immersive wireless audio",
        price: 2499,
        image: "🎧"
    }
};

const params = new URLSearchParams(window.location.search);
const productId = params.get("product") || "smartphone";
const product = products[productId];

if (product) {
    document.getElementById("productImage").textContent = product.image;
    document.getElementById("productCategory").textContent = product.category;
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productDescription").textContent = product.description;
    document.getElementById("productPrice").textContent =
        `₹${product.price.toLocaleString("en-IN")}`;
}

document.getElementById("addToCartButton").addEventListener("click", () => {
    const quantity = Number(document.getElementById("quantity").value);

    if (quantity < 1) {
        alert("Quantity must be at least 1.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Product added to cart.");
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const count = cart.reduce(
        (total, product) => total + product.quantity,
        0
    );

    document.getElementById("cartCount").textContent = count;
}

document.getElementById("cartButton").addEventListener("click", () => {
    window.location.href = "/#cartSection";
});

updateCartCount();