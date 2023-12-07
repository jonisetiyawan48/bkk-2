import {
  Container,
  Grid,
  GridItem,
  Icon,
  Center,
  Flex,
} from "@chakra-ui/react";
import LoginVector from "./fragments/LoginVector";
import React from "react";
import LoginForm from "./fragments/LoginForm";
import { isLogged } from "../../utils/helpers/isLogged";
import { Link, Navigate } from "react-router-dom";

export default function Login() {
  const logged = isLogged();

  if (logged) {
    return <Navigate to={"/main/beranda"} />;
  }

  return (
    <Container maxW="80%" py={14} p={0}>
      <Flex minH="100vh" alignItems="center">
        <Grid
          gap={50}
          w="100%"
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(5, 1fr)",
            xl: "repeat(2, 1fr)",
          }}
          justifyContent="center"
          position="relative"
          height="fit-content"
        >
          <GridItem
            height="fit-content"
            colSpan={{ base: 1, md: 3, xl: 1 }}
            display="flex"
            flexDir="column"
            alignSelf="center"
          >
            <LoginForm />
          </GridItem>
          <GridItem
            height="fit-content"
            colSpan={{ base: 1, md: 2, xl: 1 }}
            display="flex"
            flexDir="column"
            alignSelf="center"
            position={{ base: "absolute", lg: "unset" }}
            right={-32}
            transform={{ base: "scale(1.5)", lg: "unset" }}
            zIndex={-1}
            opacity={{ base: .1, md: "unset" }}
          >
            <Center>
              <Icon
                width="100%"
                height="451"
                viewBox="0 0 458 451"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <LoginVector />
              </Icon>
            </Center>
          </GridItem>
        </Grid>
      </Flex>
    </Container>
  );
}
