import {
  Box,
  Flex,
  Text,
  VStack,
  Button,
  Avatar,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Image,
  useToast,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { CgMoreO } from "react-icons/cg";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const UserHeader = () => {
  const toast = useToast();
  // const [user, setUser] = useState(null); // Stores user data
  const [following, setFollowing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal control
  const { id } = useParams(); // Get user ID from route params
  const {userData:user} = useAuth();

  // useEffect(() => {
  //   // Fetch user data from backend
  //   const fetchUser = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get(`/api/users/${id}`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       setUser(response.data.user);
  //       setFollowing(response.data.user.following);
  //     } catch (error) {
  //       toast({
  //         status: "error",
  //         description: error.response?.data?.message || error.message,
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     }
  //   };

  //   fetchUser();
  // }, [id, toast]);

  // const handleFollowToggle = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.post(
  //       `/api/users/follow`,
  //       { userId: user._id },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     setFollowing(response.data.following);
  //     toast({
  //       status: "success",
  //       description: response.data.message,
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   } catch (error) {
  //     toast({
  //       status: "error",
  //       description: "Failed to toggle follow status",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   }
  // };

  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        status: "success",
        description: "Profile link copied",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  // if (!user) return null; // Avoid rendering until user data is fetched

  return (
    <Flex w="full" alignItems="start" justifyContent="center" px={4}>
      <Box borderRadius="md" p={6} boxShadow="lg" mt={8}>
        <VStack gap={4} align="start" w="full">
          {/* Header with avatar and username */}
          <Flex w="full" alignItems="center" justifyContent="space-between">
            <Flex direction="column">
              <Text fontSize="2xl" fontWeight="bold">
                {user?.username || "Emezie"}
              </Text>
              <Text fontWeight="medium" color="gray.500">
                {user?.name || "just name"}
              </Text>
            </Flex>
            <Avatar
              name={user?.lastName}
              src={
                user?.profileImage?.url ||
                "https://via.placeholder.com/800x500?text=No+Image"
              }
              size="xl"
              onClick={onOpen} // Open modal on avatar click
              cursor="pointer"
            />
          </Flex>

          {/* Bio section */}
          <Text fontSize="md" color="gray.500">
            {user?.bio || "This user has no bio"}
          </Text>

          {/* Action buttons */}
          <Flex w="full" gap={4} mt={2}>
            <Button as={RouterLink} to="/UpdateProfile" w="full" size="sm">
              Update Profile
            </Button>
            <Button as={RouterLink} to="/FindUsers" w="full" size="sm">
              Explore Users
            </Button>
            <IconButton
              icon={<HamburgerIcon />}
              aria-label="Menu"
              size="sm"
              as={RouterLink}
              to="/Settings"
            />
          </Flex>

          {/* Follow button */}
          <Button
            colorScheme="blue"
            w="full"
            size="sm"
            // onClick={handleFollowToggle}
          >
            {following ? "Unfollow" : "Follow"}
          </Button>

          {/* Followers count and menu */}
          <Flex w="full" justifyContent="space-between" alignItems="center">
            <Text fontWeight="bold">{user?.followers} Followers</Text>
            <Text fontWeight="bold">{user?.following} Following</Text>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<CgMoreO size={20} />}
                aria-label="Options"
              />
              <Portal>
                <MenuList>
                  <MenuItem onClick={copyURL}>Copy Profile Link</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Flex>
        </VStack>

        {/* Modal for displaying large image */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent
            maxW={{ base: "90%", lg: "60%" }}
            bg="transparent"
            boxShadow="none"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ModalCloseButton color="white" size="lg" zIndex={10} />
            <Box p={4} borderRadius="md">
              <Image
                src={
                  user?.profileImage?.url ||
                  "https://via.placeholder.com/800x500?text=No+Image"
                }
                alt="Large profile image"
                borderRadius="md"
                maxH="80vh"
                maxW="100%"
              />
            </Box>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

export default UserHeader;
