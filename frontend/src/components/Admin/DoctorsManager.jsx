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

const addDoctor = () => {
  console.log("Add doctor");
};

const deleteDoctors = (doctorsIDs) => {
  console.log(doctorsIDs);
};

const DoctorsManager = () => {
  const [selectedDoctors, setSelectedDoctors] = useState([]);

  const handleCheck = (doctorsID, isChecked) => {
    if (isChecked) {
      setSelectedDoctors([...selectedDoctors, doctorsID]);
    } else {
      setSelectedDoctors(selectedDoctors.filter((id) => id !== doctorsID));
    }
  };

  const [doctors, setDoctors] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/doctors")
      .then((response) => {
        setDoctors(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Doctors Manager</h1>
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
          {doctors.map((doctor, index) => (
            <Tr key={index}>
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
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => addDoctor()}
            >
              Add
            </Button>
            <Button
              colorScheme="red"
              variant="solid"
              onClick={() => deleteDoctors(selectedDoctors)}
            >
              Delete Selected
            </Button>
          </HStack>
        </Center>
      </Box>
    </div>
  );
};

export default DoctorsManager;
