-- DROP DATABASE IF EXISTS hms;
-- CREATE DATABASE hms;
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

CREATE TABLE Departments (
    departmentID INT AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(255)
);

CREATE TABLE Doctors (
    doctorID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    gender ENUM('Erkek', 'Kadın', 'Diğer'),
    departmentID INT,
    FOREIGN KEY (departmentID) REFERENCES Departments(departmentID)
);

CREATE TABLE Appointments (
    appointmentID VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    patientID VARCHAR(36),
    doctorID INT,
    appointmentDate DATE,
    FOREIGN KEY (patientID) REFERENCES Patients(patientID),
    FOREIGN KEY (doctorID) REFERENCES Doctors(doctorID)
);

CREATE TABLE Prescriptions (
    prescriptionID VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    patientID VARCHAR(36),
    doctorID INT,
    prescriptionDate DATE,
    medication VARCHAR(255),
    FOREIGN KEY (patientID) REFERENCES Patients(patientID),
    FOREIGN KEY (doctorID) REFERENCES Doctors(doctorID)
);

CREATE TABLE PatientDoctor (
    visitID INT AUTO_INCREMENT PRIMARY KEY,
    patientID VARCHAR(36),
    doctorID INT,
    departmentID INT,  -- Added departmentID to track department of the visit
    visitDate DATE,
    UNIQUE KEY (patientID, doctorID),
    FOREIGN KEY (patientID) REFERENCES Patients(patientID),
    FOREIGN KEY (doctorID) REFERENCES Doctors(doctorID),
    FOREIGN KEY (departmentID) REFERENCES Departments(departmentID)  -- Added foreign key constraint
);

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

-- INSERT INTO PatientDoctor (PatientID, DoctorID, DepartmentID, VisitDate)
-- VALUES ('a11450f5-dcd5-11ee-a372-4ccc6a43e5c9', '2', '1', '2024-03-07');

SELECT * FROM Patients;
SELECT * FROM Doctors;
SELECT * FROM Departments;
SELECT * FROM Appointments;
SELECT * FROM Prescriptions;
SELECT * FROM PatientDoctor;
