import React from "react";
import FooterImage from "../../../assets/vectors/landing-footer-image.svg";
import { Text, Stack, Image, Box } from "@chakra-ui/react";
import FooterCol from "../fragments/FooterCol";
import { kontak, menuUtama, sosialMedia } from "../fragments/FooterLinks";

export default function FooterSection() {
  return (
    <footer>
      <Box
        maxW={{ base: "90%", sm: "80%" }}
        mx="auto"
        id="footer-section"
        mt={3}
      >
        <Stack
          direction={["column", "row"]}
          justifyContent="space-around"
          position="relative"
        >
          <Box
            position={{ base: "absolute", lg: "unset" }}
            left={-24}
            top={-32}
            zIndex={-1}
            opacity={{ base: 0.25, lg: 1 }}
          >
            <Image src={FooterImage}></Image>
          </Box>
          <Stack direction={["column", "row"]} spacing={14}>
            <FooterCol heading="Menu Utama" list={menuUtama} />
            <FooterCol heading="Hubungi Kami" list={kontak} />
            <FooterCol heading="Sosial Media" list={sosialMedia} />
          </Stack>
        </Stack>
        <Text textAlign="center" mt={{ base: 16, lg: 8 }} mb={20}>
          2022 © Copyright
        </Text>
      </Box>
    </footer>
  );
}
