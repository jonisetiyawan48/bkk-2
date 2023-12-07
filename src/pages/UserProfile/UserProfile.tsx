import {
  Container,
  Box,
  Image,
  Flex,
  Heading,
  Button,
  Progress,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { Edit2, ArrowLeft, Camera, Home, Phone } from "react-feather";
import { Link } from "react-router-dom";
import { fetchCurrentUser } from "./api/apihandler";
import CoverModal from "./fragments/CoverModal";
import EditModal from "./fragments/EditModal";
import { ANIM_TRANSITION } from "../../utils/constants";
import AboutBox from "./fragments/AboutBox";

export let loadUser: Function;

export default function UserProfile() {
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    agency: "",
    phoneNumber: "",
    imageUrl: "",
  });

  const [isLoading, setLoading] = useState(true);

  const coverModal = useDisclosure();
  const editProfile = useDisclosure();

  loadUser = async () => {
    await fetchCurrentUser()
      .then((data) => setUserData(data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      transition={{ delayChildren: 1 }}
      animate={{
        y: 0,
        opacity: 1,
        ...ANIM_TRANSITION,
      }}
      exit={{ y: 300, opacity: 0, ...ANIM_TRANSITION }}
      style={{ width: "100%", minHeight: "100vh" }}
    >
      <Helmet>
        <style>{"body { background-color: #f6f6f6 }"}</style>
      </Helmet>
      <CoverModal disclosure={coverModal} />
      <EditModal disclosure={editProfile} props={userData} />
      <Container
        minW="100vw"
        bg="grey_bg"
        py={{ base: 8, md: 20 }}
        px={10}
        justifyContent="center"
        display="flex"
      >
        <Box w="1200px" h="600px" pos="relative">
          <Link to="../beranda">
            <Button
              mb={4}
              rounded="full"
              colorScheme="red"
              bg="red_lighter"
              height="55px"
              width="55px"
            >
              <ArrowLeft />
            </Button>
          </Link>
          {isLoading ? (
            <Progress isIndeterminate colorScheme="red" size="xs" />
          ) : (
            <>
              <Box pos="relative">
                <Image
                  src="https://w.wallhaven.cc/full/3z/wallhaven-3zr953.jpg"
                  rounded={20}
                  w="1200px"
                  h={{ base: "150px", sm: "200px", md: "400px" }}
                  objectFit="cover"
                />
                {/* <Button
                  pos="absolute"
                  top={4}
                  rounded={16}
                  right={5}
                  fontWeight={500}
                  fontSize={18}
                  gap={2}
                  p={6}
                  // onClick={coverModal.onOpen}
                >
                  <Camera />
                  Edit Foto Sampul
                </Button> */}
              </Box>
              <Flex flexDir={{ base: "column", sm: "row" }}>
                <Image
                  pos="relative"
                  bottom={100}
                  ml={{ base: 0, sm: 10 }}
                  rounded="full"
                  alignSelf={{ base: "center", sm: "unset" }}
                  src={
                    userData.imageUrl
                      ? userData.imageUrl
                      : "https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png"
                  }
                  w="200px"
                  h="200px"
                  objectFit="cover"
                />
                <Flex
                  flexDir={{ base: "column", md: "row" }}
                  justifyContent="space-between"
                  height="fit-content"
                  w="100%"
                  gap={3}
                  bottom={{ base: 100, sm: "unset" }}
                  position={{ base: "relative", sm: "unset" }}
                  mt={{ base: 3, md: 5 }}
                >
                  <Heading
                    ml={{ base: 0, sm: 5 }}
                    textAlign={{ base: "center", sm: "unset" }}
                  >
                    {userData.name}
                  </Heading>
                  <Button
                    bg="red_lighter"
                    rounded={20}
                    colorScheme="red"
                    fontSize={18}
                    p={6}
                    fontWeight={400}
                    gap={2}
                    onClick={editProfile.onOpen}
                  >
                    <Edit2 />
                    Edit Profil
                  </Button>
                </Flex>
              </Flex>
              <AboutBox {...userData} />
            </>
          )}
        </Box>
      </Container>
    </motion.div>
  );
}
