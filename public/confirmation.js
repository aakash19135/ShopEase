const orderData = JSON.parse(localStorage.getItem("lastOrder"));

const orderId = document.getElementById("orderId");
const orderDate = document.getElementById("orderDate");
const orderStatus = document.getElementById("orderStatus");
const confirmationItems = document.getElementById("confirmationItems");
const orderTotal = document.getElementById("orderTotal");
const continueButton = document.getElementById("continueButton");
const continueShoppingButton = document.getElementById("continueShoppingButton");

if (!orderData) {
    confirmationItems.innerHTML = "<p>No recent order found.</p>";
} else {
    orderId.textContent = orderData.orderId;
    orderDate.textContent = orderData.orderDate;
    orderStatus.textContent = orderData.status;
    orderTotal.textContent = orderData.total.toLocaleString("en-IN");

    orderData.products.forEach(product => {
        const item = document.createElement("div");

        item.className = "confirmation-item";

        item.innerHTML = `
            <div>
                <h3>${product.name}</h3>
                <p>Quantity: ${product.quantity}</p>
            </div>
            <strong>₹${(product.price * product.quantity).toLocaleString("en-IN")}</strong>
        `;

        confirmationItems.appendChild(item);
    });
}

continueButton.addEventListener("click", () => {
    window.location.href = "index.html";
});

continueShoppingButton.addEventListener("click", () => {
    window.location.href = "index.html";
});