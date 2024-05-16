const pool = require("../config/db");
const { patientSchema } = require("../models/patientModel.js");

const createPatient = async (req, res) => {
  try {
    const { error } = patientSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const {
      patientID,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      phoneNumber,
      password,
    } = req.body;

    // Insert new patient into the database
    const result = await pool.query(
      "INSERT INTO Patients (patientID, firstName, lastName, dateOfBirth, gender, email, phoneNumber, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        patientID,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        email,
        phoneNumber,
        password,
      ]
    );

    res.json({
      message: "Patient created successfully",
      patientID: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

async function updatePatient(req, res) {
  try {
    const { patientID } = req.params;
    const { error } = patientSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      phoneNumber,
      password,
    } = req.body;
    // Update the patient in the database
    await pool.query(
      "UPDATE Patients SET firstName = ?, lastName = ?, dateOfBirth = ?, gender = ?, email = ?, phoneNumber = ?, password = ? WHERE patientID = ?",
      [
        firstName,
        lastName,
        dateOfBirth,
        gender,
        email,
        phoneNumber,
        password,
        patientID,
      ]
    );
    res.json({ message: "Patient updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function deletePatient(req, res) {
  try {
    const { patientID } = req.params;
    // Delete the patient from the database
    await pool.query("DELETE FROM Patients WHERE patientID = ?", [patientID]);
    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function getAllPatients(req, res) {
  try {
    const patients = await pool.query("SELECT * FROM Patients");
    res.json(patients[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  getAllPatients,
  deletePatient,
  updatePatient,
  createPatient,
};
