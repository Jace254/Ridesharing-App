import {
  Box,
  Flex,
  IconButton,
  Collapse,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logo from "../../assets/images/logos/groopl.png";
import Image from "next/image";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { DesktopNav } from "./desktopNav";
import { NavItem } from "./navItem";
import { MobileNav } from "./mobileNav";
import { LoginRegisterFragment } from "./userFragments/loginRegisterFragment";
import { AccountFragment } from "./userFragments/accountFragment";
import { useEffect, useState } from "react";
import { DarkModeSwitch } from "../darkModeSwitch";
import NextLink from "next/link";

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const [isServer, setIsServer] = useState(true);
  const [{ data, fetching }] = useMeQuery({
    pause: isServer,
  });

  console.log("data: ", data);
  const [, logout] = useLogoutMutation();

  let body;
  if(isServer){

  } else {
    if (fetching) {
      body = null;
      //body is null
    } else if (!data?.me?.username) {
      //set body to signup or login
      body = LoginRegisterFragment({ props: {} });
    } else if (data.me.username) {
      const username = data.me.username;
      body = AccountFragment({ username, logout });
    }
  }
  
  useEffect(() => {
    setIsServer(false);
  }, []);

  return (
    <Box zIndex={1} position="sticky" top={0}>
      <Flex
        bg={useColorModeValue("white", "gray.700")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 8, md: 16 }}
        boxShadow={useColorModeValue("md", "lg")}
        borderColor={useColorModeValue("gray.300", "black")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <NextLink href={"/"}>
            <Image src={Logo} priority={true} />
          </NextLink>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav NAV_ITEMS={NAV_ITEMS} />
          </Flex>
        </Flex>
        <Flex display={{ base: "none", md: "flex" }}>
          <DarkModeSwitch />
          {body}
        </Flex>
        <Flex flex={{ base: 1 }} display={{ base: "flex", md: "none" }}>
          {body}
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav NAV_ITEMS={NAV_ITEMS} />
      </Collapse>
    </Box>
  );
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Rides",
    children: [
      {
        label: "Requested Rides",
        subLabel: "Rides You requested for",
        href: "/requests",
      },
      {
        label: "Offered Rides",
        subLabel: "Rides you offered",
        href: "/offers",
      },
    ],
  },
];
