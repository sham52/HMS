import React from "react";
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
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const addPatient = () => {
  console.log("Add patient");
};

const deletePatients = (patientsIDs) => {
  console.log(patientsIDs);
};

const PatientsManager = () => {
  const [selectedPatients, setSelectedPatients] = useState([]);

  const handleCheck = (patientsID, isChecked) => {
    if (isChecked) {
      setSelectedPatients([...selectedPatients, patientsID]);
    } else {
      setSelectedPatients(selectedPatients.filter((id) => id !== patientsID));
    }
  };

  const [patients, setPatients] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/patients")
      .then((response) => {
        setPatients(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Patients Manager</h1>
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
          {patients.map((patient, index) => (
            <Tr key={index}>
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
              onClick={() => addPatient()}
            >
              Add
            </Button>
            <Button
              colorScheme="red"
              variant="solid"
              onClick={() => deletePatients(selectedPatients)}
            >
              Delete Selected
            </Button>
          </HStack>
        </Center>
      </Box>
    </div>
  );
};

export default PatientsManager;
