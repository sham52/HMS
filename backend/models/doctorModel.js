const { ValidationError } = require("./error");

class doctor {
  constructor(
    doctorID,
    firstName,
    lastName,
    gender,
    departmentID,
    appointments = []
  ) {
    this.doctorID = doctorID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.departmentID = departmentID;
    this.appointments = appointments;
  }
  assignAppointment(appointment) {
    if (!appointments.includes(appointment)) {
      appointments.push(appointment);
    }
  }

  static create(doctorData) {
    const validation = this.validate(doctorData);
    if (validation === true) {
      return new doctor(
        doctorData.doctorID,
        doctorData.firstName,
        doctorData.lastName,
        doctorData.gender,
        doctorData.departmentID,
        doctorData.appointments
      );
    }
    return validation;
  }

  static validate(data) {
    const errors = [];
    if (!this.idNoCheck(data.doctorID)) {
      errors.push(new ValidationError("ID is invalid", data.doctorID));
    }
    if (!data.firstName) {
      errors.push(
        new ValidationError("First name is required", data.firstName)
      );
    }
    if (!data.lastName) {
      errors.push(new ValidationError("Last name is required", data.lastName));
    }
    if (!data.gender) {
      errors.push(new ValidationError("Gender is required", data.gender));
    }
    if (!data.departmentID) {
      errors.push(
        new ValidationError("Department ID is required", data.departmentID)
      );
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

module.exports = doctor;
