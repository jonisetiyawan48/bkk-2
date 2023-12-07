import {
  Box,
  Table,
  Thead,
  Tbody,
  Heading,
  Flex,
  Button,
  Tr,
  Th,
  Td,
  Badge,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { PlusCircle } from "react-feather";
import RoleOptions from "../../../../components/RoleOptions";
import { checkRole } from "../../../../utils/helpers/checkRole";
import ActionButtons from "./ActionButtons/ActionButtons";
import AddModal from "./AddModal";

const TABLE_ROWS = [
  "No.",
  "Nama & Jenis kelamin",
  "NISN & Nomor telepon",
  "Asal sekolah & Jurusan",
  "Tanggal & status sertifikasi",
  "Opsi",
  "Status",
];

const TABLE_SCHEMA = [
  ["name", "gender"],
  ["nisn", "phone"],
  ["school", "program"],
  ["date", "status"],
];

export default function Tables({
  certs = [],
  reload,
}: {
  certs: [] | any;
  reload: Function;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <AddModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Box w="full" bg="white" borderRadius="3xl" p={8}>
        <Heading fontSize={30} mb={4}>
          Pengajuan Sertifikasi Online
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
              Tambah Sertifikasi
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
              {certs.length >= 1 ? (
                certs.map((apiItem: any, index: number) => (
                  <Tr
                    key={index}
                    bg={index % 2 === 0 ? "table_even" : "table_odd"}
                  >
                    <Td>
                      <Text>{index + 1}</Text>
                    </Td>
                    {TABLE_SCHEMA.map((item, index) => (
                      <Td key={index}>
                        <Text>
                          {item[0] === "date"
                            ? apiItem[item[0]].split("T")[0]
                            : apiItem[item[0]]}
                        </Text>
                        <Text>{apiItem[item[1]]}</Text>
                      </Td>
                    ))}
                    <Td>
                      <RoleOptions
                        submissionId={apiItem.submissionId}
                        reload={reload}
                      >
                        <ActionButtons payload={apiItem} reload={reload} />
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
