const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("./db/db");
const patientModel = require("./models/patientModel");

dotenv.config();

const app = express();
app.use(express.json());

// Register endpoint
app.post("/api/register", async (req, res) => {
  const {
    patientID,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    password,
  } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Insert the user into the database
    await db.query(
      "INSERT INTO Patients (patientID, firstName, lastName, dateOfBirth, gender, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        patientID,
        firstName,
        lastName,
        dateOfBirth,
        gender,
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
  const { patientID, password } = req.body;

  try {
    // Retrieve the user from the database
    const results = await db.query(
      "SELECT * FROM Patients WHERE patientID = ?",
      [patientID]
    );

    // Check if user exists
    if (results[0][0].length === 0) {
      return res.status(401).json({ message: "User does not exist" });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(
      password,
      results[0][0].password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }
    // Generate JWT token
    const token = jwt.sign(
      { patientID: results[0][0].patientID },
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
