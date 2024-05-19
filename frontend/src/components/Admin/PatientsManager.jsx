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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

const PatientsManager = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState({
    patientID: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phoneNumber: "",
    password: "",
    departmentID: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const addPatient = () => {
    axios
      .post("http://localhost:3000/patients", patientData)
      .then((response) => {
        toast({
          title: "Patient added successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error adding patient",
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
            <Button colorScheme="teal" variant="solid" onClick={onOpen}>
              Add Patient
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="patientID" isRequired>
              <FormLabel>Patient ID</FormLabel>
              <Input
                name="patientID"
                value={patientData.patientID}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="firstName" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstName"
                value={patientData.firstName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="lastName" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastName"
                value={patientData.lastName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="dateOfBirth" isRequired>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                name="dateOfBirth"
                value={patientData.dateOfBirth}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="gender" isRequired>
              <FormLabel>Gender</FormLabel>
              <Select
                name="gender"
                value={patientData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="Erkek">Erkek</option>
                <option value="Kadın">Kadın</option>
                <option value="Diğer">Diğer</option>
              </Select>
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={patientData.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="phoneNumber" isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phoneNumber"
                value={patientData.phoneNumber}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={patientData.password}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="departmentID" isRequired>
              <FormLabel>Department ID</FormLabel>
              <Input
                name="departmentID"
                value={patientData.departmentID}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={addPatient}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PatientsManager;
