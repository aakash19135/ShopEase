const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            loginMessage.textContent = data.message;
            loginMessage.style.color = "red";
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(data.user));

        loginMessage.textContent = "Login successful!";
        loginMessage.style.color = "green";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 500);
    } catch (error) {
        console.error("Login error:", error);
        loginMessage.textContent = "Something went wrong. Please try again.";
        loginMessage.style.color = "red";
    }
});