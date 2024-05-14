const { ValidationError } = require("./error");

class patient {
  constructor(
    patientID,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    appointments = [],
    precriptions = []
  ) {
    this.patientID = patientID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.email = email;
    this.appointments = appointments;
    this.precriptions = precriptions;
  }
  assignAppointment(appointment) {
    if (!appointments.includes(appointment)) {
      appointments.push(appointment);
    }
  }
  assignPrescription(precription) {
    if (!precriptions.includes(precription)) {
      precriptions.push(precription);
    }
  }

  static create(patientData) {
    const validation = this.validate(patientData);
    if (validation === true) {
      return new patient(
        patientData.patientID,
        patientData.firstName,
        patientData.lastName,
        patientData.dateOfBirth,
        patientData.gender,
        patientData.email,
        patientData.appointments,
        patientData.precriptions
      );
    }
    return validation;
  }

  static validate(data) {
    const errors = [];
    if (!this.idNoCheck(data.patientID)) {
      errors.push(new ValidationError("ID is invalid", data.patientID));
    }
    if (!data.firstName) {
      errors.push(
        new ValidationError("First name is required", data.firstName)
      );
    }
    if (!data.lastName) {
      errors.push(new ValidationError("Last name is required", data.lastName));
    }
    if (!data.dateOfBirth) {
      errors.push(
        new ValidationError("Date of birth is required", data.dateOfBirth)
      );
    }
    if (!data.gender) {
      errors.push(new ValidationError("Gender is required", data.gender));
    }
    if (!data.email) {
      errors.push(new ValidationError("Email is required", data.email));
    }
    if (errors.length > 0) {
      return errors;
    }
    return true;
  }

  static idNoCheck(idNo) {
    var temp = String(idNo).split("").map(Number);
    if (!/^\d{11}$/.test(idNo)) return false;

    let temp10 = 0;
    let temp11 = 0;
    for (let i = 0; i < temp.length; i++) {
      switch (i) {
        case 0:
          if (temp[i] == 0) {
            return false;
          }
          temp10 += temp[i];
          break;
        case 1:
          temp11 += temp[i];
          break;
        case 2:
          temp10 += temp[i];
          break;
        case 3:
          temp11 += temp[i];
          break;
        case 4:
          temp10 += temp[i];
          break;
        case 5:
          temp11 += temp[i];
          break;
        case 6:
          temp10 += temp[i];
          break;
        case 7:
          temp11 += temp[i];
          break;
        case 8:
          temp10 += temp[i];
          break;
        case 9:
          if (!((temp10 * 7 - temp11) % 10 == temp[i])) {
            return false;
          }
          temp11 += temp[i];
          break;
        case 10:
          if (!((temp10 + temp11) % 10 == temp[i])) {
            return false;
          }
          break;
      }
    }
    return true;
  }
}

module.exports = patient;
