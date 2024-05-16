import React from "react";
import {
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const PatientTable = ({ appointments }) => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Patient Appointments</TableCaption>
        <Thead>
          <Tr>
            <Th>Appointment Date</Th>
            <Th>Doctor Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {appointments.map((appointment, index) => (
            <Tr key={index}>
              <Td>{appointment.appointmentDate}</Td>
              <Td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PatientTable;
