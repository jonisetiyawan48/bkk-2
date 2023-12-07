import React, { useState } from "react";
import {
  Input,
  Text,
  Box,
  FormControl,
  FormErrorMessage,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
  Heading,
  Select,
} from "@chakra-ui/react";

import { Formik, Form, Field } from "formik";
import {
  ValidateName,
  ValidateEmail,
  ValidateRoles,
  ValidatePassword,
  validateConfirmPassword,
} from "./validator";
import registerHandler from "./RegisterHandler";
import { ROLES } from "../../../utils/constants";
import { NavLink, useNavigate } from "react-router-dom";
import { EyeOff, Eye } from "react-feather";
import FetchMessage from "./FetchMessage";

export default function RegisterForm() {
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [fetchCondition, setFetchCondition] = useState("");
  const [errorMessage, setError] = useState("");
  const navigate = useNavigate();

  const handlePass = () => setShowPass(!showPass);
  const handleConf = () => setShowConf(!showConf);

  const submitHandler = async (values: any) => {
    const run = await registerHandler(values);
    setFetchCondition(run.status);
    setError(run.message);

    if (run.status === "failed") {
      return;
    }

    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <Box m="0 auto" w={{ base: "80%", lg: "65%", xl: "50%" }}>
      <Box>
        <Heading my={2}>Sign Up</Heading>
        <Text fontSize={20}>Sign up to connect with us</Text>
        <FetchMessage condition={fetchCondition} message={errorMessage} />
      </Box>
      <Box>
        {/* FORM */}
        <Formik
          enableReinitialize
          initialValues={{
            name: "",
            email: "",
            password: "",
            roles: "",
            passwordconf: "",
          }}
          onSubmit={async (values, actions) => {
            const registerValues = {
              name: values.name,
              email: values.email,
              password: values.password,
              roles: values.roles,
            };

            await submitHandler(registerValues);
          }}
        >
          {(props) => (
            <Form>
              <Field name="name" validate={ValidateName}>
                {({ field, form }: any) => (
                  <FormControl
                    my={4}
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <Input
                      {...field}
                      borderRadius="full"
                      focusBorderColor="red_darker"
                      id="name"
                      placeholder="Your Name"
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="email" validate={ValidateEmail}>
                {({ field, form }: any) => (
                  <FormControl
                    my={4}
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <Input
                      {...field}
                      borderRadius="full"
                      focusBorderColor="red_darker"
                      type="email"
                      id="email"
                      placeholder="YourEmail@domain.com"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="roles" validate={ValidateRoles}>
                {({ field, form }: any) => (
                  <FormControl
                    my={4}
                    isInvalid={form.errors.roles && form.touched.roles}
                  >
                    <Select
                      {...field}
                      borderRadius="full"
                      focusBorderColor="red_darker"
                      id="roles"
                    >
                      <option value="" hidden>
                        {"Select Role"}
                      </option>
                      {ROLES.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.label}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{form.errors.roles}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password" validate={ValidatePassword}>
                {({ field, form }: any) => (
                  <FormControl
                    my={4}
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <InputGroup>
                      <Input
                        {...field}
                        borderRadius="full"
                        focusBorderColor="red_darker"
                        type={showPass ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                      />
                      <InputRightElement>
                        <IconButton
                          borderRadius="full"
                          size="sm"
                          variant="ghost"
                          onClick={handlePass}
                          aria-label={"whod hide"}
                          icon={showPass ? <EyeOff /> : <Eye />}
                        ></IconButton>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field
                name="passwordconf"
                validate={(value: any) =>
                  validateConfirmPassword(props.values.password, value)
                }
              >
                {({ field, form }: any) => (
                  <FormControl
                    my={4}
                    isInvalid={
                      form.errors.passwordconf && form.touched.passwordconf
                    }
                  >
                    <InputGroup>
                      <Input
                        {...field}
                        borderRadius="full"
                        focusBorderColor="red_darker"
                        type={showConf ? "text" : "password"}
                        id="passwordconf"
                        placeholder="Confirm Password"
                      />
                      <InputRightElement>
                        <IconButton
                          borderRadius="full"
                          size="sm"
                          variant="ghost"
                          onClick={handleConf}
                          aria-label={"confhide"}
                          icon={showConf ? <EyeOff /> : <Eye />}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {form.errors.passwordconf}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                shadow="0 0 20px rgba(231, 0, 0, 20%)"
                flex={1}
                w="100%"
                borderRadius="full"
                background="red_lighter"
                my={4}
                colorScheme="red"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>

        <Box textColor="grey" fontSize={15} m="0 auto" w="fit-content" mt={2}>
          Already have an account?{" "}
          <NavLink to="/login" style={{ color: "#E70000", fontWeight: 600 }}>
            Login
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
}
