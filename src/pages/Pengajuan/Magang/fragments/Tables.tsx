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
import Actions from "./ActionButtons/Actions";
import AddModal from "./AddModal";
import { provinceData } from "../../../../utils/provinceId";
import { checkRole } from "../../../../utils/helpers/checkRole";

const TABLE_ROWS = [
  "No.",
  "Tujuan Magang",
  "Tanggal Magang",
  "Lokasi",
  "Nama Guru",
  "Opsi",
  "Status",
];

const TABLE_SCHEMA = ["apprenticeshipPlace", "intershipDate", "place", "user"];

export default function Tables({
  interns = [],
  reload,
}: {
  interns: [] | any;
  reload: Function;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w="full" bg="white" borderRadius="3xl" p={8}>
      <AddModal
        isOpen={isOpen}
        onOpen={onOpen}
        reload={reload}
        onClose={onClose}
      />
      <Heading fontSize={30} mb={4}>
        Pengajuan Magang
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
            _hover={{ bg: 'teal_customdarker' }}
            onClick={onOpen}
          >
            <PlusCircle />
            Tambah Pengajuan
          </Button>
        </Flex>
      )}

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
            {interns.length >= 1 ? (
              interns.map((apiItem: any, index: number) => (
                <Tr
                  key={index}
                  bg={index % 2 === 0 ? "table_even" : "table_odd"}
                >
                  <Td>
                    <Text>{index+1}</Text>
                  </Td>
                  {TABLE_SCHEMA.map((item, index) => {
                    return (
                      <Td key={index}>
                        {(() => {
                          switch (item) {
                            case "intershipDate":
                              return apiItem[item].split("T")[0];
                            case "place":
                              return apiItem[item].province;
                            case "user":
                              return apiItem[item].map((currUser: any) => (
                                <Text my={1}>{currUser.name},</Text>
                              ));
                            default:
                              return apiItem[item];
                          }
                        })()}
                      </Td>
                    );
                  })}
                  <Td>
                    <RoleOptions
                      submissionId={apiItem.submissionId}
                      reload={reload}
                    >
                      <Actions payload={apiItem} reload={reload} />
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
  );
}
