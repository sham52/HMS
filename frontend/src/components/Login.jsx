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
  id: Yup.string()
    .matches(/^[1-9]{1}[0-9]{9}[02468]{1}$/, "Geçersiz T.C. Kimlik Numarası")
    .required("T.C. Kimlik Numarası gerekli"),
  password: Yup.string().required("Şifre gerekli"),
});

const LoginPage = () => {
  const handleSubmit = async (values, actions) => {
    try {
      const response = await fetch("your_login_endpoint_here", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        // Login successful, redirect to main page or set a flag to indicate the user is logged in
        console.log("Login successful");
        // Redirect or set a flag here
      } else {
        // Login failed, handle error
        console.error("Login failed");
        // You can display an error message to the user if needed
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // You can display an error message to the user if needed
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <ChakraProvider>
      <Box
        p={8}
        maxW="md"
        mx="auto"
        mt="23vh"
        boxShadow="md"
        borderWidth="1px"
        borderRadius="md"
      >
        <Formik
          initialValues={{ id: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <Field name="id">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.id && form.touched.id}>
                    <FormLabel htmlFor="id">T.C. Kimlik Numarası</FormLabel>
                    <Input
                      {...field}
                      id="id"
                      placeholder="T.C Kimlik Numarası"
                    />
                    <FormErrorMessage>{form.errors.id}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor="password">Şifre</FormLabel>
                    <Input
                      {...field}
                      type="password"
                      id="password"
                      placeholder="Şifre"
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
