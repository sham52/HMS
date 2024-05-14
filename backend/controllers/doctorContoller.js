const pool = require("../config/db");
const { doctorSchema } = require("../models/doctorModel");

async function createDoctor(req, res) {
  try {
    const { error } = doctorSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { firstName, lastName, gender, departmentID } = req.body;
    // Insert new doctor into the database
    const result = await pool.query(
      "INSERT INTO Doctors (firstName, lastName, gender, departmentID) VALUES (?, ?, ?, ?)",
      [firstName, lastName, gender, departmentID]
    );
    res.json({
      message: "Doctor created successfully",
      doctorID: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}
async function updateDoctor(req, res) {
  try {
    const { doctorID } = req.params;
    const { error } = doctorSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { firstName, lastName, gender, departmentID } = req.body;
    // Update the doctor in the database
    await pool.query(
      "UPDATE Doctors SET firstName = ?, lastName = ?, gender = ?, departmentID = ? WHERE doctorID = ?",
      [firstName, lastName, gender, departmentID, doctorID]
    );
    res.json({ message: "Doctor updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function deleteDoctor(req, res) {
  try {
    const { doctorID } = req.params;
    // Delete the doctor from the database
    await pool.query("DELETE FROM Doctors WHERE doctorID = ?", [doctorID]);
    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}
async function getAllDoctors(req, res) {
  try {
    const doctors = await pool.query("SELECT * FROM Doctors");
    res.json(doctors[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { deleteDoctor, updateDoctor, getAllDoctors, createDoctor };
