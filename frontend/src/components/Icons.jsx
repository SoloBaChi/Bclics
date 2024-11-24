import { Flex, IconButton, useColorModeValue } from "@chakra-ui/react";
import {
  FiHome,
  FiSearch,
  FiSettings,
  FiPlusSquare,
  FiMessageSquare,
  FiUser,
  FiAlertCircle,
} from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";

const BottomNav = () => {
  // Colors that adapt to color mode
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const iconColor = useColorModeValue("gray.800", "gray.50");

  return (
    <Flex
      as="nav"
      position="fixed"
      bottom="0"
      left="50%"
      transform="translateX(-50%)"
      w={{ base: "full", sm: "80%", md: "60%", lg: "50%", xl: "40%" }}
      maxW="600px"
      bg={bgColor}
      py={2}
      justifyContent="space-around"
      borderTop="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      zIndex="1000"
    >
      {/* Icons */}
      <IconButton
        icon={<FiHome />}
        aria-label="Home"
        color={iconColor}
        fontSize="24px"
        _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
        as={RouterLink}
        to="/Home"
      />
      <IconButton
        icon={<FiSearch />}
        aria-label="Search"
        color={iconColor}
        fontSize="24px"
        _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
        as={RouterLink}
        to="/SearchPage"
      />

      <IconButton
        icon={<FiSettings />}
        aria-label="Settings"
        color={iconColor}
        fontSize="24px"
        _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
        as={RouterLink}
        to="/Settings"
      />

      <IconButton
        icon={<FiPlusSquare />}
        aria-label="New Post"
        color={iconColor}
        fontSize="24px"
        _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
        as={RouterLink}
        to="/UploadPage"
      />
      <IconButton
        icon={<FiMessageSquare />}
        aria-label="Messages"
        color={iconColor}
        fontSize="24px"
        _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
        as={RouterLink}
        to="/MessagesPage"
      />
      <IconButton
        icon={<FiUser />}
        aria-label="Profile"
        color={iconColor}
        fontSize="24px"
        _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
        as={RouterLink}
        to="/UserPage"
      />
      <IconButton
        icon={<FiAlertCircle />}
        aria-label="Ads"
        color={iconColor}
        fontSize="24px"
        _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
        as={RouterLink}
        to="/AdvertisePage"
      />
    </Flex>
  );
};

export default BottomNav;
