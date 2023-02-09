import { Box, Button, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/inputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

interface createPostProps {}

const CreatePost: React.FC<createPostProps> = ({}) => {
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();
  // useIsAuth()

  return (
    <Layout
      variant="regular"
      heading="Create Post"
      text="write something interesting"
      top
      form
    >
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="Title"
              label="Title"
              style={{
                fontWeight: "bold",
              }}
              required={true}
            />
            <Box mt={4} />
            <InputField
              name="text"
              placeholder="Text..."
              label="Text"
              required={true}
              textarea
            />
            <Box mt={8} />
            <Stack spacing={5}>
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
                Create Post
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(CreateUrqlClient)(CreatePost);
