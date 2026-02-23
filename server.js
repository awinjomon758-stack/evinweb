const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Contact Route
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const newMessage = `
----------------------------
Name: ${name}
Email: ${email}
Message: ${message}
Date: ${new Date().toLocaleString()}
----------------------------
`;

    fs.appendFile("messages.txt", newMessage, (err) => {
        if (err) {
            return res.status(500).json({ message: "Error saving message" });
        }

        res.json({ message: "Message sent successfully!" });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});