import {
  Progress,
  Box,
  useToast,
  Image,
  Flex,
  Text,
  VStack,
  Button,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { detailJob } from "./fragments/apihandler";
import { NavLink, useLocation, useParams } from "react-router-dom";
import DefaultImage from "../../../assets/images/default-image.png";
import { PlusCircle, Search } from "react-feather";
import { checkRole } from "../../../utils/helpers/checkRole";
import { isoToString } from "../../../utils/helpers/isoDateFormatter";

export default function DetailBursa() {
  const [job, setJob] = useState(Object);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const urlParam = useParams();
  const toast = useToast();

  const fetchApi = async () => {
    setLoading(true);
    let val = await detailJob(urlParam.id);
    setLoading(false);

    if (val?.status != "success") {
      toast({
        title: `Error ${val?.code ?? 500}`,
        description: val?.message ?? "Mohon maaf saat ini sedang ada masalah. Silahkan hubungi Customer Service atau tim Dev!",
        status: val?.code?.toString().match(/^\d/)[0] == 4 ? "warning" : "error",
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }

    setJob(val);
    return;
  };

  useEffect(() => {
    fetchApi();
  }, []);

  if (loading)
    return <Progress colorScheme="green" isIndeterminate size="xs" />;
  else
    return (
      <>
        <Box w="full" bg="white" borderRadius="3xl" p={{ base: 6, md: 8 }}>
          <Image
            maxH="700px"
            w="100%"
            src={job.imageUrl ?? DefaultImage}
            rounded={{ base: "xl", md: "2xl", xl: "3xl" }}
            objectFit="contain"
            mb={5}
          />
          <Flex
            mt={4}
            gap={{ base: 0, xl: 8 }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Box w={{ md: "40%" }}>
              <Box mb={5}>
                <Text fontSize={14} fontWeight="bold">
                  Judul
                </Text>
                <Text fontSize={12} my={2}>
                  {job.jobTitle}
                </Text>
              </Box>
              <Box mb={5}>
                <Text fontSize={14} fontWeight="bold">
                  Deskripsi
                </Text>
                <Text fontSize={12} my={2}>
                  {job.description}
                </Text>
              </Box>
              <Box mb={5}>
                <Text fontSize={14} fontWeight="bold">
                  Batas Akhir
                </Text>
                <Text fontSize={12} my={2}>
                  {isoToString(job.date)}
                </Text>
              </Box>
              <Box mb={5}>
                <Text fontSize={14} fontWeight="bold">
                  List Siswa yang diterima
                </Text>
                {job.user.length ? (
                  <OrderedList fontSize={12}>
                    {
                      job.user
                        .filter((val: any) => val.approve)
                        .map((item: any, index: any) => (
                          <ListItem key={index}>{item.name}</ListItem>
                        ))
                    }
                  </OrderedList>
                ) : (
                  <Text fontSize={12} my={2}>
                    Belum ada data
                  </Text>
                )}
              </Box>
            </Box>
            <VStack justifyContent="space-between" alignItems="start" flex={1}>
              <Box mb={5}>
                <Text fontSize={14} fontWeight="bold">
                  Tugas
                </Text>
                <Text fontSize={12} my={2}>
                  {job.jobTitle}
                </Text>
              </Box>

              <Flex w="100%" justifyContent="flex-end">
                <Box w={{ base: "100%", md: "unset" }}>
                  <NavLink to="request-list">
                    <Button
                      gap={3}
                      p={6}
                      borderRadius="20px"
                      bg="teal_custom"
                      color="white"
                      fontWeight={500}
                      w="100%"
                      colorScheme="red"
                      _hover={{ bg: "teal_customdarker" }}
                      onClick={() => {}}
                    >
                      {checkRole(["1"]) && <PlusCircle />}
                      {checkRole(["1"]) && "Tambah Siswa Diterima"}
                      {checkRole(["5"]) && <Search />}
                      {checkRole(["5"]) && "Lihat Daftar Siswa"}
                    </Button>
                  </NavLink>
                </Box>
              </Flex>
            </VStack>
          </Flex>
          {/* {JSON.stringify(job)} */}
        </Box>
      </>
    );
}
