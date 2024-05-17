import React from "react";
import { Box, Heading, Flex, Button } from "@chakra-ui/react";

const Admin = () => {
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
              <Heading as="h2" size="md" mb={2} textAlign="center">
                Manage Patients
              </Heading>
              <Button colorScheme="blue" mb={2} w="100%">
                View Patients
              </Button>
              <Button colorScheme="blue" w="100%">
                Add Patient
              </Button>
            </Box>

            <Box p={4} bg="gray.100" borderRadius="md" mx={4}>
              <Heading as="h2" size="md" mb={2} textAlign="center">
                Manage Doctors
              </Heading>
              <Button colorScheme="blue" mb={2} w="100%">
                View Doctors
              </Button>
              <Button colorScheme="blue" w="100%">
                Add Doctor
              </Button>
            </Box>

            <Box p={4} bg="gray.100" borderRadius="md" mx={4}>
              <Heading as="h2" size="md" mb={2} textAlign="center">
                Manage Pharmacists
              </Heading>
              <Button colorScheme="blue" mb={2} w="100%">
                View Pharmacists
              </Button>
              <Button colorScheme="blue" w="100%">
                Add Pharmacists
              </Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Admin;
