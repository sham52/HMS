const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const { doctorSchema } = require("../models/doctorModel");
const { pharmacistSchema } = require("../models/pharmacistModel");
const { patientSchema } = require("../models/patientModel");

const loginUser = async (req, res) => {
  console.log("LOGIN USER WORKS");
  const { id, password } = req.body;

  try {
    let fullName;
    let userType;
    let userID;

    const [patient] = await pool.query(
      "SELECT * FROM Patients WHERE patientID = ?",
      [id]
    );
    if (patient.length > 0) {
      const dbPatientId = patient[0].patientID;
      if (id === dbPatientId) {
        userType = "Patient";
        fullName = patient[0].firstName + " " + patient[0].lastName;
        userID = patient[0].patientID;
        const hashedPassword = patient[0].password;

        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        if (passwordMatch) {
          console.log("Password matched");

          // Create and send the token
          const token = jwt.sign(
            { patientID: userID },
            process.env.TOKEN_SECRET
          );

          res.json({
            message: "Patient logged in successfully",
            patientID: userID,
            userType: userType,
            fullName: fullName,
            token: token,
          });
        } else {
          console.log("Passwords does not match");
          res.status(401).json({
            message: "Password does not match",
          });
        }
      }
    }

    const [doctor] = await pool.query(
      "SELECT * FROM Doctors WHERE doctorID = ?",
      [id]
    );
    if (doctor.length > 0) {
      const dbDoctorId = patient[0].doctorID;
      if (id === dbDoctorId) {
        userType = "Doctor";
        fullName = doctor[0].firstName + " " + doctor[0].lastName;
        userID = doctor[0].patientID;
      }
    }

    const [pharmacist] = await pool.query(
      "SELECT * FROM Pharmacists WHERE pharmacistID = ?",
      [id]
    );
    if (pharmacist.length > 0) {
      const dbPharmacistId = patient[0].pharmacist;
      if (id === dbPharmacistId) {
        userType = "Pharmacist";
        fullName = pharmacist[0].firstName + " " + pharmacist[0].lastName;
        userID = pharmacist[0].pharmacistID;
      }
    }

    console.log("ID: ", id);
    console.log("Password: ", password);
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { loginUser };
