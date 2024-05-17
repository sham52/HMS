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
  Text,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const PatientMain = () => {
  const [patientData, setPatientData] = useState({
    patientID: null,
    fullName: null,
    userType: null,
    dateOfBirth: null,
    gender: null,
    phoneNumber: null,
    email: null,
    medications: null,
    appointments: [
      {
        appointmentDate: null,
        doctorName: null,
        departmentName: null,
      },
    ],
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        await setPatientData({
          ...patientData,
          patientID: localStorage.getItem("userID"),
          userType: localStorage.getItem("userType"),
          fullName: localStorage.getItem("fullName"),
        });
        const response = await axios.get(
          `http://localhost:3000/patients/${patientData.patientID}`
        );
        console.log(response);
      } catch (err) {
        console.error("Error fetching patient:", err);
      }
    };
    fetchPatientData();
  }, [patientData.patientID]);

  return (
    <>
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Box mt={16} width="80%">
          <Center>
            <Box p="6" borderWidth="1px" borderRadius="lg">
              <Avatar size="xl" name={patientData.fullName} />
              <Text mt={4} fontSize="xl" fontWeight="bold">
                {patientData.fullName}
              </Text>
              <Text mt={2}>{patientData.userType}</Text>
            </Box>
          </Center>
          <TableContainer mt={8}>
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
                {patientData.appointments?.map((appointment) => (
                  <Tr key={appointment.appointmentDate}>
                    <Td>{appointment.appointmentDate}</Td>
                    <Td>{`${appointment.doctorName}`}</Td>
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
