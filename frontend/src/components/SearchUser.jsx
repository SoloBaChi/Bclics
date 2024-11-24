import React from "react";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const dummyUsers = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
  profilePicture: `https://randomuser.me/api/portraits/men/${index + 1}.jpg`, // Dummy images
  username: `user${index + 1}`,
  fullName: `User Full Name ${index + 1}`,
  customerCount: 10 + index, // Example customer count
}));

const SearchUser = () => {
  return (
    <Box _hover={"gray.200"} as={RouterLink} to="/UserPage">
      {dummyUsers.map((user) => (
        <Box
          key={user.id}
          display="flex"
          alignItems="center"
          p={2}
          mb={2}
          borderRadius="md"
          boxShadow="sm"
          borderColor="gray.200"
        >
          {/* User Profile Picture */}
          <Image
            src={user.profilePicture}
            alt={`${user.username}'s profile`}
            boxSize="50px"
            borderRadius="full"
            mr={4}
          />

          {/* User Info */}
          <VStack align="start" spacing={1}>
            {/* Username */}
            <Text fontWeight="bold">{user.username}</Text>

            {/* Full Name */}
            <Text fontSize="sm" color="gray.500">
              {user.fullName}
            </Text>

            {/* Customer Count */}
            <Text fontSize="sm" color="gray.500">
              {user.customerCount} customers
            </Text>
          </VStack>
        </Box>
      ))}
    </Box>
  );
};

export default SearchUser;
