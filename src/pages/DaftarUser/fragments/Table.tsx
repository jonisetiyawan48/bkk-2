import {
  Box,
  Table,
  Thead,
  Tbody,
  Heading,
  Button,
  Tr,
  Th,
  Td,
  useDisclosure,
  Flex,
  useToast,
} from "@chakra-ui/react";

import { USERS_LIST_ROLES } from "../../../utils/constants";

import { PlusCircle, Target } from "react-feather";
import AddModal from "./AddModal";
import Actions from "./Actions/Actions";
import { checkRole } from "../../../utils/helpers/checkRole";
import { activationUser, putUsers } from "../api/apihandler";
import { useState } from "react";
import { LOCAL_STORAGE_USER } from "../../../utils/constants";
import { getLocalStorage } from "../../../utils/helpers/localstorage";

const TABLE_ROWS = ["No", "Nama", "Email", "User Role", "Edit", "Status"];

const TABLE_SCHEMA = ["name", "email"];

type userItemType = Array<string>;

const credential = getLocalStorage(LOCAL_STORAGE_USER);

export default function UsersTable({
  userList,
  role,
  reload,
}: {
  role: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  userList: [] | any;
  reload: Function;
}) {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentData =
    role === 7
      ? userList
      : userList.filter(
          (ctx: any) => ctx.roles === USERS_LIST_ROLES[role].value
        );

  const handleActivation = async (userId: string, payload: boolean) => {
    const val = await activationUser(userId, payload);
    if (val?.status != "success") {
      toast({
        title: `Error ${val?.code ?? 500}`,
        description:
          val?.message ??
          "Mohon maaf saat ini sedang ada masalah. Silahkan hubungi Customer Service atau tim Dev!",
        status:
          val?.code?.toString().match(/^\d/)[0] == 4 ? "warning" : "error",
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }

    toast({
      description: `Sukses ${payload ? "diaktifkan" : "dinonaktifkan"}`,
      status: "success",
      position: "bottom-right",
      variant: "left-accent",
      isClosable: true,
    });
    reload();
    return;
  };

  return (
    <>
      {!checkRole(["7"]) && (
        <AddModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          role={role}
          reload={reload}
        />
      )}
      <Box w="full" bg="white" borderRadius="3xl" p={8}>
        <Heading fontSize={30} mb={4}>
          {role === 7
            ? "Daftar User"
            : `Daftar ${USERS_LIST_ROLES[role].label}`}
        </Heading>
        {!checkRole(["7"]) && (
          <Flex dir="row" justifyContent="space-between">
            <Button
              gap={3}
              p={6}
              borderRadius="20px"
              bg="teal_custom"
              color="white"
              fontWeight={500}
              colorScheme="teal"
              _hover={{ bg: "teal_customdarker" }}
              onClick={onOpen}
            >
              <PlusCircle />
              Tambah Data
            </Button>
          </Flex>
        )}
        {/* TABLE */}
        <Box overflow="auto">
          <Table mt={6} bg="grey_bg">
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
                {checkRole(["7"]) && (
                  <Th
                    textColor="white"
                    textTransform="capitalize"
                    fontWeight={500}
                    fontSize={15}
                    py={8}
                  >
                    Pilihan Opsi
                  </Th>
                )}
              </Tr>
            </Thead>
            <Tbody>
              {currentData.length >= 1 ? (
                currentData.map((apiItem: any, index: number) => (
                  <Tr
                    key={index}
                    bg={index % 2 === 0 ? "table_even" : "table_odd"}
                  >
                    <Td>{index + 1}</Td>
                    {TABLE_SCHEMA.map((item: any, index) => (
                      <Td key={index}>{apiItem[item]}</Td>
                    ))}
                    <Td>{USERS_LIST_ROLES[apiItem.roles].label}</Td>
                    <Td>{<Actions payload={apiItem} reload={reload} />}</Td>
                    <Td>{apiItem.isActive ? "Aktif" : "Non Aktif"}</Td>
                    {checkRole(["7"]) && (
                      <Td>
                        <Flex direction="row" gap={4}>
                          <Button
                            colorScheme="teal"
                            bg="teal_custom"
                            fontWeight={500}
                            rounded={13}
                            onClick={() =>
                              handleActivation(apiItem.userId, true)
                            }
                          >
                            Aktifkan
                          </Button>
                          <Button
                            colorScheme="red"
                            bg="red_lighter"
                            fontWeight={500}
                            rounded={13}
                            onClick={() =>
                              handleActivation(apiItem.userId, false)
                            }
                          >
                            Nonaktifkan
                          </Button>
                        </Flex>
                      </Td>
                    )}
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
