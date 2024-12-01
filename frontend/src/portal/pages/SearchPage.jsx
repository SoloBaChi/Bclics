import React from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  VStack,
  Heading,
  Link,
  Grid,
  GridItem,
  Text,
  HStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import Icons from "../components/Icons";

const categories = [
  { name: "Products", path: "/products" },
  { name: "Services", path: "/services" },
  { name: "Sales", path: "/sales" },
  { name: "Requests", path: "/requests" },
  { name: "More Categories", path: "/more-categories" },
];

const SearchPage = () => {
  return (
    <Box
      p={6}
      w={{ base: "full", sm: "80%", md: "60%", lg: "50%", xl: "40%" }}
      maxW="600px"
      mx="auto"
      textAlign="center"
    >
      {/* Search Bar */}
      <VStack spacing={4}>
        <Heading as="h4" size="xl" mb={6}>
          Search for Anything
        </Heading>

        <InputGroup size="lg" as={RouterLink} to="/SearchBar">
          <Input
            placeholder="Search for products, services, and more..."
            focusBorderColor="gray.500"
            boxShadow="md"
          />
          <InputRightElement>
            <IconButton aria-label="Search" icon={<SearchIcon />} size="lg" />
          </InputRightElement>
        </InputGroup>
      </VStack>

      {/* Categories */}
      <Box mt={10}>
        <Heading as="h2" size="lg" mb={4}>
          Browse Categories
        </Heading>

        <Grid templateColumns="repeat(2, 4fr)" gap={6}>
          {categories.map((category, index) => (
            <GridItem key={index}>
              <Link
                as={RouterLink}
                to="/Categories"
                fontSize="xl"
                fontWeight="bold"
                textDecoration="none"
                // _hover={{ textDecoration: "underline", color: "blue.500" }}
                p={4}
                display="block"
                borderRadius="md"
                bg="gray"
                _hover={{ bg: "gray.200", color: "blue.500" }}
                textAlign="center"
              >
                <Text>Categories</Text>
                {/* {category.name} */}
              </Link>
            </GridItem>
          ))}
        </Grid>
      </Box>
      <Icons />
    </Box>
  );
};

export default SearchPage;
