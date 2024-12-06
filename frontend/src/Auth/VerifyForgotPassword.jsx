import React from 'react'
import {
    Box,
    useToast,
    Spinner,
  } from "@chakra-ui/react";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
  import { Link , useNavigate } from "react-router-dom";
  import { useState } from "react";

const VerifyForgotPassword = () => {
    const [inputs, setInputs] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const toast = useToast();
    const[loading,setLoading] = useState(false)
    const navigate = useNavigate();
    const[otpInput,setOtpInput] = useState(Array(5).fill(""))
    const email = `solobachi02@gmail.com`
  
       // Function to mask part of the email
       const maskEmail = (email) => {
        if (!email) return '';
    
        const [localPart, domain] = email.split('@');
        
        // Show first 3 letters of the local part and last 3 characters
        const maskedLocalPart = localPart.substring(0, 3) + '*******' + localPart.slice(-2);
    
        return `${maskedLocalPart}@${domain}`;
      };
    
    
    
      // Handle Change
      const handleChange = (e,i) => {
        setOtpInput((prev) => ([...prev.map((item,index) => (index === i ? e.target.value : item ))]))
    
         //When  you have one element in one box move to the next box
         if(e.target.value && e.target.nextSibling){
          e.target.nextSibling.focus();
         }
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

         <h4 className="text-center text-2xl font-medium">Please check your email</h4>
         <p className='text-center'>Enter the code we sent to {maskEmail(email)}</p>
         <div className="form-field otp-field">
          {otpInput.map((data, i) => (
            <input
            key={i}
            type="text"
            onChange={(e) => handleChange(e, i)}
            value={data}
            maxLength={1}
            />
           ))}
        </div>
        
        <div className="form-field otp-field">
          <button className="font-medium text-white text-md border inline-block w-full 
            p-2.5 rounded-full bg-blue-500 disabled:bg-blue-100" 
          disabled={!otpInput[otpInput.length - 1]}>
           {
             loading ? <Spinner animationDuration="0.8s"/> : "Confirm"
           }
          </button>
        </div>

        <div className="not_received">
          <p className='text-center'>Haven't received it ? <Link className='inline-block font-[600] text-[var(--green-color)]' to="/forgot-password">Resend code</Link> </p>
        </div>
    
      </form>
    </Box>
  </Box>
  )
}

export default VerifyForgotPassword