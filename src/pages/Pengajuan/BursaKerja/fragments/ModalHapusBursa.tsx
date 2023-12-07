import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Text,
  Center,
  Icon,
  useToast,
  Flex,
} from "@chakra-ui/react";
import DeleteVector from "../../../../components/DeleteVector";
import { deletetRequestList, deleteJobs } from "./apihandler";
import { Formik, Form } from "formik";
import { FetchMessageDelete } from "./FetchMessage";

export default function ModalHapusBursa({
  isOpen,
  onOpen,
  onClose,
  payload,
  page,
  reload,
}: any) {
  const [fetchCondition, setCondition] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();

  useEffect(() => {
    setCondition("");
    setMessage("");
  }, []);

  const deleteHandler = async (values: any, actions: any) => {
    let val = page == 'request-list' ? await deletetRequestList(payload) : await deleteJobs(values);

    if (val?.status != "success") {
      toast({
        title: `Error ${val?.code ?? 500}`,
        description: val?.message ?? 'Mohon maaf saat ini sedang ada masalah. Silahkan hubungi Customer Service atau tim Dev!',
        status: val?.code?.toString().match(/^\d/)[0] == 4 ? "warning" : "error",
        position: "bottom-right",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    }

    setCondition(val.status);
    setMessage(val.message);

    actions.resetForm();
    setTimeout(() => onClose(), 500);
    setTimeout(() => reload(), 1000);
    return;
  };

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent maxW={{ base: "87.5vw", sm: "xl" }} py={4} borderRadius="3xl">
        <ModalBody alignItems="center" textAlign="center">
          <Center>
            <Icon
              width="201"
              height="200"
              viewBox="0 0 201 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <DeleteVector />
            </Icon>
          </Center>
          <Text as="h3" fontSize={18} fontWeight={600} my={2}>
            Hapus {page == 'request-list' ? "User" : "Bursa Kerja"}
          </Text>
          <FetchMessageDelete condition={fetchCondition} message={message} />
          <Text as="h6" fontWeight={400}>
            Apa anda yakin ingin menghapus {page == 'request-list' ? "siswa dari " : ""}data bursa kerja ini?
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="center" px="0">
          <Formik
            initialValues={{
              param: payload?.submissionId,
            }}
            onSubmit={async (values, actions) => {
              await deleteHandler(values.param, actions);
            }}
          >
            {(props) => (
              <Form>
                <Flex justifyContent="center">
                  <Button
                    variant="outline"
                    px="10%"
                    colorScheme="red"
                    mr={3}
                    onClick={onClose}
                    borderRadius="full"
                    fontWeight={500}
                    minW="120px"
                  >
                    Batal
                  </Button>
                  <Button
                    isLoading={props.isSubmitting}
                    type="submit"
                    px="10%"
                    borderRadius="full"
                    colorScheme="red"
                    shadow="0 0 20px rgba(231, 0, 0, 20%)"
                    fontWeight={500}
                    minW="120px"
                  >
                    Hapus
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
