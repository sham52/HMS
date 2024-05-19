const pool = require("../config/db");
const { pharmacistSchema } = require("../models/pharmacistModel");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

async function createPharmacist(req, res) {
  try {
    const { error } = pharmacistSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const {
      pharmacistID,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      phoneNumber,
      password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Insert new pharmacist into the database
    let query =
      "INSERT INTO Pharmacists (pharmacistID, firstName, lastName, dateOfBirth, gender, email, phoneNumber, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    let values = [
      pharmacistID,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      phoneNumber,
      hashedPassword,
    ];

    const result = await pool.query(query, values);

    // Create and send the token
    const token = jwt.sign(
      { pharmacistID: result.insertId },
      process.env.TOKEN_SECRET
    );

    res.json({
      message: "Pharmacist created successfully",
      pharmacistID: pharmacistID,
      userType: "Pharmacist",
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function updatePharmacist(req, res) {
  try {
    const pharmacist = req.body;
    pharmacist.pharmacistID = req.params.id;
    console.log(pharmacist);
    const { error } = pharmacistSchema.validate(pharmacist);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { pharmacistID, firstName, lastName, email, phoneNumber, password } =
      pharmacist;
    // Update the pharmacist in the database
    await pool.query(
      "UPDATE Pharmacists SET firstName = ?, lastName = ?, email = ?, phoneNumber = ?, password = ? WHERE pharmacistID = ?",
      [firstName, lastName, email, phoneNumber, password, pharmacistID]
    );
    res.json({ message: "Pharmacist updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function deletePharmacist(req, res) {
  try {
    const { id } = req.params;
    // Delete the pharmacist from the database
    await pool.query("DELETE FROM Pharmacists WHERE pharmacistID = ?", [id]);
    res.json({ message: "Pharmacist deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function getAllPharmacists(req, res) {
  try {
    const pharmacists = await pool.query("SELECT * FROM Pharmacists");
    res.json(pharmacists[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  getAllPharmacists,
  updatePharmacist,
  deletePharmacist,
  createPharmacist,
};
