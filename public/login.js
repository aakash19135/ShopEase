const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        user => user.email === email && user.password === password
    );

    if (!user) {
        loginMessage.textContent = "Invalid email or password.";
        loginMessage.style.color = "red";
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify({
        name: user.name,
        email: user.email
    }));

    loginMessage.textContent = "Login successful!";
    loginMessage.style.color = "green";

    setTimeout(() => {
        window.location.href = "/";
    }, 500);
});