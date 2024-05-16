const {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");
const {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");
const {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");
const {
  getAllPrescriptions,
  createPrescription,
  updatePrescription,
  deletePrescription,
} = require("../controllers/prescriptionController");
const {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorContoller");

const express = require("express");
const router = express.Router();

//login process
router.get("/login",)

// Patients routes
router.get("/patients", getAllPatients);
router.post("/patients", createPatient);
router.put("/patients", updatePatient);
router.delete("/patients", deletePatient);

// Doctors routes
router.get("/doctors", getAllDoctors);
router.post("/doctors", createDoctor);
router.put("/doctors", updateDoctor);
router.delete("/doctors", deleteDoctor);

// Appointments routes
router.get("/appointments", getAllAppointments);
router.post("/appointments", createAppointment);
router.put("/appointments", updateAppointment);
router.delete("/appointments", deleteAppointment);

// Departments routes
router.get("/departments", getAllDepartments);
router.post("/departments", createDepartment);
router.put("/departments", updateDepartment);
router.delete("/departments", deleteDepartment);

// Prescriptions routes
router.get("/prescriptions", getAllPrescriptions);
router.post("/prescriptions", createPrescription);
router.put("/prescriptions", updatePrescription);
router.delete("/prescriptions", deletePrescription);

module.exports = router;
