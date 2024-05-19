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
  Heading,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const DoctorsManager = () => {
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    axios
      .get("http://localhost:3000/doctors")
      .then((response) => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast({
          title: "Error fetching doctors",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast]);

  const handleCheck = (doctorID, isChecked) => {
    setSelectedDoctors((prev) =>
      isChecked ? [...prev, doctorID] : prev.filter((id) => id !== doctorID)
    );
  };

  const deleteDoctors = () => {
    axios
      .all(
        selectedDoctors.map((doctorID) =>
          axios.delete(`http://localhost:3000/doctors/${doctorID}`)
        )
      )
      .then(() => {
        setDoctors((prev) =>
          prev.filter((doctor) => !selectedDoctors.includes(doctor.doctorID))
        );
        setSelectedDoctors([]);
        toast({
          title: "Doctors deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error deleting doctors",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  if (loading) {
    return <Center>Loading...</Center>;
  }

  return (
    <Box>
      <Heading as="h2" mb={6} textAlign="center">
        Doctors Manager
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Select</Th>
            <Th>Doctor ID</Th>
            <Th>Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {doctors.map((doctor) => (
            <Tr key={doctor.doctorID}>
              <Td>
                <Checkbox
                  onChange={(e) =>
                    handleCheck(doctor.doctorID, e.target.checked)
                  }
                />
              </Td>
              <Td>{doctor.doctorID}</Td>
              <Td>{doctor.firstName}</Td>
              <Td>{doctor.lastName}</Td>
              <Td>{doctor.email || "-"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box mt={5}>
        <Center>
          <HStack spacing={5}>
            <Button colorScheme="teal" variant="solid">
              Add
            </Button>
            <Button
              colorScheme="red"
              variant="solid"
              onClick={deleteDoctors}
              isDisabled={selectedDoctors.length === 0}
            >
              Delete Selected
            </Button>
          </HStack>
        </Center>
      </Box>
    </Box>
  );
};

export default DoctorsManager;
