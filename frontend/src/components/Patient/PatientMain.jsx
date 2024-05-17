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
  Button,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const PatientMain = () => {
  const [appointmentData, setAppointmentData] = useState({
    appointmentDate: null,
    doctorFirstName: null,
    doctorLastName: null,
  });
  const createAppointment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/appoinments",
        appointmentData
      );
    } catch (err) {
      console.error("Error while creating appointment");
    }
  };

  const [patientData, setPatientData] = useState({
    patientID: localStorage.getItem("userID"),
    fullName: localStorage.getItem("fullName"),
    userType: localStorage.getItem("userType"),
    dateOfBirth: localStorage.getItem("dateOfBirth"),
    gender: localStorage.getItem("gender"),
    phoneNumber: localStorage.getItem("phoneNumber"),
    email: localStorage.getItem("email"),
    medicationDetails: localStorage.getItem("medicationDetails"),
    appointments: null,
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/patients/${patientData.patientID}`
        );
        setAppointmentData(
          response.data.map((appointment) => ({
            appointmentDate: appointment.appointmentDate,
            doctorFirstName: appointment.doctorFirstName,
            doctorLastName: appointment.doctorLastName,
          })),
          setPatientData((prev) => ({
            ...prev,
            appointments: response.data,
          }))
        );
      } catch (err) {
        console.error("Error fetching patient:", err);
      }
    };

    fetchPatientData();
  }, []);

  return (
    <>
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Box mt={16} width="80%">
          <Center>
            <Box p="6" borderWidth="1px" borderRadius="lg">
              <Avatar size="xl" name={patientData.fullName} />
              <Text mt={4} fontSize="xl" fontWeight="bold">
                İsim Soyisim: {patientData.fullName}
              </Text>
              <Text mt={2}>Kullanıcı Tipi: {patientData.userType}</Text>
            </Box>
          </Center>
          <TableContainer mt={8}>
            <Table variant="striped" colorScheme="teal">
              <TableCaption>Patient Appointments</TableCaption>
              <Thead>
                <Tr>
                  <Th>Appointment Date</Th>
                  <Th>Doktor Ad</Th>
                  <Th>Doktor Soyad</Th>
                  <Th>Sıra Numarası</Th>
                </Tr>
              </Thead>
              <Tbody>
                {patientData.appointments?.map((appointment) => (
                  <Tr key={appointment.appointmentDate}>
                    <Td>{appointment.appointmentDate}</Td>
                    <Td>{`${appointment.doctorFirstName}`}</Td>
                    <Td>{`${appointment.doctorLastName}`}</Td>
                    <Td>{appointment.appointmentID || "N/A"}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Box mt={8}>
            <Button onClick={createAppointment}>Randevu Oluştur</Button>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default PatientMain;
