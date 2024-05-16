import React, { useState, useEffect } from "react";
import PatientTable from "./PatientTable";
import {
  Box,
  Flex,
  Spacer,
  Link,
  Button,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";

const PatientMain = () => {
  const [patientData, setPatientData] = useState([]);

  return (
    <Box>
      <Flex p={4}>
        <Box>
          <Link href="/">Home</Link>
        </Box>
        <Spacer />
        <Box>
          {/* <IconButton aria-label="Settings" icon={<SettingsIcon />} />
          <IconButton aria-label="Search database" icon={<SearchIcon />} /> */}

          <Avatar src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
        </Box>
      </Flex>
      <h1>Patient Appointments</h1>
      {/* Your existing content here */}
    </Box>
  );
};

export default PatientMain;
