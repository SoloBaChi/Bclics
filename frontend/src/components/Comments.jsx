import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Input,
  Button,
  Avatar,
  Divider,
  keyframes,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiHeart, FiMoreHorizontal } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";

const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

const Comments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      username: "user1",
      avatar: "/avatar1.png",
      text: "Great post!",
      likes: 0,
      replies: [],
    },
    {
      id: 2,
      username: "user2",
      avatar: "/avatar2.png",
      text: "I love this!",
      likes: 1,
      replies: [
        {
          id: 101,
          username: "user3",
          avatar: "/avatar3.png",
          text: "Me too!",
          likes: 0,
        },
      ],
    },
    {
      id: 3,
      username: "user4",
      avatar: "/avatar4.png",
      text: "Interesting thoughts!",
      likes: 0,
      replies: [
        {
          id: 102,
          username: "user5",
          avatar: "/avatar5.png",
          text: "Absolutely!",
          likes: 1,
        },
        {
          id: 103,
          username: "user6",
          avatar: "/avatar6.png",
          text: "Agreed!",
          likes: 0,
        },
      ],
    },
  ]);

  const bgColor = useColorModeValue("gray.50", "gray.800");

  const handleLike = (commentId, replyId = null) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          if (replyId) {
            comment.replies = comment.replies.map((reply) =>
              reply.id === replyId
                ? { ...reply, likes: reply.likes === 0 ? 1 : 0 }
                : reply
            );
          } else {
            comment.likes = comment.likes === 0 ? 1 : 0;
          }
        }
        return comment;
      })
    );
  };

  return (
    <Box
      w={{ base: "full", sm: "80%", md: "60%", lg: "50%", xl: "40%" }}
      maxW="620px"
      mx="auto"
      p={4}
      boxShadow="md"
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        p={4}
        mb={"3rem"}
        boxShadow="lg" // Use "xl" for a thicker shadow or custom with "0px 0px 10px rgba(0, 0, 0, 0.3)"
        borderRadius="md"
      >
        <Text fontSize="lg" mr={4}>
          Get App here
        </Text>
        <Button bg="blue.400" color="white" _hover={{ bg: "blue.500" }}>
          Download
        </Button>
      </Flex>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onLike={handleLike} />
      ))}

      {/* Fixed Comment Input */}
      <Flex
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        mx="auto"
        w={{ base: "full", sm: "80%", md: "60%", lg: "50%", xl: "40%" }}
        p={2}
        bg={bgColor} // Apply color mode background
        alignItems="center"
        zIndex="1000"
      >
        <Input placeholder="Write a comment..." flex="1" mr={2} />
        <Button colorScheme="blue">Post</Button>
      </Flex>
    </Box>
  );
};

const Comment = ({ comment, onLike }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <Box mb={4} p={4} boxShadow="sm" borderRadius="md">
      <Flex align="center" justify="space-between">
        <Flex gap={3} align="center" as={RouterLink} to="/UserPage">
          <Avatar src={comment.avatar} size="sm" />
          <Box>
            <Text fontWeight="bold">{comment.username}</Text>
            <Text fontSize="xs" color="gray.500">
              1d
            </Text>
          </Box>
        </Flex>
        <Flex gap={2} align="center">
          <IconButton
            icon={comment.likes ? <AiFillHeart color="red" /> : <FiHeart />}
            onClick={() => onLike(comment.id)}
            animation={comment.likes ? `${bounce} 0.5s ease` : undefined}
            variant="ghost"
          />
          <Text fontSize="sm">{comment.likes}</Text>
          <Icon as={FiMoreHorizontal} />
        </Flex>
      </Flex>

      <Text mt={2}>{comment.text}</Text>
      <Text
        color="blue.500"
        fontSize="sm"
        cursor="pointer"
        mt={1}
        onClick={() => setShowReplies(!showReplies)}
      >
        Reply
      </Text>

      {comment.replies.length > 0 && (
        <Text
          textAlign="center"
          mt={2}
          color="blue.500"
          fontSize="sm"
          cursor="pointer"
          onClick={() => setShowReplies(!showReplies)}
        >
          {showReplies
            ? "Hide replies"
            : `View ${comment.replies.length} ${
                comment.replies.length > 1 ? "replies" : "reply"
              }`}
        </Text>
      )}

      {showReplies && (
        <Box mt={2} pl={4} borderLeft="1px solid" borderColor="gray.200">
          {comment.replies.map((reply) => (
            <Reply
              key={reply.id}
              reply={reply}
              onLike={() => onLike(comment.id, reply.id)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

const Reply = ({ reply, onLike }) => {
  return (
    <Box mt={3}>
      <Flex align="center" justify="space-between">
        <Flex gap={3} align="center" as={RouterLink} to="/UserPage">
          <Avatar src={reply.avatar} size="xs" />
          <Box>
            <Text fontWeight="bold" fontSize="sm">
              {reply.username}
            </Text>
            <Text fontSize="xs" color="gray.500">
              1h
            </Text>
          </Box>
        </Flex>
        <Flex gap={2} align="center">
          <IconButton
            icon={reply.likes ? <AiFillHeart color="red" /> : <FiHeart />}
            onClick={onLike}
            animation={reply.likes ? `${bounce} 0.5s ease` : undefined}
            variant="ghost"
          />
          <Text fontSize="sm">{reply.likes}</Text>
          <Icon as={FiMoreHorizontal} />
        </Flex>
      </Flex>

      <Text mt={2}>{reply.text}</Text>
      <Text color="blue.500" fontSize="sm" cursor="pointer" mt={1}>
        Reply
      </Text>
    </Box>
  );
};

export default Comments;
