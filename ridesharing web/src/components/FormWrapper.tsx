import {
  Box,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface wrapperProps {
  children: any;
  variant?: "small" | "regular";
  text?: string;
  heading?: string;
  top?: boolean;
}

export const FormWrapper: React.FC<wrapperProps> = ({
  children,
  variant = "regular",
  text = "",
  heading,
  top,
}) => {
  return (
    <Flex
      minH={"100vh"}
      align={top ? "start" : "center"}
      justify={"center" }
      bg={useColorModeValue("gray.200", "gray.900")}
    >
      <Stack
        spacing={8}
        mx={"10vh"}
        maxW={variant === "small" ? "sm" : "lg"}
        py={1}
        px={0}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            {heading}
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            {text}
          </Text>
        </Stack>
        <Box
          minW={
            variant == "regular"
              ? { base: "xs", md: "lg" }
              : { base: "xs", md: "sm" }
          }
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>{children}</Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
