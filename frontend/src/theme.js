import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "light" ? "gray.50" : "gray.800",
        color: props.colorMode === "light" ? "gray.800" : "gray.50",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: (props) => ({
        bg: props.colorMode === "light" ? "blue.400" : "blue.500",
        color: props.colorMode === "light" ? "white" : "gray.800",
        _hover: {
          bg: props.colorMode === "light" ? "blue.300" : "blue.200", // buttonBgs equivalent
        },
      }),
    },
  },
  components: {
    Box: {
      baseStyle: {
        w: { base: "full", sm: "80%", md: "60%", lg: "50%", xl: "40%" },
        maxW: "600px",
      },
    },
    Flex: {
      baseStyle: {
        w: { base: "full", sm: "80%", md: "60%", lg: "50%", xl: "40%" },
        maxW: "600px",
      },
    },
  },
});

export default theme;
