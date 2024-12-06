import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Heading,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";

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
  const[loading,setLoading] = useState(false)

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true)
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
      setLoading(false)
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
      const res = await fetch("https://bclics-app.vercel.app/api/users/signup", {
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
    finally{
    setLoading(false)
    }
  };

  return (
    // <Box
    //   display="flex"
    //   alignItems="center"
    //   justifyContent="center"
    //   minHeight="100vh"
    // >
    //   <Box
    //     p={6}
    //     boxShadow="lg"
    //     borderRadius="md"
    //     maxW="400px"
    //     w="full"
    //     mx="auto"
    //   >
    //     <Box textAlign="center" mb={8}>
    //       <Heading as="h2" size="xl" color="blue.400" mt={0} mb={5}>
    //         Bclics
    //       </Heading>
    //       <Heading as="h3" size="lg" mb={4}>
    //         Signup
    //       </Heading>
    //     </Box>

    //     <VStack spacing={4} align="stretch">
    //       <Input
    //         name="name"
    //         placeholder="Full Name"
    //         value={inputs.name}
    //         onChange={handleChange}
    //       />
    //       <Input
    //         name="username"
    //         placeholder="Username"
    //         value={inputs.username}
    //         onChange={handleChange}
    //       />
    //       <Input
    //         name="email"
    //         placeholder="Email"
    //         type="email"
    //         value={inputs.email}
    //         onChange={handleChange}
    //       />
    //       <InputGroup>
    //         <Input
    //           name="password"
    //           placeholder="Password"
    //           type={showPassword ? "text" : "password"}
    //           value={inputs.password}
    //           onChange={handleChange}
    //         />
    //         <InputRightElement>
    //           <IconButton
    //             variant="ghost"
    //             icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
    //             onClick={() => setShowPassword(!showPassword)}
    //           />
    //         </InputRightElement>
    //       </InputGroup>
    //       <InputGroup>
    //         <Input
    //           name="confirmPassword"
    //           placeholder="Confirm Password"
    //           type={showConfirmPassword ? "text" : "password"}
    //           value={inputs.confirmPassword}
    //           onChange={handleChange}
    //         />
    //         <InputRightElement>
    //           <IconButton
    //             variant="ghost"
    //             icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
    //             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    //           />
    //         </InputRightElement>
    //       </InputGroup>
    //       <Button colorScheme="blue" w="full" onClick={handleSubmit}>
    //        {
    //         loading ? <Spinner animationDuration="0.8s"/> : "Sign Up"
    //        } 
    //       </Button>
    //       <Text textAlign="center">
    //         Have an account?{" "}
    //         <Link as={RouterLink} to="/" color="blue.500">
    //           Login
    //         </Link>
    //       </Text>
    //     </VStack>
    //   </Box>
    // </Box>
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
      mx="auto"
      textAlign="center"
      className="basis-[100%] sm:basis-[72%] lg:basis-[48%] xl:basis-[32%]"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-field rounded-md mb-4">
          <input type="text" 
          className="border rounded-md focus:border-2 focus:border-blue-400" 
          placeholder="Full Name"
           />
        </div>
        <div className="form-field rounded-md mb-4">
          <input type="text" 
          className="border rounded-md focus:border-2 focus:border-blue-400" 
          placeholder="Username"
           />
        </div>
        <div className="form-field rounded-md mb-4">
          <input type="email" 
          className="border rounded-md focus:border-2 focus:border-blue-400" 
          placeholder="Email"
           />
        </div>
        <div className="form-field rounded-md mb-8">
         <InputGroup>
         <input type="password" 
          className="border rounded-md focus:border-2 focus:border-blue-400" 
          placeholder="Password"
           />
            <InputRightElement>
            <IconButton
              variant="ghost"
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setShowPassword(!showPassword)}
            />
          </InputRightElement>
          </InputGroup>
        </div>
        <div className="form-field rounded-md mb-8">
         <InputGroup>
         <input type="password" 
          className="border rounded-md focus:border-2 focus:border-blue-400" 
          placeholder="Confirm Password"
           />
            <InputRightElement>
            <IconButton
              variant="ghost"
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setShowPassword(!showPassword)}
            />
          </InputRightElement>
          </InputGroup>
        </div>
        <div className="form-field mb-4">
          <button className="font-medium text-white text-md border inline-block w-full 
          p-2.5 rounded-full bg-blue-500">
          {
           loading ? <Spinner animationDuration="0.8s"/> : "Register"
          }
            </button>
        </div>
        <div className="flex flex-col sm:flex-row justify-center">
          <p>
          Have an account?{" "}
          <Link to="/" className="text-blue-500 font-medium">
            Login
          </Link>
          </p>
        </div>
      </form>
    </Box>
  </Box>
  );
}

export default Signup;
