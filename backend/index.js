const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("./db/db");

dotenv.config();

const app = express();
app.use(express.json());

// Register endpoint
app.post("/api/register", async (req, res) => {
  const {
    nationalID,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    address,
    phoneNumber,
    email,
    password,
  } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Insert the user into the database
    await db.query(
      "INSERT INTO Users (nationalID, firstName, lastName, dateOfBirth, gender, address, phoneNumber, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nationalID,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        email,
        hashedPassword,
      ]
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).send("Error registering user");
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { nationalID, password } = req.body;

  try {
    // Retrieve the user from the database
    const results = await db.query("SELECT * FROM Users WHERE nationalID = ?", [
      nationalID,
    ]);

    // Check if user exists
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(
      password,
      results[0].password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { nationalID: results[0].nationalID },
      process.env.JWT_SECRET
    );
    res.json({ token });
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(500).send("Error logging in");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
