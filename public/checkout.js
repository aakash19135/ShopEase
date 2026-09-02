const cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");
const placeOrderButton = document.getElementById("placeOrderButton");
const customerForm = document.getElementById("customerForm");

let total = 0;

if (cart.length === 0) {
    checkoutItems.innerHTML = "<p>Your cart is empty.</p>";
    placeOrderButton.disabled = true;
} else {
    cart.forEach(product => {
        const item = document.createElement("div");
        item.className = "checkout-item";

        item.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <p>Quantity: ${product.quantity}</p>
            <p>Subtotal: ₹${product.price * product.quantity}</p>
            <hr>
        `;

        checkoutItems.appendChild(item);

        total += product.price * product.quantity;
    });

    checkoutTotal.textContent = total.toLocaleString("en-IN");
}

placeOrderButton.addEventListener("click", () => {

    if (!customerForm.reportValidity()) {
        return;
    }
    const orderId = "SE" + Date.now();

    const customer = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        pincode: document.getElementById("pincode").value
    };

  
    const order = {
        orderId: orderId,
        customer: customer,
        products: cart,
        total: total,
        orderDate: new Date().toLocaleString("en-IN"),
        status: "Order Placed"
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));

    localStorage.removeItem("cart");

    window.location.href = "confirmation.html";
});