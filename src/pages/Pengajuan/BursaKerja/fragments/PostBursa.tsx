import {
  Button,
  Box,
  useDisclosure,
  SimpleGrid,
  HStack,
  Text,
  VStack,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { PlusCircle, Delete, Trash, Trash2 } from "react-feather";
import { NavLink } from "react-router-dom";
import { checkRole } from "../../../../utils/helpers/checkRole";
import OnlineUsers from '../../../../components/Sidebar/OnlineUsers';
import ModalBursa from "./ModalAddBursa";
import ModalHapusBursa from "./ModalHapusBursa";
import { isoToString } from "../../../../utils/helpers/isoDateFormatter";
import DefaultImage from "../../../../assets/images/default-image.png";

export default function PostBursa({
  jobs = [],
  reload,
}: {
  jobs: [] | any;
  reload: Function;
}) {
  const addPost = useDisclosure();
  const deletePost = useDisclosure();
  let delete_payload = React.useRef({});

  return (
    <>
      <ModalBursa
        isOpen={addPost.isOpen}
        onClose={addPost.onClose}
        reload={reload}
      />
      <ModalHapusBursa
        isOpen={deletePost.isOpen}
        onClose={deletePost.onClose}
        payload={delete_payload.current}
        reload={reload}
      />
      <Grid 
        templateColumns={{
          base: "repeat(1, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={8}
      >
        <GridItem colSpan={{ base: 1, lg: 2, xl: 3 }} w="100%">
          {checkRole(["5"]) && (
            <Button
              gap={3}
              p={6}
              mb={6}
              borderRadius="20px"
              bg="teal_custom"
              color="white"
              fontWeight={500}
              colorScheme="red"
              _hover={{ bg: "teal_customdarker" }}
              onClick={addPost.onOpen}
            >
              <PlusCircle />
              Tambah Postingan
            </Button>
          )}
          {checkRole(["1"]) && <Box mb={6} h={6} />}
          <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)"}} gap={4}>
            {jobs.map((item: any, index: number) => (
              <Box
                borderRadius="3xl"
                h={60}
                backgroundImage={`url(${item?.imageUr ?? DefaultImage})`}
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                overflow="hidden"
                key={index}
              >
                <Flex
                  flexDirection="column"
                  p={5}
                  height="100%"
                  justifyContent="space-between"
                  bgGradient={'linear-gradient(#0000, blackAlpha.200, blackAlpha.500, blackAlpha.800)'}
                >
                  <Flex justifyContent="flex-end">
                    {checkRole(["5"]) && (
                      <Button
                        p={0}
                        borderRadius={8}
                        height={7}
                        width={7}
                        minW={7}
                        bg="delete_bg"
                        color="white"
                        _hover={{ bg: "delete_hover" }}
                        onClick={() => {
                          delete_payload.current = item;
                          deletePost.onOpen();
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </Flex>
                  <Flex
                    borderRadius="3xl"
                    // flexDirection={{ base: "column", md: "row" }}
                    bottom={0}
                    justifyContent="space-between"
                    alignItems="end"
                    placeItems="flex-end"
                    gap={4}
                  >
                    <Box>
                      <Text noOfLines={2} fontSize={14} color="white">
                        {item.jobTitle}
                      </Text>
                      <Text textColor="gray.300" fontSize={11}>{isoToString(item.createdAt)}</Text>
                    </Box>
                    <NavLink to={item.submissionId}>
                      <Button
                        px={5}
                        py={2}
                        w={{ base: "100%", xl: "unset" }}
                        borderRadius="3xl"
                        bg="red_lighter"
                        color="white"
                        fontWeight={500}
                        colorScheme="red"
                        fontSize={12}
                        _hover={{ bg: "red_darker" }}
                      >
                        Selengkapnya
                      </Button>
                    </NavLink>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Grid>
        </GridItem>
        <GridItem colSpan={1}>
          <OnlineUsers />
        </GridItem>
      </Grid>
    </>
  );
}
