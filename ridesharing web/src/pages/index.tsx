import {
  Box,
  Container,
  Heading,
  Stack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import NavBar from "../components/NavBar/navBar";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const Index = () => {
  useIsAuth();
  
  return (
    <>
      <NavBar />
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Heading>Let's Get You Places</Heading>
          <Text>Offer and Request rides from anywhere</Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
          justify={"center"}
          mx={"auto"}
          py={16}
        >
          <Box>
            <Stack
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
              rounded={"xl"}
              align={"center"}
              pos={"relative"}
              padding={10}
            >
              <Heading as={"h3"} fontSize={"xl"}>
                Offer a Ride
              </Heading>
              <Text
                textAlign={"center"}
                color={useColorModeValue("gray.600", "gray.400")}
                fontSize={"sm"}
                p={5}
              >
                {" "}
                Share rides with people in your area and travel together
              </Text>
              <Box
                as="button"
                py={3}
                px={10}
                color="white"
                fontWeight="bold"
                borderRadius="md"
                bgGradient="linear(to-r, teal.500, green.500)"
                _hover={{
                  bgGradient: "linear(to-r, red.500, yellow.500)",
                }}
              >
                <Link href={"/offer"}>Create a ride</Link>
              </Box>
            </Stack>
          </Box>
          <Box>
            <Stack
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
              rounded={"xl"}
              align={"center"}
              pos={"relative"}
              padding={10}
            >
              <Heading as={"h3"} fontSize={"xl"}>
                Request a Ride
              </Heading>
              <Text
                textAlign={"center"}
                color={useColorModeValue("gray.600", "gray.400")}
                fontSize={"sm"}
                p={5}
              >
                {" "}
                Get rides from your area, at an affordable price
              </Text>
              <Box
                as="button"
                py={3}
                px={10}
                color="white"
                fontWeight="bold"
                borderRadius="md"
                bgGradient="linear(to-r, teal.500, green.500)"
                _hover={{
                  bgGradient: "linear(to-r, red.500, yellow.500)",
                }}
              >
                <Link href={"/request"}>Get a ride</Link>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(Index);
