const { getAllPatients } = require("../controllers/patientController");
const { getAllAppointments } = require("../controllers/appointmentController");
const { getAllDepartments } = require("../controllers/departmentController");
const {
  getAllPrescriptions,
} = require("../controllers/prescriptionController");
const { getAllDoctors } = require("../controllers/doctorContoller");

const express = require("express");
const router = express.Router();

// Patients routes
router.get("/patients", getAllPatients);

// Doctors routes
router.get("/doctors", getAllDoctors);

// Appointments routes
router.get("/appointments", getAllAppointments);
// Add other routes for appointments as needed
// Departments routes
router.get("/departments", getAllDepartments);
// Add other routes for departments as needed
// Prescriptions routes
router.get("/prescriptions", getAllPrescriptions);
// Add other routes for prescriptions as needed

module.exports = router;
