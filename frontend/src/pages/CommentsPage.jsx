import React from "react";
import { Box } from "@chakra-ui/react";
import Comments from "../components/Comments";
import Post from "../components/Post";

const CommentsPage = () => {
  return (
    <div
    >
      {" "}
      <Post />
      
      <Box mb={"4rem"}>
        <Comments />
      </Box>
    </div>
  );
};

export default CommentsPage;
