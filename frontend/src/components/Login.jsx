import React from "react";
import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Link,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <ChakraProvider>
      <Box
        p={8}
        maxW="md"
        mx="auto"
        mt="23vh" // Adjust the top margin to center vertically
        boxShadow="md"
        borderWidth="1px"
        borderRadius="md"
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Input {...field} id="email" placeholder="Email Address" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      {...field}
                      type="password"
                      id="password"
                      placeholder="Password"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
                w="100%"
              >
                Login
              </Button>
              <Box mt={4}>
                <Link href="/register">
                  You don't have an account yet? Register here!
                </Link>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </ChakraProvider>
  );
};

export default LoginPage;
