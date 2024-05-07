import React from "react";
import { ChakraProvider, Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <ChakraProvider>
      <Box p={8}>
        <Heading mb={4}>Hoş Geldiniz!</Heading>
        <Text mb={4}>Türk Hastane Yönetim Sistemine Hoş Geldiniz.</Text>
        <Button onClick={() => navigate("/register")} colorScheme="teal">
          Randevu Al
        </Button>
      </Box>
    </ChakraProvider>
  );
};

export default Home;
