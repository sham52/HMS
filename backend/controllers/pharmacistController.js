const pool = require("../config/db");
const { pharmacistSchema } = require("../models/pharmacistModel");

const bcrypt = require("bcrypt");
const saltRounds = 10;

async function createPharmacist(req, res) {
  try {
    const { error } = pharmacistSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    // Insert new pharmacist into the database
    const result = await pool.query(
      "INSERT INTO Pharmacists (firstName, lastName, email, phoneNumber, password) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, email, phoneNumber, password]
    );
    res.json({
      message: "Pharmacist created successfully",
      pharmacistID: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function updatePharmacist(req, res) {
  try {
    const { pharmacistID } = req.params;
    const { error } = pharmacistSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { firstName, lastName, email, phoneNumber, password } = req.body;
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
    const { pharmacistID } = req.params;
    // Delete the pharmacist from the database
    await pool.query("DELETE FROM Pharmacists WHERE pharmacistID = ?", [
      pharmacistID,
    ]);
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
