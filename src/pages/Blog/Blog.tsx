import {
  Container,
  GridItem,
  Grid,
  HStack,
  Heading,
  Button,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import UploadModal from "./fragments/UploadModal";
import Switcher from "./Switcher/Switcher";
import SwitcherButton from "./Switcher/SwitcherButton";
import { PlusCircle, Bookmark } from "react-feather";
import { checkRole } from "../../utils/helpers/checkRole";
import CommentInput from "./fragments/CommentInput";
import { useState } from "react";
import OnlineUsers from "../../components/Sidebar/OnlineUsers";

export default function Blog() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentSection, setSection] = useState("");

  return (
    <Container maxW="100%" p={0}>
      <UploadModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={8}
      >
        <GridItem colSpan={{ base: 1, lg: 2, xl: 3 }} w="100%">
          <HStack mx={2}>
            <SwitcherButton
              title={"Blog"}
              value={""}
              statevalue={currentSection}
              handleValue={setSection}
            />
            <SwitcherButton
              title={"Berita"}
              value={"news"}
              statevalue={currentSection}
              handleValue={setSection}
            />
          </HStack>
          <Flex
            flexDirection={{ base: "column", sm: "row" }}
            my={10}
            mx={1}
            justifyContent="space-between"
            gap={3}
          >
            <Heading
              fontSize={30}
              visibility={currentSection === "news" ? "hidden" : undefined}
            >
              Postingan terbaru
            </Heading>
            {(currentSection === "news" && checkRole(["5", "7"]) || currentSection !== "news") && (
              <Button
                onClick={onOpen}
                leftIcon={<PlusCircle />}
                borderRadius="20px"
                color="white"
                colorScheme="teal"
                bg="teal_custom"
                fontWeight={500}
                _hover={{ bg: "teal_customdarker" }}
                py={6}
                px={9}
              >
                Tambah {currentSection === "news" ? "Berita" : "Postingan"}
              </Button>
            )}
          </Flex>
          <Container maxW="100%" p={0}>
            <Switcher value={currentSection} />
          </Container>
        </GridItem>
        <GridItem colSpan={1} pt={14}>
          <OnlineUsers />
        </GridItem>
      </Grid>
    </Container>
  );
}
