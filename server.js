const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
require("dotenv").config();
const app = express();
app.use(express.json());

const PORT = 3000;
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err);
        return;
    }

    console.log("Connected to MySQL successfully!");
});

app.use(express.static("public"));
app.post("/api/register", async (req, res) => {
   const { name, email, password } = req.body;

if (!name || !email || !password || name.trim() === "" || email.trim() === "" || password.trim() === "") {
    return res.status(400).json({
        message: "Name, email and password are required"
    });
}

if (password.length < 6) {
    return res.status(400).json({
        message: "Password must be at least 6 characters"
    });
}

try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

        db.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        message: "An account with this email already exists."
                    });
                }

                console.error("Registration failed:", err);
                return res.status(500).json({
                    message: "Registration failed"
                });
            }

            res.json({
                message: "Registration successful"
            });
        });
    } catch (error) {
        console.error("Password hashing failed:", error);
        res.status(500).json({
            message: "Registration failed"
        });
    }
});
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(400).json({
        message: "Email and password are required"
    });
}

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error("Login failed:", err);
            return res.status(500).json({
                message: "Login failed"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = results[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.json({
            message: "Login successful"
        });
    });
});
app.listen(PORT, () => {
    console.log(`ShopEase server is running on http://localhost:${PORT}`);
});
