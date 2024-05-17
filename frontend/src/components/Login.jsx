import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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

const Login = () => {
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (values, actions) => {
    try {
      const responseBody = {
        id: values.id,
        password: values.password,
      };

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(responseBody),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        if (data.token) {
          console.log("Login successful");

          // Store token in cookies
          document.cookie = `authToken=${data.token};path=/`;

          // Store additional user data in cookies or local storage
          document.cookie = `fullname=${data.fullname};path=/`;
          document.cookie = `userType=${data.userType};path=/`;
          document.cookie = `userId=${data.userId};path=/`;

          actions.resetForm();
          setAuthToken(data.token);

          navigate("/patient-main");
        } else {
          console.error("Login failed");
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
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
                Giriş
              </Button>
              <Box mt={4}>
                <Link href="/register">Hesabın yok mu? Hemen kayıt ol!</Link>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </ChakraProvider>
  );
};

export default Login;
