import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  TableContainer,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const PatientMain = () => {
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get("/patient-details");
        setPatientData(response.data);
      } catch (err) {
        console.error("Error fetching patient:", err);
      }
    };
    fetchPatientData();
  }, []);

  const appointments = [
    {
      appointmentDate: "2021-10-10",
      doctor: {
        firstName: "John",
        lastName: "Doe",
      },
    },
  ];

  const { authToken, setAuthToken } = useAuth();
  console.log(authToken);
  console.log("bu KOMPONENTN ÇALIŞIYOR LA GARDAŞ");

  return (
    <>
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Box mt={16} width="80%">
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <TableCaption>Patient Appointments</TableCaption>
              <Thead>
                <Tr>
                  <Th>Appointment Date</Th>
                  <Th>Doctor Name</Th>
                  <Th>Medication Details</Th>
                </Tr>
              </Thead>
              <Tbody>
                {appointments.map((appointment, index) => (
                  <Tr key={index}>
                    <Td>{appointment.appointmentDate}</Td>
                    <Td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</Td>
                    <Td>{appointment.medicationDetails || "N/A"}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </>
  );
};

export default PatientMain;
