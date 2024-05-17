const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const { doctorSchema } = require("../models/doctorModel");
const { pharmacistSchema } = require("../models/pharmacistModel");
const { patientSchema } = require("../models/patientModel");

const loginUser = async (req, res) => {
  console.log("LOGIN USER WORKS");
  const { id, password } = req.body;
  
  console.log("Checking database for patient with ID:", id);

  try {
    let fullName;
    let userType;
    let userID;

    const [patientRows] = await pool.query(
      "SELECT patientID, firstName, lastName, password FROM Patients WHERE patientID = ?",
      [id]
    );
    console.log("PATIENT DATA: ", patientRows);

    if (patientRows.length > 0) {
      const patient = patientRows[0];
      const dbPatientId = patient.patientID;
      if (id === dbPatientId) {
        userType = "Patient";
        fullName = `${patient.firstName} ${patient.lastName}`;
        userID = patient.patientID;
        const hashedPassword = patient.password;
        console.log(fullName)

        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        if (passwordMatch) {
          console.log("Password matched");

          // Create and send the token
          const token = jwt.sign(
            { patientID: userID },
            process.env.TOKEN_SECRET
          );

          return res.json({
            message: "Patient logged in successfully",
            patientID: userID,
            userType: userType,
            fullName: fullName,
            token: token,
          });
        } else {
          console.log("Passwords does not match");
          return res.status(401).json({
            message: "Password does not match",
          });
        }
      }
    } else {
      console.log("Patient not found");
      return res.status(404).json({
        message: "Patient not found",
      });
    }
  } catch (error) {
    console.error("Error logging in user: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
// const [doctor] = await pool.query(
//   "SELECT * FROM Doctors WHERE doctorID = ?",
//   [id]
// );
// if (doctor.length > 0) {
//   const dbDoctorId = doctor[0].doctorID;
//   if (id === dbDoctorId) {
//     userType = "Doctor";
//     fullName = doctor[0].firstName + " " + doctor[0].lastName;
//     userID = doctor[0].doctorID;
//     const hashedPassword = doctor[0].password;
//     const passwordMatch = await bcrypt.compare(password, hashedPassword);
//     if (passwordMatch) {
//       console.log("Password matched");

//       // Create and send the token
//       const token = jwt.sign(
//         { doctorID: userID },
//         process.env.TOKEN_SECRET
//       );

//       return res.json({
//         message: "Doctor logged in successfully",
//         doctorID: userID,
//         userType: userType,
//         fullName: fullName,
//         token: token,
//       });
//     } else {
//       console.log("Passwords does not match");
//       return res.status(401).json({
//         message: "Password does not match",
//       });
//     }
//   }
// }

// const [pharmacist] = await pool.query(
//   "SELECT * FROM Pharmacists WHERE pharmacistID = ?",
//   [id]
// );
// if (pharmacist.length > 0) {
//   const dbPharmacistId = patient[0].pharmacist;
//   if (id === dbPharmacistId) {
//     userType = "Pharmacist";
//     fullName = pharmacist[0].firstName + " " + pharmacist[0].lastName;
//     userID = pharmacist[0].pharmacistID;
//     const hashedPassword = pharmacist[0].password;
//     const passwordMatch = await bcrypt.compare(password, hashedPassword);
//     if (passwordMatch) {
//       console.log("Password matched");

//       // Create and send the token
//       const token = jwt.sign(
//         { pharmacistID: userID },
//         process.env.TOKEN_SECRET
//       );

//       return res.json({
//         message: "Pharmacist logged in successfully",
//         pharmacistID: userID,
//         userType: userType,
//         fullName: fullName,
//         token: token,
//       });
//     } else {
//       console.log("Passwords does not match");
//       return res.status(401).json({
//         message: "Password does not match",
//       });
//     }
//     }
//   }

//   console.log("ID: ", id);
//   console.log("Password: ", password);

module.exports = { loginUser };
