import React, { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

const UpdateProfile = () => {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    password: "",
  });
  const fileRef = useRef(null);
  const [imgUrl, setImgUrl] = useState("");
  const toast = useToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgUrl(url);
      // Optional: Store the image file for backend upload
      setInputs({ ...inputs, avatar: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append fields to the FormData object
      Object.keys(inputs).forEach((key) => {
        if (inputs[key]) formData.append(key, inputs[key]);
      });

      // API call to update user profile
      const res = await fetch("/api/users/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with actual auth token retrieval method
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Update failed",
          description: data.message || "Could not update profile.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      toast({
        title: "Profile updated successfully!",
        description: "Your changes have been saved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Clear inputs if needed
      setInputs({
        name: "",
        username: "",
        email: "",
        bio: "",
        password: "",
      });
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6} maxWidth="600px" mx="auto">
      <form onSubmit={handleSubmit}>
        <Flex align={"center"} justify={"center"} my={6}>
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
          >
            {/* Page Title */}
            <Heading
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl" }}
              textAlign="center"
            >
              Update Profile
            </Heading>

            {/* Avatar Upload */}
            <FormControl>
              <Stack direction={["column", "row"]} spacing={6} align="center">
                <Center>
                  <Avatar size="xl" boxShadow={"md"} src={imgUrl} />
                </Center>
                <Center>
                  <Button onClick={() => fileRef.current.click()}>
                    Change Avatar
                  </Button>
                  <Input
                    type="file"
                    hidden
                    ref={fileRef}
                    onChange={handleImageChange}
                  />
                </Center>
              </Stack>
            </FormControl>

            {/* Profile Details */}
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="Full Name"
                value={inputs.name}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Username"
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="your-email@example.com"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                type="email"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Input
                placeholder="Your Bio..."
                value={inputs.bio}
                onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                type="password"
              />
            </FormControl>

            {/* Submit and Cancel Buttons */}
            <Stack spacing={4} direction="row" justify="space-between">
              <Button
                w="full"
                colorScheme="red"
                onClick={() =>
                  setInputs({
                    name: "",
                    username: "",
                    email: "",
                    bio: "",
                    password: "",
                  })
                }
              >
                Cancel
              </Button>
              <Button type="submit" w="full" colorScheme="green">
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </form>
    </Box>
  );
};

export default UpdateProfile;
