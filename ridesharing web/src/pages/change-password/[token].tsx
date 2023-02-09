import { Button, Box, Stack, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { InputField } from "../../components/inputField";
import { useChangePasswordMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { ToErrorMap } from "../../utils/toErrorMap";
import { useState } from "react";
import { withUrqlClient } from "next-urql";
import { CreateUrqlClient } from "../../utils/createUrqlClient";
import NextLink from "next/link";
import { Layout } from "../../components/Layout";

const ChangePassword: NextPage = () => {
  const [, changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const [tokenError, setTokenError] = useState("");

  return (
    <Layout
      variant="small"
      heading="Reset Your Password"
      text="set a cool strong password"
      form
    >
      <Formik
        initialValues={{ newPassword: "", repeatPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          if (values.newPassword !== values.repeatPassword) {
            setErrors({
              repeatPassword: "these passwords do not match",
            });
          } else {
            const response = await changePassword({
              newPassword: values.newPassword,
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
            });
            if (response.data?.changePassword.errors) {
              const errorMap = ToErrorMap(response.data.changePassword.errors);
              if ("token" in errorMap) {
                setTokenError(errorMap.token);
              }
              setErrors(errorMap);
            } else if (response.data?.changePassword.user) {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              required={true}
              isPassword={true}
            />
            <Box mt={8} />
            <InputField
              name="repeatPassword"
              placeholder="repeat password"
              label="Repeat Password"
              required={true}
              isPassword={true}
            />
            <Box mt={8} />
            {tokenError ? (
              <Box color={"red"}>
                {tokenError}
                <NextLink href={"/forgot-password"}>
                  <Link ml={3} color={"blue.400"}>
                    click here to get another one.
                  </Link>
                </NextLink>
              </Box>
            ) : null}
            <Box mt={8} />
            <Stack>
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
                Reset Password
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};


export default withUrqlClient(CreateUrqlClient, { ssr: false })(ChangePassword);
