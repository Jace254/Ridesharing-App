import { Stack, Button } from '@chakra-ui/react';
import NextLink from 'next/link'
import React from 'react';

export const LoginRegisterFragment: React.FC = ({}) => {
    return (
      <>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <NextLink href={"/login"}>
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={700}
              variant={"link"}
              color={"cyan.400"}
              _hover={{
                color: "cyan.600",
              }}
            >
              Sign In
            </Button>
          </NextLink>
          <NextLink href={"/register"}>
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"cyan.400"}
              _hover={{
                bg: "cyan.600",
              }}
            >
              Sign Up
            </Button>
          </NextLink>
        </Stack>
      </>
    );
}