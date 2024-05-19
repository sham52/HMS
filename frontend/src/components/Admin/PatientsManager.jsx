import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  HStack,
  Button,
  Center,
  Spinner,
  useToast,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";

const PatientsManager = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    axios
      .get("http://localhost:3000/patients")
      .then((response) => {
        setPatients(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast({
          title: "Error fetching patients",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast]);

  const handleCheck = (patientID, isChecked) => {
    setSelectedPatients((prev) =>
      isChecked ? [...prev, patientID] : prev.filter((id) => id !== patientID)
    );
  };

  const deletePatients = () => {
    axios
      .all(
        selectedPatients.map((patientID) =>
          axios.delete(`http://localhost:3000/patients/${patientID}`)
        )
      )
      .then(() => {
        setPatients((prev) =>
          prev.filter(
            (patient) => !selectedPatients.includes(patient.patientID)
          )
        );
        setSelectedPatients([]);
        toast({
          title: "Patients deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error deleting patients",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box>
      <Heading as="h2" mb={6} textAlign="center">
        Patients Manager
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Select</Th>
            <Th>Patient ID</Th>
            <Th>Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {patients.map((patient) => (
            <Tr key={patient.patientID}>
              <Td>
                <Checkbox
                  onChange={(e) =>
                    handleCheck(patient.patientID, e.target.checked)
                  }
                />
              </Td>
              <Td>{patient.patientID}</Td>
              <Td>{patient.firstName}</Td>
              <Td>{patient.lastName}</Td>
              <Td>{patient.email || "-"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box mt={5}>
        <Center>
          <HStack spacing={5}>
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => console.log("Add patient")}
            >
              Add
            </Button>
            <Button
              colorScheme="red"
              variant="solid"
              onClick={deletePatients}
              isDisabled={selectedPatients.length === 0}
            >
              Delete Selected
            </Button>
          </HStack>
        </Center>
      </Box>
    </Box>
  );
};

export default PatientsManager;
