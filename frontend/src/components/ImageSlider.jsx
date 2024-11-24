import React, { useState } from 'react';
import { Box, IconButton, Flex, Text, Image,useColorMode, useColorModeValue, } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const ImageSlider = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;
  let touchStartX = 0;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) handleNext(); // Swipe left for next
    if (touchStartX - touchEndX < -50) handlePrev(); // Swipe right for previous
  };
  const bgColor = useColorModeValue("gray.50", "gray.800");

  return (
    <Box
      position="relative"
      width="full"
      height="500px"
      overflow="hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {totalImages > 0 ? (
        <>
          {/* Image Count */}
          <Box
            position="absolute"
            top="4"
            right="4"
            bg="rgba(0, 0, 0, 0.6)"
            color="white"
            px="2"
            py="1"
            borderRadius="md"
            fontSize="md"
            fontWeight="bold"
          >
            {`${currentIndex + 1} / ${totalImages}`}
          </Box>

          {/* Image */}
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            objectFit="cover"
            width="full"
            height="full"
          />

          {/* Left Arrow */}
          <IconButton
            icon={<ChevronLeftIcon boxSize="2em" />}
            aria-label="Previous image"
            variant="unstyled"
            onClick={handlePrev}
            position="absolute"
            left="2"
            top="50%"
            transform="translateY(-50%)"
            color="bgColor"
            _hover={{ color: 'gray.500' }}
          />

          {/* Right Arrow */}
          <IconButton
            icon={<ChevronRightIcon boxSize="2em" />}
            aria-label="Next image"
            variant="unstyled"
            onClick={handleNext}
            position="absolute"
            right="2"
            top="50%"
            transform="translateY(-50%)"
            color="bgColor"
            _hover={{ color: 'gray.500' }}
          />
        </>
      ) : (
        <Text>No images available</Text>
      )}
    </Box>
  );
};

export default ImageSlider;
