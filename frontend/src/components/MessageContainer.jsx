import React, { useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Image,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowBackIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { FiMoreVertical, FiImage } from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa";

const chatData = [
  {
    id: 1,
    username: "Alex",
    text: "Hey! How’s it going?",
    timestamp: "12:22pm",
    sender: "other",
  },
  {
    id: 2,
    username: "You",
    text: "I'm good, thanks! What about you?",
    timestamp: "12:23pm",
    sender: "me",
  },
  {
    id: 3,
    username: "Alex",
    image: "https://via.placeholder.com/150",
    timestamp: "12:24pm",
    sender: "other",
  },
  {
    id: 4,
    username: "You",
    text: "Looks awesome!",
    timestamp: "12:25pm",
    sender: "me",
  },
  {
    id: 5,
    username: "Alex",
    text: "Yeah! Can't wait for the weekend.",
    timestamp: "12:26pm",
    sender: "other",
  },
  {
    id: 6,
    username: "You",
    image: "https://via.placeholder.com/150",
    timestamp: "12:27pm",
    sender: "me",
  },
];

const MessageContainer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [highlightedChat, setHighlightedChat] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleHighlight = (chat) => {
    setHighlightedChat(chat);
  };

  const handleCloseHighlight = () => {
    setHighlightedChat(null);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    onOpen();
  };

  const handleSendMessage = () => {
    // Send message functionality here
  };

  const handleImageUpload = () => {
    // Open file selector
    document.getElementById("file-input").click();
  };

  const [isOnline, setIsOnline] = useState(true); // true = online, false = offline

  return (
    <Box
      w={{ base: "full", sm: "80%", md: "60%", lg: "50%", xl: "40%" }}
      maxW="600px"
      mx="auto"
      h="100vh"
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <Flex
        align="center"
        p={4}
        boxShadow="md"
        position="sticky"
        top="0"
        zIndex="10"
        w="full"
      >
        <ArrowBackIcon
          w={6}
          h={6}
          cursor="pointer"
          onClick={() => window.history.back()}
        />

        <Box as={RouterLink} to="/UserPage">
          <Avatar src="https://via.placeholder.com/150" mx={3} />
        </Box>

        <Text fontWeight="bold" as={RouterLink} to="/UserPage">
          Alex
        </Text>

        <Flex flex="1" align="center" justify="center">
          {/* Online/Offline Status */}
          <Text
            ml={2}
            fontSize="sm"
            fontWeight="medium"
            color={isOnline ? "green.400" : "red.400"}
          >
            {isOnline ? "Online" : "Offline"}
          </Text>
        </Flex>

        <Icon as={FiMoreVertical} w={6} h={6} cursor="pointer" />
      </Flex>

      {/* Chat Messages */}
      <Box
        flex="1"
        overflowY="auto"
        p={4}
        display="flex"
        flexDirection="column"
        gap={4}
      >
        {chatData.map((chat) => (
          <Flex
            key={chat.id}
            align="center"
            justify={chat.sender === "me" ? "flex-end" : "flex-start"}
            onClick={() => handleHighlight(chat)}
            p={1}
            borderRadius="md"
            cursor="pointer"
          >
            <Box
              bg={chat.sender === "me" ? "green.600" : "gray.500"}
              borderRadius="lg"
              p={2}
              maxW="70%"
              position="relative"
            >
              {chat.image ? (
                <Image
                  src={chat.image}
                  boxSize="200px"
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => handleImageClick(chat.image)}
                />
              ) : (
                <Text>{chat.text}</Text>
              )}
              <Text fontSize="xs" mt={1} textAlign="right">
                {chat.timestamp}
              </Text>
            </Box>
          </Flex>
        ))}
      </Box>

      {/* Highlighted Chat Reply Section */}
      {highlightedChat && (
        <Box
          bg="green.600"
          borderRadius="lg"
          maxW="99%"
          p={2}
          textAlign="center"
          justifyContent="center"
          position="relative"
        >
          <Text fontWeight="bold">
            {highlightedChat.sender === "me" ? "You" : highlightedChat.username}
          </Text>
          <Text fontSize="sm">
            {highlightedChat.image ? "Image" : highlightedChat.text}
          </Text>
          <Icon
            as={CloseIcon}
            m={1}
            position="absolute"
            top="4px"
            right="4px"
            w={3.5}
            h={3.5}
            cursor="pointer"
            onClick={handleCloseHighlight}
          />
        </Box>
      )}

      {/* Message Input */}
      <Box p={4} boxShadow="lg">
        <InputGroup>
          <Textarea
            placeholder="Type a message"
            focusBorderColor="gray.500"
            w="89%"
            variant="filled"
            resize="none"
            rows={1}
            maxH="8rem" // Approx 5 lines in height
            overflowY="auto"
            sx={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "gray.500",
                borderRadius: "full",
              },
            }}
          />
          <InputRightElement>
            <Icon
              as={FiImage}
              mr={2}
              cursor="pointer"
              onClick={handleImageUpload}
            />

            <FaPaperPlane cursor="pointer" onClick={handleSendMessage} />
          </InputRightElement>
          {/* Hidden file input for image selection */}
          <input
            type="file"
            id="file-input"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                console.log("Selected file:", file);
              }
            }}
          />
        </InputGroup>
      </Box>

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
              alt="Enlarged view"
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

export default MessageContainer;
