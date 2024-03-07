DROP DATABASE IF EXISTS hms;
CREATE DATABASE hms;
USE hms;
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
   Gender ENUM('Erkek', 'Kadın', 'Diğer'),
   DepartmentID INT,
   FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);
CREATE TABLE Appointments (
   AppointmentID VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
   PatientID VARCHAR(36),
   DoctorID INT,
   AppointmentDate DATE,
   FOREIGN KEY (PatientID) REFERENCES Patients(PatientID),
   FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
);
CREATE TABLE Prescriptions (
    PrescriptionID VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    PatientID VARCHAR(36),
    DoctorID INT,
    PrescriptionDate DATE,
    Medication VARCHAR(255),
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
);
CREATE TABLE PatientDoctor (
    VisitID INT AUTO_INCREMENT PRIMARY KEY,
	PatientID VARCHAR(36),  
    DoctorID INT,
    VisitDate DATE,
    UNIQUE KEY (PatientID, DoctorID),
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
);
ALTER TABLE Appointments
ADD CONSTRAINT fk_doctor_appointment FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID),
ADD CONSTRAINT fk_patient_appointment FOREIGN KEY (PatientID) REFERENCES Patients(PatientID);

-- Insert patients
INSERT INTO Patients (patientID, firstName, lastName, dateOfBirth, gender, address, phoneNumber, email)
VALUES 
  (UUID(), 'Ahmet', 'Yılmaz', '1990-01-15', 'Erkek', 'Ankara', '555-1234', 'ahmet.yilmaz@example.com'),
  (UUID(), 'Ayşe', 'Kaya', '1992-05-20', 'Kadın', 'İstanbul', '555-5678', 'ayse.kaya@example.com'),
  (UUID(), 'Mehmet', 'Öztürk', '1985-08-12', 'Erkek', 'İzmir', '555-9101', 'mehmet.ozturk@example.com');

-- Insert Turkish departments
INSERT INTO Departments (departmentID, departmentName)
VALUES 
  (1, 'Dahiliye'),
  (2, 'Cerrahi');
  

-- Insert Turkish doctors
INSERT INTO Doctors (firstName, lastName, gender, departmentID)
VALUES 
  ('Fatma', 'Demir', 'Kadın', 1),
  ('Ali', 'Çelik', 'Erkek', 2),
  ('Zeynep', 'Türk', 'Kadın', 1);



  SELECT * FROM Patients;
SELECT * FROM Doctors;
SELECT * FROM Departments;
SELECT * FROM Appointments;
SELECT * FROM Prescriptions;
SELECT * FROM PatientDoctor;



