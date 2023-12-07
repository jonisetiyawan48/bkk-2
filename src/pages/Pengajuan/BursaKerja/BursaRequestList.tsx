import {
  Progress,
  Box,
  useToast,
  Flex,
  Text,
  Button,
  Heading,
  Thead,
  Tr,
  Table,
  Th,
  Tbody,
  Td,
  useDisclosure,
  Badge,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { checkRole } from "../../../utils/helpers/checkRole";
import { requestLists } from "./fragments/apihandler";
import { useLocation } from "react-router-dom";
import DefaultImage from "../../../assets/images/default-image.png";
import { PlusCircle } from "react-feather";
import RoleOptions from "../../../components/RoleOptions";
import ActionButtons from "./fragments/ActionButtons";
import ModalAdd from "./fragments/ModalAddBursaRequestList";

const TABLE_ROWS = [
  "No.",
  "Nama Siswa",
  "Asal Instansi",
  "Keterangan",
  "Opsi",
  "Status",
];

const TABLE_SCHEMA = ["name", "agencyName", "description"];

export default function BursaBursaRequestList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const submissionId = useLocation().pathname.split("/")[4];

  const fetchApi = async () => {
    setLoading(true);
    let val = await requestLists(submissionId);
    setLoading(false);

    if (val?.status != "success") {
      toast({
        title: `Error ${val?.code ?? 500}`,
        description:
          val.message ??
          "Mohon maaf saat ini sedang ada masalah. Silahkan hubungi Customer Service atau tim Dev!",
        status: val?.code?.toString().match(/^\d/)[0] == 4 ? "warning" : "error",
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }

    setStudents(val.user);
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
        <ModalAdd
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          submissionId={submissionId}
          reload={fetchApi}
        />
        <Box w="full" bg="white" borderRadius="3xl" p={8}>
          <Heading fontSize={30} mb={4}>
            Pengajuan Bursa
          </Heading>
          {checkRole(["1"]) && (
            <Flex dir="row" justifyContent="space-between">
              <Button
                gap={3}
                p={6}
                borderRadius="20px"
                bg="teal_custom"
                color="white"
                fontWeight={500}
                colorScheme="teal_custompress"
                _hover={{ bg: "teal_customdarker" }}
                onClick={onOpen}
              >
                <PlusCircle />
                Tambah Siswa
              </Button>
            </Flex>
          )}
          <Box overflow="auto">
            <Table mt={4} bg="grey_bg">
              <Thead bg="table_head">
                <Tr>
                  {TABLE_ROWS.map((title, index) => (
                    <Th
                      textColor="white"
                      textTransform="capitalize"
                      fontWeight={500}
                      fontSize={15}
                      py={8}
                      key={index}
                    >
                      {title}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {students.length ? (
                  students.map((apiItem: any, index: number) => (
                    <Tr
                      key={index}
                      bg={index % 2 === 0 ? "table_even" : "table_odd"}
                    >
                      <Td>
                        <Text>{index+1}</Text>
                      </Td>
                      {TABLE_SCHEMA.map((item, index) => (
                        <Td key={index}>
                          <Text>{apiItem[item]}</Text>
                        </Td>
                      ))}
                      <Td>
                        <RoleOptions
                          submissionId={submissionId}
                          payload={apiItem}
                          page="request-list"
                          reload={fetchApi}
                        >
                          <ActionButtons
                            payload={{ ...apiItem, submissionId }}
                            reload={fetchApi}
                            page="request-list"
                          />
                        </RoleOptions>
                      </Td>
                      <Td>
                        <Badge
                          w="full"
                          textAlign="center"
                          bg={apiItem.approve ? "teal_custom" : "red_lighter"}
                          color="white"
                          textTransform="capitalize"
                          p={4}
                          borderRadius="20px"
                          fontWeight={500}
                          fontSize={15}
                        >
                          {apiItem.approve ? "Approved" : "Not Approved"}
                        </Badge>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={3}>
                      <h1>Belum ada data...</h1>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </>
    );
}
