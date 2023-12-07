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
import ActionButtons from "./ActionButtons";
import ModalBursa from "./ModalAddBursa";

const TABLE_ROWS = [
  "No.",
  "Role Pekerjaan",
  "Deskripsi Pekerjaan",
  "Persyaratan",
  "Batas Terakhir Tanggal",
  "Opsi",
  "Status",
];

const TABLE_SCHEMA = ["jobTitle", "description", "condition", "date"];

export default function Wrapper({
  jobs = [],
  reload,
}: {
  jobs: [] | any;
  reload: Function;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ModalBursa isOpen={isOpen} onClose={onClose} reload={reload} />
      <Box w="full" bg="white" borderRadius="3xl" p={8}>
        {/* <Button onClick={() => reload()}>Reload</Button> */}
        <Heading fontSize={30} mb={4}>
          Pengajuan Bursa Kerja
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
              Tambah Pengajuan
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
              </Tr>
            </Thead>
            <Tbody>
              {jobs.length >= 1 ? (
                jobs.map((apiItem: any, index: number) => (
                  <Tr
                    key={index}
                    bg={index % 2 === 0 ? "table_even" : "table_odd"}
                  >
                    <Td>
                      <Text>{index + 1}</Text>
                    </Td>
                    {TABLE_SCHEMA.map((item, index) => (
                      <Td key={index}>
                        {item === "date"
                          ? apiItem[item].split("T")[0]
                          : apiItem[item]}
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
                    <Td alignItems="center">
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
