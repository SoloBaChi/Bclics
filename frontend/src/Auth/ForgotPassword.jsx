import {
  Box,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
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
          mx="auto"
          textAlign="center"
          className="basis-[100%] sm:basis-[72%] lg:basis-[48%] xl:basis-[32%]"
        >
          <form onSubmit={handleSubmit}>
            <div className="form-field rounded-md mb-4">
            <label htmlFor="email">
             Enter the email or username associated with your account to change your password.
            </label>
              <input type="text" 
              className="border rounded-md focus:border-2 focus:border-blue-400" 
              placeholder="Email or Username"
              id="email"
               />
            </div>
        
            <div className="form-field mb-4">
            <button 
            onClick={navigate("/verify-forgot-password")}
            className="font-medium text-white text-md border inline-block w-full 
            p-2.5 rounded-full bg-blue-500">
            {
             loading ? <Spinner animationDuration="0.8s"/> : "Proceed"
            }
              </button>
          </div>
          </form>
        </Box>
      </Box>
    );
}

export default ForgotPassword