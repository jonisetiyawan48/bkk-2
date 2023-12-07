import {
  Image,
  Grid,
  GridItem,
  Heading,
  Text,
  Box,
  Container,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
// Icon
import UserGuruAktif from "../../../assets/vectors/user-guru-aktif.svg";
import UserTidakAktif from "../../../assets/vectors/user-tidak-aktif.svg";
import UserSiswaAktif from "../../../assets/vectors/user-siswa-aktif.svg";

// Role
import { checkRole } from "../../../utils/helpers/checkRole";

import Background from "../../../assets/vectors/bg-landing.svg";

import { fetchUsers } from "../api/apiHandler";

export default function Dashboard(props: any) {
  const [activeTeacher, setActiveTeacher] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [activeStudent, setActiveStudent] = useState([]);
  const [student, setStudent] = useState([]);
  const [activeUser, setActiveUser] = useState([]);
  const [headMaster, setHeadMaster] = useState([]);

  const teacherData = async () => {
    let data = await fetchUsers();
    const active = data.value.filter(function (i: any) {
      return i.roles == 2 && i.isActive == true;
    });
    setActiveTeacher(active);
    const inActive = data.value.filter(function (i: any) {
      return i.roles == 2 && i.isActive == false;
    });
    setTeacher(inActive);
  };

  const studentData = async () => {
    let data = await fetchUsers();
    const active = data.value.filter(function (i: any) {
      return i.roles == 3 && i.isActive == true;
    });
    setActiveStudent(active);
    const inActive = data.value.filter(function (i: any) {
      return i.roles == 3 && i.isActive == false;
    });
    setStudent(inActive);
  };

  const userData = async () => {
    let data = await fetchUsers()
    const active = data.value.filter(function (i: any) {
      return i.isActive == true;
    })
    
    const headMaster = data.value.filter(function (i: any) {
      return i.roles == 1 && i.isActive == true;
    });

    setActiveUser(active);
    setHeadMaster(headMaster);
  };

  useEffect(() => {
    if (props.unAuth) {
      const navbar = document.getElementsByTagName(
        "nav"
      ) as HTMLCollectionOf<HTMLElement>;
      navbar[1].style.backgroundColor = "#E00A08";

      const content = document.getElementsByClassName(
        "chakra-container"
      ) as HTMLCollectionOf<HTMLElement>;
      content[0].style.backgroundImage = `url(${Background})`;
      content[0].style.backgroundRepeat = "no-repeat";
      content[0].style.backgroundSize = "100%";
    }

    const html = document.getElementsByTagName(
      "html"
    ) as HTMLCollectionOf<HTMLElement>;
    html[0].style.overflowX = "hidden";

    teacherData();
    studentData();
    userData();
  }, []);

  const SuperTelkom = () => {
    return (
      <Grid h="200px" templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem colSpan={1}>
          <Box p="8" borderRadius="16" bg="purple.200">
            <Text paddingY="5">Jumlah Sekolah</Text>
            <Heading>{headMaster.length}</Heading>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box p="8" borderRadius="16" bg="papayawhip">
            <Text paddingY="5">Jumlah User Aktif</Text>
            <Heading>{activeUser.length}</Heading>
          </Box>
        </GridItem>
      </Grid>
    );
  };

  const Kepsek = () => {
    return (
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
        gap={4}
      >
        <GridItem colSpan={1}>
          <Box p="8" borderRadius="16" bg="purple.100">
            <Image src={UserGuruAktif} alt="user guru aktif" />
            <Box paddingY="5">
              <Text>User Guru</Text>
              <Text>Aktif</Text>
            </Box>
            <Heading>{activeTeacher.length}</Heading>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box p="8" borderRadius="16" bg="gray.300">
            <Image src={UserTidakAktif} alt="user guru aktif" />
            <Box paddingY="5">
              <Text>User Guru</Text>
              <Text>Tidak Aktif</Text>
            </Box>
            <Heading>{teacher.length}</Heading>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box p="8" borderRadius="16" bg="orange.100">
            <Image src={UserSiswaAktif} alt="user guru aktif" />
            <Box paddingY="5">
              <Text>User Siswa</Text>
              <Text>Aktif</Text>
            </Box>
            <Heading fontWeight={800}>{activeStudent.length}</Heading>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box p="8" borderRadius="16" bg="gray.300">
            <Image src={UserTidakAktif} alt="user guru aktif" />
            <Box paddingY="5">
              <Text>User Siswa</Text>
              <Text>Tidak Aktif</Text>
            </Box>
            <Heading>{student.length}</Heading>
          </Box>
        </GridItem>
      </Grid>
    );
  };

  return (
    <>
      {checkRole(["7", "5"]) ? (
        <SuperTelkom />
      ) : checkRole(["1"]) ? (
        <Kepsek />
      ) : null}

      <Container
        p="8"
        marginY={50}
        borderRadius="16"
        maxW="2xl"
        bg="white"
        centerContent
      >
        <Box maxW="md" textAlign="center">
          <Heading marginBottom="5">Selamat Datang Di Platform SMK TKJ</Heading>
          <Text>
            Selamat datang di website platform SMK TKJ, dapatkan fitur-fitur
            menarik untuk kebutuhan pendidikan maupun bisnis anda di bidang
            tekhnologi bersama Telkom Group.
          </Text>
        </Box>
      </Container>
    </>
  );
}
