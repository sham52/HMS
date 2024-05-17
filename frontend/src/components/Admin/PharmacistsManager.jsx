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

const addPharmacist = () => {
  console.log("Add pharmacist");
};

const deletePharmacists = (pharmacistsIDs) => {
  console.log(pharmacistsIDs);
};

const PharmacistsManager = () => {
  const [selectedPharmacists, setSelectedPharmacists] = useState([]);

  const handleCheck = (pharmacistsID, isChecked) => {
    if (isChecked) {
      setSelectedPharmacists([...selectedPharmacists, pharmacistsID]);
    } else {
      setSelectedPharmacists(
        selectedPharmacists.filter((id) => id !== pharmacistsID)
      );
    }
  };

  const [pharmacists, setPharmacists] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/pharmacists")
      .then((response) => {
        setPharmacists(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Pharmacists Manager</h1>
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
          {pharmacists.map((pharmacist, index) => (
            <Tr key={index}>
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
              onClick={() => addPharmacist()}
            >
              Add
            </Button>
            <Button
              colorScheme="red"
              variant="solid"
              onClick={() => deletePharmacists(selectedPharmacists)}
            >
              Delete Selected
            </Button>
          </HStack>
        </Center>
      </Box>
    </div>
  );
};

export default PharmacistsManager;
