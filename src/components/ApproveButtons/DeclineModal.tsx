import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Center,
  Icon,
  useToast,
  Flex,
} from "@chakra-ui/react";

import ApprovalVector from "../ApprovalVector";
import { declineSub } from "./approveapi";
import { Formik, Form } from "formik";
import { FetchMessageEdit } from "../../pages/Pengajuan/BursaKerja/fragments/FetchMessage";
import { approveRequestList } from "../../pages/Pengajuan/BursaKerja/fragments/apihandler";

export default function DeclineModal({
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

  const declineHandler = async (values: any, actions: any) => {
    let val =
      page == "request-list"
        ? await approveRequestList(payload, false)
        : await declineSub(values.submissionId);

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

    setCondition(val.status);
    setMessage(val.message);

    toast({
      description: val.message,
      status: "success",
      position: "bottom-right",
      variant: "left-accent",
      isClosable: true,
    });
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
              <ApprovalVector type="decline" />
            </Icon>
          </Center>
          <Text as="h3" fontSize={18} fontWeight={600} my={2}>
            Decline pengajuan?
          </Text>
          <Text as="h6" fontWeight={400}>
            Apa anda yakin menolak pengajuan ini?
          </Text>
          <FetchMessageEdit condition={fetchCondition} message={message} />
        </ModalBody>
        <ModalFooter justifyContent="center" px="0">
          <Formik
            initialValues={{
              param: payload,
            }}
            onSubmit={async (values, actions) => {
              await declineHandler(values.param, actions);
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
                    Tolak
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
