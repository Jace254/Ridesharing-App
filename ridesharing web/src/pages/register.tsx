import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, Link, Stack, Text } from "@chakra-ui/react";
import { InputField } from "../components/inputField";
import { useRegisterMutation } from "../generated/graphql";
import { ToErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { Layout } from "../components/Layout";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Layout
      variant="small"
      heading="Sign up"
      text="to create a new account"
      form
      top
    >
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });
          if (response.data?.register.errors) {
            setErrors(ToErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
              required={true}
            />
            <Box mt={4} />
            <InputField
              name="email"
              placeholder="your-email@example.com"
              label="Email"
              required={true}
            />
            <Box mt={4} />
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              required={true}
              isPassword={true}
            />
            <Box mt={8} />
            <Stack>
              <Button
                isLoading={isSubmitting}
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                Sign Up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <NextLink href={"/login"}>
                  <Link color={"blue.400"}>Login</Link>
                </NextLink>
              </Text>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(CreateUrqlClient)(Register);
