import { Stack, Button, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { InputField } from "../components/inputField";
import { Layout } from "../components/Layout";
import { useForgotPasswordMutation } from "../generated/graphql";
import { CreateUrqlClient } from "../utils/createUrqlClient";

interface forgotPasswordProps {}

const ForgotPassword: React.FC<forgotPasswordProps> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);
  return (
    <Layout
      variant="small"
      heading="Forgot your password?"
      text={
        complete
          ? "check your email"
          : "you'll get an email with the reset link"
      }
      form
    >
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Text
              fontSize={"lg"}
              fontStyle={"oblique"}
              color={useColorModeValue("black", "gray.200")}
            >
              if an account with that email exists
              <br />
              We just sent You an email with the reset link.
            </Text>
          ) : (
            <Form>
              <InputField
                name="email"
                placeholder="your-email@example.com"
                label="Email"
                required={true}
              />
              <Box mt={4} />
              <Stack spacing={10}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  size="lg"
                  isLoading={isSubmitting}
                  type="submit"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Request Reset
                </Button>
              </Stack>
            </Form>
          )
        }
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(CreateUrqlClient)(ForgotPassword);
