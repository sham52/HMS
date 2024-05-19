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

const PharmacistsManager = () => {
  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPharmacists, setSelectedPharmacists] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    axios
      .get("http://localhost:3000/pharmacists")
      .then((response) => {
        setPharmacists(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast({
          title: "Error fetching pharmacists",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast]);

  const handleCheck = (pharmacistID, isChecked) => {
    setSelectedPharmacists((prev) =>
      isChecked
        ? [...prev, pharmacistID]
        : prev.filter((id) => id !== pharmacistID)
    );
  };

  const deletePharmacists = () => {
    axios
      .all(
        selectedPharmacists.map((pharmacistID) =>
          axios.delete(`http://localhost:3000/pharmacists/${pharmacistID}`)
        )
      )
      .then(() => {
        setPharmacists((prev) =>
          prev.filter(
            (pharmacist) =>
              !selectedPharmacists.includes(pharmacist.pharmacistID)
          )
        );
        setSelectedPharmacists([]);
        toast({
          title: "Pharmacists deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error deleting pharmacists",
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
        Pharmacists Manager
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Select</Th>
            <Th>Pharmacist ID</Th>
            <Th>Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pharmacists.map((pharmacist) => (
            <Tr key={pharmacist.pharmacistID}>
              <Td>
                <Checkbox
                  onChange={(e) =>
                    handleCheck(pharmacist.pharmacistID, e.target.checked)
                  }
                />
              </Td>
              <Td>{pharmacist.pharmacistID}</Td>
              <Td>{pharmacist.firstName}</Td>
              <Td>{pharmacist.lastName}</Td>
              <Td>{pharmacist.email || "-"}</Td>
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
              onClick={() => console.log("Add pharmacist")}
            >
              Add
            </Button>
            <Button
              colorScheme="red"
              variant="solid"
              onClick={deletePharmacists}
              isDisabled={selectedPharmacists.length === 0}
            >
              Delete Selected
            </Button>
          </HStack>
        </Center>
      </Box>
    </Box>
  );
};

export default PharmacistsManager;
