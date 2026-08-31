const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

registerForm.addEventListener("submit", (event) => {
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

    // Check passwords match
    if (password !== confirmPassword) {
        registerMessage.textContent = "Passwords do not match.";
        registerMessage.style.color = "red";
        return;
    }

  
    let users = JSON.parse(localStorage.getItem("users")) || [];

   
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        registerMessage.textContent = "An account with this email already exists.";
        registerMessage.style.color = "red";
        return;
    }

    const newUser = {
        name: name,
        email: email,
        password: password
    };

    users.push(newUser);

    // Save user
    localStorage.setItem("users", JSON.stringify(users));

    registerMessage.textContent = "Account created successfully!";
    registerMessage.style.color = "green";

    // Clear form
    registerForm.reset();
});