DROP DATABASE IF EXISTS hms;
CREATE DATABASE hms;
USE hms;

CREATE TABLE Patients (
    patientID VARCHAR(11) PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    dateOfBirth DATE NOT NULL,
    gender ENUM('Erkek', 'Kadın', 'Diğer') NOT NULL,
    email VARCHAR(255) UNIQUE,
    phoneNumber VARCHAR(14) UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Departments (
    departmentID INT AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Doctors (
    doctorID VARCHAR(11) PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    gender ENUM('Erkek', 'Kadın', 'Diğer') NOT NULL,
    departmentID INT,
    FOREIGN KEY (departmentID) REFERENCES Departments(departmentID)
);

CREATE TABLE Appointments (
    appointmentID INT AUTO_INCREMENT PRIMARY KEY,
    appointmentDate DATE,
    patientID VARCHAR(11),
    doctorID VARCHAR(11),
    departmentID INT,
    FOREIGN KEY (patientID) REFERENCES Patients(patientID),
    FOREIGN KEY (doctorID) REFERENCES Doctors(doctorID),
    FOREIGN KEY (departmentID) REFERENCES Departments(departmentID)
);

CREATE TABLE Pharmacists (
	pharmacistID VARCHAR(11) PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phoneNumber VARCHAR(14) UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Prescriptions (
    prescriptionID VARCHAR(5) PRIMARY KEY DEFAULT (UUID()),
    appointmentID INT,
    patientID VARCHAR(11),
    doctorID VARCHAR(11),
    pharmacistID VARCHAR(11),
    prescriptionDate DATE,
    medicationDetails VARCHAR(255),
    FOREIGN KEY (appointmentID) REFERENCES Appointments(appointmentID),
    FOREIGN KEY (pharmacistID) REFERENCES Pharmacists(pharmacistID),
    FOREIGN KEY (doctorID) REFERENCES Doctors(doctorID),
    FOREIGN KEY (patientID) REFERENCES Patients(patientID)
);

-- Insert patients
INSERT INTO Patients (patientID, firstName, lastName, dateOfBirth, gender, email, password)
VALUES 
  ('48028060750', 'Ahmet', 'Yılmaz', '1990-01-15', 'Erkek', 'ahmet.yilmaz@example.com', 'password1'),
  ('48028060751', 'Ayşe', 'Kaya', '1992-05-20', 'Kadın', 'ayse.kaya@example.com', 'password2'),
  ('48028060752', 'Mehmet', 'Öztürk', '1985-08-12', 'Erkek', 'mehmet.ozturk@example.com', 'password3');

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
INSERT INTO Doctors (doctorID,firstName, lastName, gender, departmentID)
VALUES 
  ('12345678901','Fatma', 'Demir', 'Kadın', 1),
  ('12345678902','Ali', 'Çelik', 'Erkek', 2),
  ('12345678903','Zeynep', 'Türk', 'Kadın', 1);

-- INSERT INTO Appointments (PatientID, DoctorID, DepartmentID, AppointmentDate)
-- VALUES ('a11450f5-dcd5-11ee-a372-4ccc6a43e5c9', '2', '1', '2024-03-07');

SELECT * FROM Patients;
SELECT * FROM Doctors;
SELECT * FROM Departments;
SELECT * FROM Appointments;
SELECT * FROM Prescriptions;
SELECT * FROM Pharmacists;
 
 
 -- VIEWS
CREATE VIEW PatientInformation AS SELECT
 p.patientID,
 p.firstName,
 p.lastName,
 p.dateOfBirth,
 p.gender,
 p.email,
 p.phoneNumber,
 d.doctorID,
 CONCAT(d.firstName, ' ', d.lastName) AS doctorName,
 a.appointmentDate
 FROM Patients p
 LEFT JOIN Appointments a ON p.patientID = a.patientID
 LEFT JOIN Doctors d ON a.doctorID = d.doctorID;
 CREATE VIEW PrescriptionDetails AS
 SELECT
 pr.prescriptionID,
 pr.medicationDetails,
 pr.prescriptionDate,
 p.patientID,
 CONCAT(p.firstName, ' ', p.lastName) AS patientName,
 d.doctorID,
 CONCAT(d.firstName, ' ', d.lastName) AS doctorName
 FROM Prescriptions pr
 JOIN Patients p ON pr.patientID = p.patientID
 JOIN Doctors d ON pr.doctorID = d.doctorID
 
 
 -- TRIGGER
 DELIMITER 
 
 CREATE TRIGGER log_prescription_changes
 AFTER UPDATE ON Prescriptions
 FOR EACH ROW
 BEGIN-- Insert only the medication details and change date
 INSERT INTO PrescriptionChanges (prescriptionID, medicationDetails, changeDate)
 VALUES(OLD.prescriptionID, OLD.medicationDetails, NOW());
 END;
 
 DELIMITER
 
 -- ASSERTION
 DELIMITER
 
 
 DELIMITER //
 CREATE ASSERTION APPOINTMENT_DATE_CHECK
 CHECK(-- Check if appointment date is in the future relative to the current date
 appointmentDate > CURDATE()
 );
 DELIMITER ;