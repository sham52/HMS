const {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientData,
} = require("../controllers/patientController");
const {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentData,
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

const {
  getAllPharmacists,
  createPharmacist,
  updatePharmacist,
  deletePharmacist,
} = require("../controllers/pharmacistController");
const { loginUser } = require("../controllers/loginController");

const express = require("express");
const router = express.Router();

//login process
router.post("/login", loginUser);

// Patients routes
router.get("/patients", getAllPatients);
router.post("/patients", createPatient);
router.put("/patients/:id", updatePatient); // Added :id
router.delete("/patients/:id", deletePatient); // Added :id
router.get("/patients/:id", getPatientData);

// Doctors routes
router.get("/doctors", getAllDoctors);
router.post("/doctors", createDoctor);
router.put("/doctors/:id", updateDoctor); // Added :id
router.delete("/doctors/:id", deleteDoctor); // Added :id

// Appointments routes
router.get("/appointments", getAllAppointments);
router.post("/appointments", createAppointment);
router.put("/appointments/:id", updateAppointment); // Added :id
router.delete("/appointments/:id", deleteAppointment); // Added :id
router.get("/appointments/:id", getAppointmentData);

// Departments routes
router.get("/departments", getAllDepartments);
router.post("/departments", createDepartment);
router.put("/departments/:id", updateDepartment); // Added :id
router.delete("/departments/:id", deleteDepartment); // Added :id

// Prescriptions routes
router.get("/prescriptions", getAllPrescriptions);
router.post("/prescriptions", createPrescription);
router.put("/prescriptions/:id", updatePrescription); // Added :id
router.delete("/prescriptions/:id", deletePrescription);

router.get("/pharmacists", getAllPharmacists);
router.post("/pharmacists", createPharmacist);
router.put("/pharmacists/:id", updatePharmacist);
router.delete("/pharmacists/:id", deletePharmacist);

module.exports = router;
