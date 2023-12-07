import {
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import AboutSectionImage from "../../../assets/images/AboutSectionImage.png";
import AboutSectionDecor from "../../../assets/images/AboutSectionDecor.png";

export default function AboutSection() {
  return (
    <Box
      maxW={{ base: "90%", sm: "77%" }}
      mx="auto"
      position="relative"
      display="flex"
      alignItems="center"
    >
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
        gap={6}
        alignItems="start"
      >
        <GridItem
          w="100%"
          display="flex"
          flexDir="column"
          alignSelf="center"
          colSpan={3}
        >
          <Heading>Apa itu Platform SMK TKJ?</Heading>
          <Text fontSize={18} mt={4} mb={6} textColor="gray" letterSpacing={1}>
            Platform Smk Tkj Adalah Platform yang membantu mewadahi Kegiatan
            serta menghubungkan Sekolah-sekolah SMK yang ada di seluruh
            indonesia dalam satu website/mobile. Platform Smk Tkj juga menjadi
            penghubung antara sekolah dengan Instansi yang menyediakan Bursa
            Kerja, Internship, dan sertifikasi.
          </Text>
        </GridItem>
        <GridItem
          w="100%"
          display="flex"
          flexDir="column"
          alignSelf="center"
          justifySelf="center"
          colSpan={2}
          gridRowStart={{ base: 1, md: "unset" }}
        >
          <Image src={AboutSectionImage} m="auto" />
        </GridItem>
      </Grid>
      <Image
        src={AboutSectionDecor}
        position="absolute"
        maxH="140px"
        right={-130}
        top="50%"
      />
    </Box>
  );
}
