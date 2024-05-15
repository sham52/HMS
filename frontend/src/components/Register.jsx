import React, { useState } from "react";

import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Select,
  Link,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  id: Yup.string()
    .matches(/^[1-9]{1}[0-9]{9}[02468]{1}$/, "Geçersiz T.C. Kimlik Numarası")
    .required("T.C. Kimlik Numarası gerekli"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  name: Yup.string()
    .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/, "Name must contain only letters")
    .required("Name is required"),
  surname: Yup.string()
    .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/, "Surname must contain only letters")
    .required("Surname is required"),
  dateOfBirth: Yup.date()
    .max(new Date(), "Date of Birth cannot be in the future")
    .required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().required("Address is required"),
  phoneNumber: Yup.string()
    .matches(
      /^[0-9]{3}[0-9]{3}[0-9]{4}$/,
      "Phone Number must be in the format XXXXXXXXXX"
    )
    .transform((value, originalValue) => {
      // Remove all spaces from the phone number
      return originalValue.replace(/\s/g, "");
    })
    .required("Phone Number is required"),
});
const RegisterPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (values, actions) => {
    try {
      console.log(`SUBMITTED`);
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        // Registration successful, set isRegistered to true
        setIsRegistered(true);
      } else {
        // Registration failed, handle error
        console.error("Registration failed");
        // You can display an error message to the user if needed
      }
      console.log(`submitted`);
    } catch (error) {
      console.error("Error registering user:", error);
      // You can display an error message to the user if needed
    } finally {
      actions.setSubmitting(false);
    }
  };
  if (isRegistered) {
    return <Redirect to="/main" />;
  }
  return (
    <ChakraProvider>
      <Box
        p={8}
        maxW="md"
        mx="auto"
        mt="13vh" // Adjust the top margin to center vertically
        boxShadow="md"
        borderWidth="1px"
        borderRadius="md"
      >
        <Formik
          initialValues={{
            id: "",
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            surname: "",
            dateOfBirth: "",
            gender: "",
            address: "",
            phoneNumber: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <Field name="id">
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isInvalid={form.errors.id && form.touched.id}
                  >
                    <FormLabel htmlFor="id">T.C.</FormLabel>
                    <Input
                      {...field}
                      id="id"
                      placeholder="T.C. Kimlik Numarası"
                    />
                    <FormErrorMessage>{form.errors.id}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel htmlFor="name">İsim</FormLabel>
                    <Input {...field} id="name" placeholder="İsim" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="surname">
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isInvalid={form.errors.surname && form.touched.surname}
                  >
                    <FormLabel htmlFor="surname">Soyisim</FormLabel>
                    <Input {...field} id="surname" placeholder="Soyisim" />
                    <FormErrorMessage>{form.errors.surname}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="dateOfBirth">
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isInvalid={
                      form.errors.dateOfBirth && form.touched.dateOfBirth
                    }
                  >
                    <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                    <Input
                      {...field}
                      type="date"
                      id="dateOfBirth"
                      placeholder="Date of Birth"
                    />
                    <FormErrorMessage>
                      {form.errors.dateOfBirth}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="gender">
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isInvalid={form.errors.gender && form.touched.gender}
                  >
                    <FormLabel htmlFor="gender">Gender</FormLabel>
                    <Select {...field} id="gender" placeholder="Select Gender">
                      <option value="male">Erkek</option>
                      <option value="female">Kadın</option>
                      <option value="other">Diğer</option>
                    </Select>
                    <FormErrorMessage>{form.errors.gender}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="address">
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isInvalid={form.errors.address && form.touched.address}
                  >
                    <FormLabel htmlFor="address">Address</FormLabel>
                    <Input {...field} id="address" placeholder="Address" />
                    <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="phoneNumber">
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isInvalid={
                      form.errors.phoneNumber && form.touched.phoneNumber
                    }
                  >
                    <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                    <Input
                      {...field}
                      id="phoneNumber"
                      placeholder="Phone Number"
                    />
                    <FormErrorMessage>
                      {form.errors.phoneNumber}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {/* Add other fields as needed */}
              <Button
                type="submit"
                mt={6}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                width="100%"
              >
                Register
              </Button>
              <Box mt={4}>
                <Link href="/login">
                  You already have an account? Login here!
                </Link>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </ChakraProvider>
  );
};

export default RegisterPage;
