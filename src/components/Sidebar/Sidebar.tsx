import {
  Box,
  Container,
  HStack,
  VStack,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import NavItem from "./fragments/NavItem";
import TopNavbar from "./fragments/TopNavbar";

import LogoColor from "../../assets/vectors/logo-color.svg";

import { Home, ShoppingBag, BookOpen, Users, Clipboard } from "react-feather";
import PengajuanAccordion from "./fragments/PengajuanAccordion";
import DaftarUserAccordion from "./fragments/DaftarUserAccordion";
import { USER_ROLE } from "../../utils/constants";
import { checkRole } from "../../utils/helpers/checkRole";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

type SidebarType = {
  children: any;
};

export default function Sidebar({ children }: SidebarType) {
  const path_name = useLocation().pathname;
  const location = path_name.split("/")[2];
  
  let sidebar = {
    status: useDisclosure(),
    size: 350,
  };

  useEffect(() => {
    sidebar.status.onClose()
  }, [path_name]);

  if (location === "user-profile") {
    return <>{children}</>;
  } else {
    return (
      <>
        <Box
          overflowY="scroll"
          fontWeight={500}
          pos="fixed"
          top={0}
          h="100vh"
          maxH="100vh"
          w={{ base: sidebar.size - 70, sm: sidebar.size - 50, md: sidebar.size }}
          as="nav"
          bg="white"
          p={8}
          left={0}
          borderTopRightRadius="3xl"
          borderBottomRightRadius="3xl"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#E70000",
            },
          }}
        >
          <Box
            display="flex"
            flexDir="row"
            justifyContent="space-around"
            my={5}
            fontWeight={600}
          >
            <Image src={LogoColor} />
            Platform SMK TKJ
          </Box>
          {/* ITEMS */}
          <NavItem title={"Beranda"} icon={Home} path={"/main/beranda"} />
          <NavItem title={"Blog / Berita"} icon={BookOpen} path={"/main/blog"} />
          {checkRole(["1", "5", "7"]) && <PengajuanAccordion />}
          {checkRole(["7", "5", "1"]) && (
            <NavItem
              title={"Katalog"}
              icon={ShoppingBag}
              path={"/main/katalog"}
            />
          )}
          {/* <NavItem title={'Forum Diskusi'} icon={Users} path={'/main/forum'} /> */}
          {/* <NavItem title={'Lms'} icon={Clipboard} path={'/main/lms'} /> */}
          {checkRole(["1", "7"]) && <DaftarUserAccordion />}
          {/* ITEMS */}
        </Box>
        <Box display="flex">
          <Box
            w={{ base: sidebar.size - 70, sm: sidebar.size - 50, md: sidebar.size }}
            minW={{ base: sidebar.size - 70, sm: sidebar.size - 50, md: sidebar.size }}
          />
          <VStack
            w="100vw"
            minW={{ base: "100vw", lg: "unset" }}
            ms={{
              base: sidebar.status.isOpen ? "unset" : `-${sidebar.size - 70}px`,
              sm: sidebar.status.isOpen ? "unset" : `-${sidebar.size - 50}px`,
              md: sidebar.status.isOpen ? "unset" : `-${sidebar.size}px`,
              lg: "unset",
            }}
            alignItems="flex-start"
            css={{ transition: "all 0.5s ease" }}
          >
            <TopNavbar sidebar={() => sidebar.status.onToggle()} />
            <Container
              pos="relative"
              py={14}
              px={{base: 7, sm: 12, lg: 14}}
              bg="grey_bg"
              minH="calc(100vh - 70px)"
              minW="100%"
              style={{ marginTop: 0 }}
            >
              {children}
            </Container>
          </VStack>
        </Box>
      </>
    );
  }
}
