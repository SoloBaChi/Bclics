import React from 'react';
import { Box, Text, Flex } from "@chakra-ui/react";
import Post from "./Post";
import Icons from "./Icons";
import AdsPost from "./AdsPost";

const SavePost = () => {
  const posts = Array(7).fill(0); // Array with 7 items for mapping posts

  return (
    <Box width="100vw" height="100vh" p={4}>
      {/* Header centered at the top */}
      <Flex justifyContent="center" alignItems="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          Your Saved Posts
        </Text>
      </Flex>

      {/* Container for Posts */}
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

      {/* Icons at the bottom (if needed for additional functionality) */}
      <Icons />
    </Box>
  );
};

export default SavePost;
