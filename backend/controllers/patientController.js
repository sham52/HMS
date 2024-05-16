const pool = require("../config/db");
const { patientSchema } = require("../models/patientModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

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

    const hashedPassword = await bcrypt.hash(password, saltRounds);

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
        hashedPassword,
      ]
    );

    // Create and send the token
    const token = jwt.sign(
      { patientID: result.insertId },
      process.env.TOKEN_SECRET
    );

    res.json({
      message: "Patient created successfully",
      patientID: result.insertId,
      token: token,
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

const loginPatient = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { patientID, password } = req.body;

    // Check if the patient exists
    const patient = await pool.query(
      "SELECT * FROM Patients WHERE patientID = ?",
      [patientID]
    );

    if (patient[0].length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(
      password,
      patient[0][0].password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create and assign a token
    const token = jwt.sign(
      { patientID: patient[0][0].patientID },
      process.env.TOKEN_SECRET
    );
    res.header("auth-token", token).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  getAllPatients,
  deletePatient,
  updatePatient,
  createPatient,
  loginPatient,
};
