import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import Following from "../components/Following";
import Random from "../components/Random";
import Icons from "../components/Icons";
import { Box, Flex, Text } from "@chakra-ui/react";

const Home = () => {

  const [activeIndex, setActiveIndex] = useState(() => {
    const savedIndex = localStorage.getItem("activeIndex");
    return savedIndex !== null ? Number(savedIndex) : 0;
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveIndex((prev) => Math.min(prev + 1, 1)),
    onSwipedRight: () => setActiveIndex((prev) => Math.max(prev - 1, 0)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    localStorage.setItem("activeIndex", activeIndex);
  }, [activeIndex]);

  // If still loading, show a loader or nothing
 

  return (
    <>
      <Box
        {...handlers}
        width="100vw"
        height="100vh"
        overflow="hidden"
        position="relative"
        mx="auto"
        pb="20"
      >
        {/* Centered Header with active tab indication */}
        <Flex
          w="full"
          justify="center"
          alignItems="center"
          position="absolute"
          top={0}
          zIndex={1}
          mt={4}
        >
          <Flex
            maxW="300px"
            w="full"
            justify="space-between"
            alignItems="center"
          >
            <Box
              textAlign="center"
              flex="1"
              cursor="pointer"
              onClick={() => setActiveIndex(0)}
            >
              <Text fontWeight="bold">For You</Text>
              {activeIndex === 0 && (
                <Box w="80%" h="3px" bg="blue.300" mt="2" mx="auto" />
              )}
            </Box>
            <Box
              textAlign="center"
              flex="1"
              cursor="pointer"
              onClick={() => setActiveIndex(1)}
            >
              <Text fontWeight="bold">Following</Text>
              {activeIndex === 1 && (
                <Box w="80%" h="3px" bg="blue.300" mt="2" mx="auto" />
              )}
            </Box>
          </Flex>
        </Flex>

        {/* Content container for Random and Following */}
        <Flex
          transform={`translateX(-${activeIndex * 100}vw)`}
          transition="transform 0.4s ease"
          width="200vw"
          height="calc(100vh - 50px)"
          mt="50px"
        >
          {/* Random component with header on top */}
          <Box
            width="100vw"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            pt="4"
          >
            <Random />
          </Box>

          {/* Following component with header on top */}
          <Box
            width="100vw"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            pt="4"
          >
            <Following />
          </Box>
        </Flex>
      </Box>
      {/* Icons Component */}
      <Icons />
    </>
  );
};

export default Home;
