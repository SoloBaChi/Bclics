import React, { useState } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Text,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { SearchIcon, CheckIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import Icons from "../components/Icons";

const chatData = [
  {
    id: 1,
    username: "John Doe",
    lastMessage: "Hey, how are you doing? I was just thinking...",
    timestamp: "10:18am",
    seen: true,
    avatarUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    username: "Jane Smith",
    lastMessage: "Let’s catch up tomorrow!",
    timestamp: "Yesterday",
    seen: false,
    avatarUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    username: "Alice Brown",
    lastMessage: "Sent the report. Let me know if you need anything...",
    timestamp: "10/30/24",
    seen: true,
    avatarUrl: "https://via.placeholder.com/150",
  },
];

const truncateText = (text, maxLength) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

const MessagesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState("");

  const handleAvatarClick = (url) => {
    setSelectedImage(url);
    onOpen();
  };

  return (
    <Box
      w={{ base: "full", sm: "80%", md: "60%", lg: "50%", xl: "40%" }}
      maxW="600px"
      mb={"3rem"}
      mx="auto"
      p={4}
    >
      {/* Search Bar */}
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.500" />
        </InputLeftElement>
        <Input placeholder="Search" variant="filled" />
      </InputGroup>

      {/* Chat List */}
      {chatData.map((chat) => (
        <Flex
          key={chat.id}
          align="center"
          justify="space-between"
          p={4}
          mb={2}
          borderRadius="md"
          _hover={{ bg: "gray.400" }}
          cursor="pointer"
        >
          <Flex align="center">
            <Avatar
              src={chat.avatarUrl}
              mr={4}
              onClick={() => handleAvatarClick(chat.avatarUrl)}
              cursor="pointer"
            />
            <Box as={RouterLink} to="/MessageContainer">
              <Text fontWeight="bold">{chat.username}</Text>
              <Text color="gray.500" fontSize="sm">
                {truncateText(chat.lastMessage, 25)}
              </Text>
            </Box>
          </Flex>

          <Box as={RouterLink} to="/MessageContainer" textAlign="right">
            <Text fontSize="xs" color="gray.500">
              {chat.timestamp}
            </Text>
            <Icon
              as={CheckIcon}
              color={chat.seen ? "blue.500" : "gray.500"}
              boxSize={4}
              mt={1}
            />
          </Box>
        </Flex>
      ))}

      <Icons />

      {/* Modal for displaying large image */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          maxW="80%"
          maxH="80vh"
          bg="transparent"
          boxShadow="none"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ModalCloseButton color="white" size="lg" zIndex={10} />
          <Box p={4} borderRadius="md">
            <Image
              src={selectedImage}
              alt="Enlarged avatar"
              borderRadius="md"
              maxH="80vh"
              maxW="100%"
            />
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MessagesPage;
