import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Post from "./Post";
import AdsPost from "./AdsPost";

const Random = () => {
  // Example array of post data; each could represent a unique post
  const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // Replace with real post data if available

  return (
    <Flex
      direction="column"
      w={{ base: "full", sm: "80%", md: "60%", lg: "50%", xl: "40%" }}
      maxW="600px"
      overflowY={{ base: "scroll", lg: "auto" }} // Hide scrollbar on small screens
      h="95vh" // Adjusts height to full viewport
      px={4}
      py={2}
      mx="auto" // Centers the Flex container horizontally
      css={{
        "&::-webkit-scrollbar": {
          width: "8px", // Width of the scrollbar
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888", // Color of the scrollbar thumb
          borderRadius: "2px", // Rounded corners for the thumb
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555", // Darker color on hover
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#444", // Color of the scrollbar track
        },
        "@media (max-width: 768px)": {
          // Adjust to the breakpoint for small screens
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar on small screens
          },
        },
      }}
    >
      {posts.map((post, index) => (
        <React.Fragment key={index}>
          <Box mb={4}>
            <Post />
          </Box>
          {/* Insert AdsPost after every three Post components */}
          {(index + 1) % 3 === 0 && (
            <Box mb={4}>
              <AdsPost />
            </Box>
          )}
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default Random;
