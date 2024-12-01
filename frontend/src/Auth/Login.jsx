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
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function Login() {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const toast = useToast();
  const[loading,setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
     setLoading(true)
    const { username, password } = inputs;

    // Validate if fields are empty
    if (!username || !password) {
      const missingFields = [];
      if (!username) missingFields.push("Email or Username");
      if (!password) missingFields.push("Password");
      toast({
        title: "Missing fields",
        description: `Please provide: ${missingFields.join(", ")}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false)
      return;
    }

    try {
       const res = await fetch("https://bclics-app.vercel.app/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
        credentials: 'include',  // Ensure cookies are included in the request
      });

      const data = await res.json();

      // Handle server responses
      if (!res.ok) {
        toast({
          title: "Login failed",
          description: data.message || "Invalid login credentials.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Success
      toast({
        title: "Login successful!",
        description: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/dashboard"); // Redirect to home page on successful login
    } catch (error) {
      // Handle unexpected errors
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={6}
    >
      <Box
        p={6}
        boxShadow="lg"
        borderRadius="md"
        maxW="400px"
        w="full"
        mx="auto"
        textAlign="center"
      >
        <Heading as="h2" size="xl" color="blue.400" mt={0} mb={5}>
          Bclics
        </Heading>
        <Heading as="h3" size="lg" mb={4}>
          Login
        </Heading>

        <VStack spacing={4} align="stretch">
          <Input
            name="username"
            placeholder="Email or Username"
            value={inputs.username}
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
          <Button colorScheme="blue" w="full" onClick={handleSubmit}>
            {
            loading ? <Spinner animationDuration="0.8s"/> : "Login"
            }
          </Button>
          <Text textAlign="center">
            Don't have an account?{" "}
            <Link as={RouterLink} to="/signup" color="blue.500">
              Signup
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default Login;
