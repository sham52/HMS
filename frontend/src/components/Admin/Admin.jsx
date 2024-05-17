import React from "react";
import { Box, Heading, Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import PatientsManager from "./PatientsManager";
import DoctorsManager from "./DoctorsManager";
import PharmacistsManager from "./PharmacistsManager";

const Admin = () => {
  const navigate = useNavigate();

  const handlePatientsClick = () => {
    navigate("PatientsManager");
  };

  const handleDoctorsClick = () => {
    navigate("DoctorsManager");
  };

  const handlePharmacistsClick = () => {
    navigate("PharmacistsManager");
  };

  return (
    <Box height="100vh" p={0}>
      <Heading as="h1" mb={0} textAlign="center">
        Admin Panel
      </Heading>
      <Flex height="100vh" justify="center" align="center">
        <Box p={4}>
          <Heading as="h1" mb={4} textAlign="center">
            Admin Panel
          </Heading>

          <Flex justify="center">
            <Box p={4} bg="gray.100" borderRadius="md" mx={4}>
              <Button
                colorScheme="blue"
                mb={2}
                w="100%"
                onClick={handlePatientsClick}
              >
                Manage Patients
              </Button>
            </Box>

            <Box p={4} bg="gray.100" borderRadius="md" mx={4}>
              <Button
                colorScheme="blue"
                mb={2}
                w="100%"
                onClick={handleDoctorsClick}
              >
                Manage Doctors
              </Button>
            </Box>

            <Box p={4} bg="gray.100" borderRadius="md" mx={4}>
              <Button
                colorScheme="blue"
                mb={2}
                w="100%"
                onClick={handlePharmacistsClick}
              >
                Manage Pharmacists
              </Button>
            </Box>
          </Flex>

          <Routes>
            <Route path="PatientsManager" element={<PatientsManager />} />
            <Route path="DoctorsManager" element={<DoctorsManager />} />
            <Route path="PharmacistsManager" element={<PharmacistsManager />} />
          </Routes>
        </Box>
      </Flex>
    </Box>
  );
};

export default Admin;
