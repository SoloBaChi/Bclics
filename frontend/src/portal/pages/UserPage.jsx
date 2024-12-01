import React from "react";
import { Box } from "@chakra-ui/react";
import UserHeader from "../components/UserHeader";
import Post from "../components/Post";
import Icons from "../components/Icons";
import AdsPost from "../components/AdsPost";

const UserPage = () => {
  const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // Replace with real post data if available

  return (
    <Box
      w={{ base: "full", sm: "80%", md: "60%", lg: "50%", xl: "40%" }}
      maxW="600px"
      mx="auto"
    >
      <Box mb="5rem">
        <Box top={0}>
          <UserHeader />
          {/* Map the Post component to display up to 5 times */}
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
        </Box>
      </Box>
      <Icons />
    </Box>
  );
};

export default UserPage;
