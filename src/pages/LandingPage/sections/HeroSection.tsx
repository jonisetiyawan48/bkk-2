import React from "react";
import HeroSectionImage from "../../../assets/images/HeroSectionImage.png";
import { Grid, GridItem, Heading, Image, Text, Box } from "@chakra-ui/react";

export default function HeroSection() {
  return (
    <Box
      maxW={{ base: "90%", sm: "80%" }}
      mx="auto"
      maxH="100%"
      pt={{ base: 32, md: 200 }}
      id="hero-section"
    >
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={6}
        alignItems="start"
        textColor="white"
      >
        <GridItem
          w={{ base: "unset", md: "80%" }}
          pt={20}
          bg="red_darker"
          borderRadius="3xl"
          mt={8}
          p={8}
        >
          <Heading>Selamat Datang Di Platform SMK TKJ</Heading>
          <Text fontSize={18} my={4}>
            Selamat datang di website platform SMK TKJ, dapatkan fitur-fitur
            menarik untuk kebutuhan pendidikan maupun bisnis anda di bidang
            tekhnologi bersama Telkom Group.
          </Text>
        </GridItem>
        <GridItem
          w="100%"
          justifySelf="center"
          gridRowStart={{ base: 1, md: "unset" }}
        >
          <Image src={HeroSectionImage} />
        </GridItem>
      </Grid>
    </Box>
  );
}
