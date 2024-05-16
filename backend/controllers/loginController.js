const bcrypt = require("bcrypt");
const { doctorSchema } = require("../models/doctorModel");
const { pharmacistSchema } = require("../models/pharmacistModel");
const { patientSchema } = require("../models/patientModel");

const loginUser = async (req, res) => {
  const { error, value } = doctorSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { id, password } = value;

  try {
    let user;
    let userType;
    console.log("ID: ", id);

    // Check if the ID exists in Doctors table
    user = await Doctors.findOne({ where: { id } });
    userType = "Doctor";

    if (!user) {
      // Check if the ID exists in Pharmacists table
      user = await Pharmacists.findOne({ where: { id } });
      userType = "Pharmacist";
    }

    if (!user) {
      // Check if the ID exists in Patients table
      user = await Patients.findOne({ where: { id } });
      userType = "Patient";
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Password is correct, return user type or any other necessary data
    return res.status(200).json({ userType });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { loginUser };
