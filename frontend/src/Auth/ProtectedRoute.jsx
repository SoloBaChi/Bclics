import { useEffect, useState } from 'react';
import { Box, Flex, HStack, Skeleton, SkeletonCircle, SkeletonText, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';


const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { setUserData } = useAuth();

    // Add loading state to manage waiting time for auth check
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if the user is authenticated by calling a protected API endpoint
        const{ data} = await axios.get(`https://bclics-app.vercel.app/api/users/dashboard`, { withCredentials: true });
        console.log(data)
        setUserData(data)
        setLoading(false);  // Authentication passed, allow rendering

        // If the user is authenticated, allow them to access the route
      } catch (error) {
        // If authentication fails (no token or invalid token), redirect to login page
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return(
        <Box width="100vw" height="100vh">
        <Flex
          justify="center"     // Horizontally center
          align="center"       // Vertically center
          height="100%"        // Ensure full height of the container
        >
          <Box flexBasis="48%">
            <Stack gap="6" maxW="xs" mx="auto">
              <HStack width="full">
                <SkeletonCircle size="10" />
                <SkeletonText noOfLines={2} />
              </HStack>
              <Skeleton height="200px" />
            </Stack>
          </Box>
          </Flex>
          </Box>
    )
   // Replace with a spinner or loading indicator
  }

  return children;  // Render the protected component if authenticated
};

export default ProtectedRoute;
