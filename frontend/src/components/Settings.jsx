import React from "react";
import {
  Box,
  Heading,
  VStack,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Icons from "./Icons";

const Settings = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Box p={6} maxWidth="600px" mx="auto">
      {/* Page Title */}
      <Heading as="h4" size="lg" mb={6} textAlign="center">
        Bclics Settings
      </Heading>

      {/* Settings Options */}
      <VStack spacing={6} align="stretch">
        {/* Update Profile */}
        <Button size="lg" as={RouterLink} to="/UpdateProfile">
          Update Profile
        </Button>

        <Button size="lg" as={RouterLink} to="/AdvertisePage">
          Advertise
        </Button>

        {/* Light/Dark Mode Toggle Button */}
        <Button onClick={toggleColorMode} size="lg">
          {useColorModeValue("Dark Mode", "Light Mode")}
        </Button>

        {/* Saved Post */}
        <Button size="lg" as={RouterLink} to="/SavePost">
          Saved Post
        </Button>

        {/* Find Users */}
        <Button size="lg" as={RouterLink} to="/FindUsers">
          Find Users
        </Button>

        {/* Delete Account */}
        <Button colorScheme="red" size="lg">
          Delete Account
        </Button>

        {/* Logout */}
        <Button colorScheme="red" size="lg">
          Logout
        </Button>
      </VStack>
      <Icons />
    </Box>
  );
};

export default Settings;
