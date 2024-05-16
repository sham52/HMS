import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const authToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  const signOut = () => {
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/main");
  };

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      px={4}
      pos="fixed"
      w="100vh"
      zIndex="999"
    >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxW="7xl"
        mx="auto"
      >
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Text fontSize="xl">Logo</Text>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <Button variant="ghost" onClick={() => navigate("/main")}>
              Ana Sayfa
            </Button>
            <Button variant="ghost">Hakkımızda</Button>
            <Button variant="ghost">Departmanlar</Button>
            <Button variant="ghost">İletişim</Button>
          </HStack>
        </HStack>
        <HStack spacing={4} alignItems="center">
          {authToken ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW="0"
              >
                <Avatar size="sm" />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuItem onClick={signOut}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button
                onClick={() => navigate("/register")}
                variant="solid"
                colorScheme="teal"
              >
                Kayıt Ol
              </Button>
              <Button
                onClick={() => navigate("/login")}
                variant="solid"
                colorScheme="blue"
              >
                Giriş Yap
              </Button>
            </>
          )}
        </HStack>
      </Flex>
      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            <Button variant="ghost">Home</Button>
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Services</Button>
            <Button variant="ghost">Contact</Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;