const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password.length < 6) {
        registerMessage.textContent = "Password must be at least 6 characters.";
        registerMessage.style.color = "red";
        return;
    }

    if (password !== confirmPassword) {
        registerMessage.textContent = "Passwords do not match.";
        registerMessage.style.color = "red";
        return;
    }

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            registerMessage.textContent = data.message;
            registerMessage.style.color = "red";
            return;
        }

        registerMessage.textContent = "Account created successfully!";
        registerMessage.style.color = "green";

        registerForm.reset();
        setTimeout(() => {
            window.location.href = "http://localhost:3000/index.html";
        }, 1000);

    } catch (error) {
        console.error("Registration error:", error);
        registerMessage.textContent = "Unable to connect to server.";
        registerMessage.style.color = "red";
    }
});