import React, { useState } from "react";
import { Box, Button, Image, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Icons from "./Icons";

const dummyUsers = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
  profilePicture: `https://randomuser.me/api/portraits/men/${index + 1}.jpg`, // Dummy images
  username: `user${index + 1}`,
  fullName: `User Full Name ${index + 1}`,
  customerCount: 10 + index, // Example customer count
}));

const FindUsers = () => {
  // State to track follow status for each user
  const [followStatus, setFollowStatus] = useState(
    dummyUsers.reduce((acc, user) => {
      acc[user.id] = false;
      return acc;
    }, {})
  );

  // Toggle follow state
  const handleFollowToggle = (userId) => {
    setFollowStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: !prevStatus[userId],
    }));
  };

  return (
    <Box
      w={{ base: "full", sm: "80%", md: "60%", lg: "50%", xl: "40%" }}
      maxW="620px"
      mx="auto"
      p={4}
    >
      {dummyUsers.map((user) => (
        <Box
          key={user.id}
          display="flex"
          alignItems="center"
          p={0}
          mb={"3rem"}
          borderRadius="md"
          boxShadow="sm"
          // _hover={{ boxShadow: "md", bg: "gray.400" }}
        >
          {/* User Profile Picture */}
          <Box as={RouterLink} to="/UserPage">
            <Image
              src={user.profilePicture}
              alt={`${user.username}'s profile`}
              boxSize="50px"
              borderRadius="full"
              mr={4}
            />
          </Box>

          {/* User Info */}
          <VStack
            align="start"
            spacing={1}
            flex="1"
            as={RouterLink}
            to="/UserPage"
          >
            <Text fontWeight="bold">{user.username}</Text>
            <Text fontSize="sm" color="gray.500">
              {user.fullName}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {user.customerCount} customers
            </Text>
          </VStack>

          {/* Follow Button */}
          <Button
            size="sm"
            colorScheme="blue"
            bg={followStatus[user.id] ? "transparent" : "blue.500"}
            color={followStatus[user.id] ? "gray.600" : "white"}
            border={followStatus[user.id] ? "1px solid" : "none"}
            // _hover={{
            //   bg: followStatus[user.id] ? "gray.200" : "blue.600",
            // }}
            boxShadow="md"
            onClick={() => handleFollowToggle(user.id)}
          >
            {followStatus[user.id] ? "Following" : "Follow"}
          </Button>
        </Box>
      ))}
      <Icons />
    </Box>
  );
};

export default FindUsers;
