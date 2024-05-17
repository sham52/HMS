import React from 'react';
import {
  Box,
  Heading,
  Grid,
  GridItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

const PharmacistMain = () => {
  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>Pharmacist Dashboard</Heading>
      
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem colSpan={1}>
          <Box p={4} bg="gray.100" borderRadius="md">
            <Heading as="h2" size="md" mb={2}>Prescriptions</Heading>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Patient</Th>
                  <Th>Doctor</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* Sample prescription data */}
                <Tr>
                  <Td>John Doe</Td>
                  <Td>Dr. Smith</Td>
                  <Td>Processing</Td>
                </Tr>
                {/* Additional prescriptions */}
              </Tbody>
            </Table>
          </Box>
        </GridItem>
        
        <GridItem colSpan={1}>
          <Box p={4} bg="gray.100" borderRadius="md">
            <Heading as="h2" size="md" mb={2}>Doctors</Heading>
            {/* Display list of doctors */}
            <ul>
              <li>Dr. Smith</li>
              {/* Additional doctors */}
            </ul>
          </Box>
        </GridItem>
        
        <GridItem colSpan={1}>
          <Box p={4} bg="gray.100" borderRadius="md">
            <Heading as="h2" size="md" mb={2}>Patients</Heading>
            {/* Display list of patients */}
            <ul>
              <li>John Doe</li>
              {/* Additional patients */}
            </ul>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default PharmacistMain;
