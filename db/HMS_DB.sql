CREATE TABLE Patients (
	patientID VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    dateOfBirth DATE,
    gender ENUM('Erkek', 'Kadın', 'Diğer'),
    address VARCHAR(255),
	phoneNumber VARCHAR(255),
    email VARCHAR(255)
);
CREATE TABLE Departments(
  DepartmentID INT AUTO_INCREMENT PRIMARY KEY,
   DepartmentName VARCHAR(255)
);
CREATE TABLE Doctors (
   DoctorID INT AUTO_INCREMENT PRIMARY KEY,
   FirstName VARCHAR(255),
   LastName VARCHAR(255),
   Gender ENUM('Male', 'Female', 'Other'),
   DepartmentID INT,
   FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);
CREATE TABLE Appointments (
   AppointmentID VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
   PatientID INT,
   DoctorID INT,
   AppointmentDate DATE,
   FOREIGN KEY (PatientID) REFERENCES Patients(PatientID),
   FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
);
CREATE TABLE Prescriptions (
    PrescriptionID VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    PatientID INT,
    DoctorID INT,
    PrescriptionDate DATE,
    Medication VARCHAR(255),
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
);
