class precription {
  constructor(
    prescriptionID,
    visitID,
    pharmacistID,
    prescriptionDate,
    medicationDetails
  ) {
    this.prescriptionID = prescriptionID;
    this.visitID = visitID;
    this.pharmacistID = pharmacistID;
    this.prescriptionDate = prescriptionDate;
    this.medicationDetails = medicationDetails;
  }
}
module.exports = precription;
