-- DROP DATABASE IF EXISTS hms;
-- CREATE DATABASE hms;
USE hms;

CREATE TABLE Patients (
    patientID VARCHAR(36) PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    dateOfBirth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Departments (
    departmentID INT AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Doctors (
    doctorID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    departmentID INT,
    FOREIGN KEY (departmentID) REFERENCES Departments(departmentID)
);

CREATE TABLE Visits (
    visitID INT AUTO_INCREMENT PRIMARY KEY,
    patientID VARCHAR(36),
    doctorID INT,
    visitDate DATE,
    departmentID INT,
    FOREIGN KEY (patientID) REFERENCES Patients(patientID),
    FOREIGN KEY (doctorID) REFERENCES Doctors(doctorID),
    FOREIGN KEY (departmentID) REFERENCES Departments(departmentID)
);

CREATE TABLE Prescriptions (
    prescriptionID VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    visitID INT,
    prescriptionDate DATE,
    FOREIGN KEY (visitID) REFERENCES Visits(visitID)
);

CREATE TABLE Medications (
    prescriptionID VARCHAR(36),
    medication VARCHAR(255),
    FOREIGN KEY (prescriptionID) REFERENCES Prescriptions(prescriptionID)
);

-- Insert patients
INSERT INTO Patients (patientID, firstName, lastName, dateOfBirth, gender, email, password)
VALUES 
  ('a11450f5-dcd5-11ee-a372-4ccc6a43e5c9', 'Ahmet', 'Yılmaz', '1990-01-15', 'Male', 'ahmet.yilmaz@example.com', 'password1'),
  ('b11450f5-dcd5-11ee-a372-4ccc6a43e5c9', 'Ayşe', 'Kaya', '1992-05-20', 'Female', 'ayse.kaya@example.com', 'password2'),
  ('c11450f5-dcd5-11ee-a372-4ccc6a43e5c9', 'Mehmet', 'Öztürk', '1985-08-12', 'Male', 'mehmet.ozturk@example.com', 'password3');

-- Insert Turkish departments
INSERT INTO Departments (departmentName)
VALUES 
  ('Dahiliye'),
  ('Cerrahi'),
  ('Kadın Hastalıkları ve Doğum'),
  ('Çocuk Sağlığı ve Hastalıkları'),
  ('Göz Hastalıkları'),
  ('Kardiyoloji');

-- Insert Turkish doctors
INSERT INTO Doctors (firstName, lastName, gender, departmentID)
VALUES 
  ('Fatma', 'Demir', 'Female', 1),
  ('Ali', 'Çelik', 'Male', 2),
  ('Zeynep', 'Türk', 'Female', 1);

-- INSERT INTO Visits (PatientID, DoctorID, DepartmentID, VisitDate)
-- VALUES ('a11450f5-dcd5-11ee-a372-4ccc6a43e5c9', '2', '1', '2024-03-07');

SELECT * FROM Patients;
SELECT * FROM Doctors;
SELECT * FROM Departments;
SELECT * FROM Visits;
SELECT * FROM Prescriptions;
SELECT * FROM Medications;
