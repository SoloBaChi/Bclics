import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  VStack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSwipeable } from "react-swipeable";
import { SearchIcon } from "@chakra-ui/icons";
import Icons from "../components/Icons";
import SearchUser from "../components/SearchUser";
import SearchProduct from "../components/SearchProduct";
import { keyframes } from "@emotion/react";

const SearchBar = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false);

  // Fun loading animation for search icon
  const rotateAnimation = keyframes`
    0% { transform: rotate(0); }
    100% { transform: rotate(360deg); }
  `;

  useEffect(() => {
    localStorage.setItem("activeIndex", activeSlide);
  }, [activeSlide]);

  // Search icon click handler
  const handleSearchClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  // Handlers for swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveSlide((prev) => (prev === 0 ? 1 : prev)),
    onSwipedRight: () => setActiveSlide((prev) => (prev === 1 ? 0 : prev)),
    trackMouse: true,
  });

  const bgColor = useColorModeValue("gray.50", "gray.800");

  return (
    <Box
      w={{ base: "full", sm: "80%", md: "60%", lg: "50%", xl: "40%" }}
      maxW="600px"
      mx="auto"
      p={4}
    >
      {/* Fixed Header Section */}
      <Box
        position="fixed"
        top="0"
        w="90%"
        maxW="600px"
        bg={bgColor}
        zIndex="10"
        py={2}
        boxShadow="md"
      >
        {/* Search Bar */}
        <VStack spacing={4}>
          <InputGroup size="lg">
            <Input
              placeholder="Search for products, services, and more..."
              focusBorderColor="gray.500"
              boxShadow="md"
            />
            <InputRightElement>
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                size="lg"
                onClick={handleSearchClick}
                isLoading={isLoading}
                animation={
                  isLoading ? `${rotateAnimation} 1s infinite linear` : "none"
                }
              />
            </InputRightElement>
          </InputGroup>
        </VStack>

        {/* Header with Tabs */}
        <Flex justifyContent="space-between" mt={4}>
          <Box>
            <Text
              fontWeight="bold"
              pb={2}
              cursor="pointer"
              onClick={() => setActiveSlide(0)}
            >
              Users
            </Text>
            {activeSlide === 0 && (
              <Box w="100%" h="3px" bg="blue.300" mt="2" mx="auto" />
            )}
          </Box>
          <Box>
            <Text
              fontWeight="bold"
              pb={2}
              cursor="pointer"
              onClick={() => setActiveSlide(1)}
            >
              Posts
            </Text>
            {activeSlide === 1 && (
              <Box w="100%" h="3px" bg="blue.300" mt="2" mx="auto" />
            )}
          </Box>
        </Flex>
      </Box>

      {/* Main Content - Offset by height of fixed header */}
      <Box w="100%" mt="8rem" {...handlers} mb="3rem">
        {activeSlide === 0 ? <SearchUser /> : <SearchProduct />}
      </Box>

      <Icons />
    </Box>
  );
};

export default SearchBar;
