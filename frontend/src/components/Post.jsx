import React, { useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  Text,
  Icon,
  Button,
  Heading,
  Image,
  keyframes,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { FiHeart, FiMessageCircle, FiShare, FiBookmark } from "react-icons/fi";
import { AiFillHeart, AiFillSave } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import ImageSlider from "./ImageSlider";

const bounce = keyframes`
  0% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
`;

const Post = () => {
  const [showMore, setShowMore] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [showSaveAnimation, setShowSaveAnimation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleShowMoreToggle = () => setShowMore(!showMore);

  const handleLikeToggle = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
    }
    setShowHeartAnimation(true);
    setTimeout(() => setShowHeartAnimation(false), 500);
  };

  const handleImageDoubleClick = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(likeCount + 1);
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 500);
    }
  };

  const handleSaveToggle = () => {
    setSaved(!saved);
    setShowSaveAnimation(true);
    setTimeout(() => setShowSaveAnimation(false), 500);
  };

  const images = [
    "https://via.placeholder.com/800x500?text=Image+1",
    "https://via.placeholder.com/800x500?text=Image+2",
    "https://via.placeholder.com/800x500?text=Image+3",
  ];

  const descriptionText =
    "This is the full dummy text description of the post that contains more than three lines of content and needs to be truncated.";

  const isTextLong = descriptionText.split(" ").length > 15;

  const openImageModal = () => {
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Flex
      direction="column"
      p={5}
      boxShadow="lg"
      borderRadius="md"
      maxW="600px"
      mx="auto"
      my={8}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Flex align="center" gap={3} as={RouterLink} to="/UserPage">
          <Avatar
            size="md"
            name="Dummy User"
            src="/dummy-profile-pic.png"
            onClick={() => navigate(`/dummyuser`)}
            cursor="pointer"
          />
          <Flex direction="column">
            <Text
              fontSize="sm"
              fontWeight="bold"
              cursor="pointer"
              onClick={() => navigate(`/dummyuser`)}
            >
              dummyuser
            </Text>
          </Flex>
        </Flex>
        <Flex align="center" gap={3}>
          <Text fontSize="xs" color="gray.500">
            3 hours ago
          </Text>
          <DeleteIcon cursor="pointer" />
        </Flex>
      </Flex>

      {images && images.length > 0 && (
        <>
          <Box
            borderRadius="md"
            overflow="hidden"
            mb={4}
            maxH="25rem"
            onDoubleClick={handleImageDoubleClick}
            position="relative"
            onClick={openImageModal} // Open modal on click
            cursor="pointer"
          >
            {images.length > 1 ? (
              <ImageSlider images={images} />
            ) : (
              <Image src={images[0]} alt="Single Image" />
            )}
            {showHeartAnimation && (
              <Icon
                as={AiFillHeart}
                color="red.500"
                alignItems="center"
                justifyContent="center"
                w={250}
                h={250}
                position="absolute"
                top="29%"
                left="29%"
                transform="translate(-50%, -50%)"
                animation={`${bounce} 0.5s ease`}
                zIndex={1}
              />
            )}
          </Box>

          <Modal isOpen={isModalOpen} onClose={closeImageModal} isCentered>
            <ModalOverlay />
            <ModalContent
              maxW={{ base: "90%", lg: "60%" }}
              bg="transparent"
              boxShadow="none"
            >
              <ModalCloseButton color="white" size="lg" zIndex={10} />
              <Box p={4} borderRadius="md">
                {images.length > 1 ? (
                  <ImageSlider images={images} />
                ) : (
                  <Image src={images[0]} alt="Single Image" />
                )}
              </Box>
            </ModalContent>
          </Modal>

          <Flex justify="space-between" align="center" mb={4}>
            <Flex align="center" gap={6}>
              <Flex
                align="center"
                gap={1}
                cursor="pointer"
                onClick={handleLikeToggle}
              >
                <Box position="relative">
                  {showHeartAnimation && (
                    <Icon
                      as={AiFillHeart}
                      color="red.500"
                      w={7}
                      h={7}
                      position="absolute"
                      top="-15px"
                      animation={`${bounce} 0.5s ease`}
                    />
                  )}
                  <Icon
                    as={liked ? AiFillHeart : FiHeart}
                    color={liked ? "red.500" : "gray.400"}
                    w={5}
                    h={5}
                  />
                </Box>
                <Text fontSize="sm" color={liked ? "red.500" : "gray.400"}>
                  {likeCount}
                </Text>
              </Flex>

              <Flex as={RouterLink} to="/CommentsPage">
                <Icon
                  as={FiMessageCircle}
                  w={5}
                  h={5}
                  color="gray.400"
                  cursor="pointer"
                />
                <Text fontSize="sm" color="gray.400">
                  2
                </Text>
              </Flex>

              <Icon
                as={FiShare}
                w={5}
                h={5}
                color="gray.400"
                cursor="pointer"
              />
            </Flex>

            <Box
              p={1}
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              onClick={handleSaveToggle}
              position="relative"
            >
              {showSaveAnimation && (
                <Icon
                  as={AiFillSave}
                  color="blue.500"
                  w={6}
                  h={6}
                  position="absolute"
                  top="-10px"
                  animation={`${bounce} 0.5s ease`}
                />
              )}
              <Icon
                as={saved ? AiFillSave : FiBookmark}
                color={saved ? "blue.500" : "gray.400"}
                w={5}
                h={5}
              />
            </Box>
          </Flex>
        </>
      )}

      <Box mb={4}>
        <Heading size="md" mb={2}>
          Dummy Header
        </Heading>
        <Text fontSize="sm" color="green.500" fontWeight="bold">
          ₦1000
        </Text>
        <Text fontSize="sm" color="blue.400">
          Dummy Location
        </Text>
        <Text fontSize="sm">Condition: New</Text>
        <Text fontSize="sm">Price Point: Premium</Text>
      </Box>

      <Text fontSize="sm" mb={4}>
        {showMore || !isTextLong
          ? descriptionText
          : `${descriptionText.split(" ").slice(0, 15).join(" ")}...`}
        {isTextLong && (
          <Box
            as="span"
            color="blue.500"
            onClick={handleShowMoreToggle}
            cursor="pointer"
          >
            {showMore ? " Less" : " More"}
          </Box>
        )}
      </Text>

      <Flex mt={4} gap={3}>
        <Button
          borderColor="blue.400"
          color="blue.400"
          variant="outline"
          onClick={() => setShowNumber(!showNumber)}
        >
          {showNumber ? "08012345678" : "Show Number"}
        </Button>
        <Button
          as={RouterLink}
          to="/MessageContainer"
          bg="blue.400"
          color="white"
          _hover={{ bg: "blue.500" }}
        >
          Message
        </Button>
      </Flex>

      {images && images.length === 0 && (
        <>
          <Flex justify="space-between" align="center" mt={"1.5rem"} mb={4}>
            <Flex align="center" gap={6}>
              <Flex
                align="center"
                gap={1}
                cursor="pointer"
                onClick={handleLikeToggle}
              >
                <Box position="relative">
                  {showHeartAnimation && (
                    <Icon
                      as={AiFillHeart}
                      color="red.500"
                      w={7}
                      h={7}
                      position="absolute"
                      top="-15px"
                      animation={`${bounce} 0.5s ease`}
                    />
                  )}
                  <Icon
                    as={liked ? AiFillHeart : FiHeart}
                    color={liked ? "red.500" : "gray.400"}
                    w={5}
                    h={5}
                  />
                </Box>
                <Text fontSize="sm" color={liked ? "red.500" : "gray.400"}>
                  {likeCount}
                </Text>
              </Flex>

              <Flex as={RouterLink} to="/CommentsPage">
                <Icon
                  as={FiMessageCircle}
                  w={5}
                  h={5}
                  color="gray.400"
                  cursor="pointer"
                />
                <Text fontSize="sm" color="gray.400">
                  2
                </Text>
              </Flex>

              <Icon
                as={FiShare}
                w={5}
                h={5}
                color="gray.400"
                cursor="pointer"
              />
            </Flex>

            <Box
              p={1}
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              onClick={handleSaveToggle}
              position="relative"
            >
              {showSaveAnimation && (
                <Icon
                  as={AiFillSave}
                  color="blue.500"
                  w={6}
                  h={6}
                  position="absolute"
                  top="-10px"
                  animation={`${bounce} 0.5s ease`}
                />
              )}
              <Icon
                as={saved ? AiFillSave : FiBookmark}
                color={saved ? "blue.500" : "gray.400"}
                w={5}
                h={5}
              />
            </Box>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default Post;
