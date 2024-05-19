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
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

const PatientsManager = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorData, setDoctorData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    specialty: "",
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
    setDoctorData({ ...doctorData, [name]: value });
  };

  const addDoctor = () => {
    axios
      .post("http://localhost:3000/doctors", doctorData)
      .then((response) => {
        toast({
          title: "Doctor added successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
        // Optionally, fetch the updated list of doctors or update the state if you are displaying doctors
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error adding doctor",
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
              Add Doctor
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
          <ModalHeader>Add Doctor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="firstName" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstName"
                value={doctorData.firstName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="lastName" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastName"
                value={doctorData.lastName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={doctorData.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="specialty" isRequired>
              <FormLabel>Specialty</FormLabel>
              <Input
                name="specialty"
                value={doctorData.specialty}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={addDoctor}>
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
