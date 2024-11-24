import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  Link,
  VStack,
  Heading,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function Signup() {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Validate inputs
    const missingFields = [];
    if (!inputs.name) missingFields.push("Full Name");
    if (!inputs.username) missingFields.push("Username");
    if (!inputs.email) missingFields.push("Email");
    if (!inputs.password) missingFields.push("Password");
    if (!inputs.confirmPassword) missingFields.push("Confirm Password");

    if (missingFields.length > 0) {
      toast({
        title: "Missing Fields",
        description: `Please fill the following fields: ${missingFields.join(", ")}`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    if (inputs.password !== inputs.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputs.name,
          username: inputs.username,
          email: inputs.email,
          password: inputs.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Signup Failed",
          description: data.message || "An error occurred during signup.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return;
      }

      toast({
        title: "Signup Successful!",
        description: "You can now log in with your credentials.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "An Error Occurred",
        description: error.message || "Something went wrong. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box
        p={6}
        boxShadow="lg"
        borderRadius="md"
        maxW="400px"
        w="full"
        mx="auto"
      >
        <Box textAlign="center" mb={8}>
          <Heading as="h2" size="xl" color="blue.400" mt={0} mb={5}>
            Bclics
          </Heading>
          <Heading as="h3" size="lg" mb={4}>
            Signup
          </Heading>
        </Box>

        <VStack spacing={4} align="stretch">
          <Input
            name="name"
            placeholder="Full Name"
            value={inputs.name}
            onChange={handleChange}
          />
          <Input
            name="username"
            placeholder="Username"
            value={inputs.username}
            onChange={handleChange}
          />
          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={inputs.email}
            onChange={handleChange}
          />
          <InputGroup>
            <Input
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={inputs.password}
              onChange={handleChange}
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowPassword(!showPassword)}
              />
            </InputRightElement>
          </InputGroup>
          <InputGroup>
            <Input
              name="confirmPassword"
              placeholder="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={inputs.confirmPassword}
              onChange={handleChange}
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </InputRightElement>
          </InputGroup>
          <Button colorScheme="blue" w="full" onClick={handleSubmit}>
            Sign Up
          </Button>
          <Text textAlign="center">
            Have an account?{" "}
            <Link as={RouterLink} to="/login" color="blue.500">
              Login
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default Signup;
