import { Stack, Button, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { InputField } from "../components/inputField";
import { Layout } from "../components/Layout";
import { useRegisterMutation } from "../generated/graphql";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import { ToErrorMap } from "../utils/toErrorMap";


interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Layout
      variant="small"
      heading="Create a Ride"
      text="set up a ride"
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
              name="from"
              placeholder="Kutus"
              label="Pick-up point"
              required={true}
            />
            <Box mt={4} />
            <InputField
              name="to"
              placeholder="Kerugoya"
              label="Destination"
              required={true}
            />
            <Box mt={4} />
            <InputField
              name="when"
              placeholder="DD/MM/YY 00:00"
              label="date & time"
              required={true}
            />
            <InputField
              name="seats"
              placeholder="5"
              
              label="no. of seats"
              required={true}
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
                Create Ride
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(CreateUrqlClient)(Register);
