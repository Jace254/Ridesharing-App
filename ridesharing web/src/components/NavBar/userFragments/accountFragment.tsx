import {
  Stack,
  Flex,
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface accountFragmentProps {
  username: string;
  logout: (variable?: any) => any;
}

export const AccountFragment: React.FC<accountFragmentProps> = ({
  username,
  logout,
}) => {
  return (
    <>
      <Stack
        flex={{ base: 1, md: 0 }}
        justify={"flex-end"}
        direction={"row"}
        spacing={6}
      >
        <Flex alignItems={"center"}>
          <Text display={{base: "none", md: "flex"}} as="b" mr={2}>
            {username}
          </Text>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"sm"}
                src={
                  "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                }
              />
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Account Settings</MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  logout();
                }}
                color={"red.500"}
                fontWeight={"500"}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Stack>
    </>
  );
};
