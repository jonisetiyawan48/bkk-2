import { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Heading,
  Text,
  Box,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import loginHandler from "./LoginHandler";
import ValidatePassword from "./PasswordValidator";
import FetchMessage from "./FetchMessage";
import ValidateEmail from "./EmailValidator";

import { Eye, EyeOff } from "react-feather";

export default function LoginForm() {
  const [show, setShow] = useState(false);
  const [fetchCondition, setFetchCondition] = useState("");
  const [errorMessage, setError] = useState("");

  const handleShow = () => setShow(!show);

  const submitHandler = async (values: any, actions: any) => {
    const run = await loginHandler(values, actions);
    setFetchCondition(run.status);
    setError(run.message);

    if (run.status === "failed") {
      return;
    }

    location.reload();
  };

  return (
    <Box m="0 auto" w={{ base: "80%", lg: "65%", xl: "50%" }}>
      <Box>
        <Link to="/">
          <Text as="h6" fontWeight={500} textColor="red_darker">
            {"<-- Kembali ke Beranda"}
          </Text>
        </Link>
        <Heading my={2}>Login</Heading>
        <Text fontSize={20}>Login to connect with us</Text>
        <FetchMessage condition={fetchCondition} message={errorMessage} />
      </Box>
      <Box>
        <Formik
          enableReinitialize
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values, actions) => {
            await submitHandler(values, actions);
          }}
        >
          {(props) => (
            <Form>
              <Field name="email" validate={ValidateEmail}>
                {({ field, form }: any) => (
                  <FormControl
                    my={4}
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="Enter Your Email"
                      borderRadius="full"
                      focusBorderColor="red_darker"
                      autoFocus
                      required
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password" validate={ValidatePassword}>
                {({ field, form }: any) => (
                  <FormControl
                    my={4}
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <InputGroup size="md">
                      <Input
                        {...field}
                        id="password"
                        type={show ? "text" : "password"}
                        placeholder="Enter Your password"
                        borderRadius="full"
                        focusBorderColor="red_darker"
                        required
                      />
                      <InputRightElement>
                        <IconButton
                          borderRadius="full"
                          size="sm"
                          variant="ghost"
                          onClick={handleShow}
                          aria-label={"whod hide"}
                          icon={show ? <EyeOff /> : <Eye />}
                        />
                      </InputRightElement>
                    </InputGroup>

                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {/* <Text textAlign="end" textColor="red_darker" cursor="pointer">
                Forgot Password?
              </Text> */}
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
                Login
              </Button>
              <Box textColor="grey" fontSize={15} m="0 auto" w="fit-content" mt={2}>
                Don't have an account?{" "}
                <NavLink
                  to="/register"
                  style={{ color: "#E70000", fontWeight: 600 }}
                >
                  sign up
                </NavLink>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
