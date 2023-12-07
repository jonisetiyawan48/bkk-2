import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Grid,
  GridItem,
  Box,
  Container,
  FormControl,
  Input,
  Button,
  Heading,
  Textarea,
  FormErrorMessage,
  FormLabel,
  useToast,
  Flex,
  Select,
} from "@chakra-ui/react";

import { Formik, Field, Form } from "formik";

import { ValidateName } from "./validator";
import { postRequestLists, putJobs } from "./apihandler";
import { FetchMessageEdit } from "./FetchMessage";
import { fetchUsers } from "../../../Beranda/api/apiHandler";

export default function ModalAdd({
  isOpen,
  onOpen,
  onClose,
  submissionId,
  reload,
}: any) {
  const [fetchCondition, setCondition] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [users, setList] = useState([]);
  const toast = useToast();

  const fetchStudents = async () => {
    setLoading(true);
    let val = await fetchUsers();
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

    setList(val.value);
    return;
  };

  const postHandler = async (values: any, actions: any) => {
    delete values.agencyName;
    let val = await postRequestLists(submissionId, values);

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

  useEffect(() => {
    setCondition("");
    setMessage("");
    fetchStudents();
  }, []);

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      blockScrollOnMount={false}
      motionPreset="scale"
      size="xl"
    >
      <ModalOverlay />
      <ModalContent
        maxW={{ base: "87.5vw", sm: "xl" }}
        py={4}
        borderRadius="3xl"
      >
        <ModalBody>
          <Heading fontSize={20}>Tambah Data Siswa</Heading>
          <FetchMessageEdit condition={fetchCondition} message={message} />
          <Formik
            enableReinitialize
            initialValues={{
              name: "",
              agencyName: "",
              description: "",
            }}
            onSubmit={async (values, actions) => {
              await postHandler(values, actions);
            }}
          >
            {(props) => (
              <Form>
                <Container gridTemplateRows="repeat(2,1fr)" p={0}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
                    <GridItem colSpan={2}>
                      <Field name="name" validate={ValidateName}>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel>Nama Lengkap</FormLabel>
                            <Select
                              variant="outline"
                              {...field}
                              id="name"
                              borderRadius="20px"
                              focusBorderColor="red_darker"
                              textColor={loading && "gray.400"}
                              required
                            >
                              {loading ? (
                                <option disabled>Loading...</option>
                              ) : (
                                users
                                  .filter((user: any) => user.name)
                                  .map((user: any, index: any) => (
                                    <option value={user.name}>
                                      {user.name}
                                    </option>
                                  ))
                              )}
                            </Select>
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Field name="description">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.description &&
                              form.touched.description
                            }
                          >
                            <FormLabel>Deskripsi</FormLabel>
                            <Textarea
                              {...field}
                              id="description"
                              type="text"
                              placeholder="Deskripsi"
                              borderRadius="20px"
                              focusBorderColor="red_darker"
                            />
                            <FormErrorMessage>
                              {form.errors.description}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                  </Grid>
                </Container>
                <Flex gap={3} justifyContent="flex-end" mt={5}>
                  <Button
                    variant="outline"
                    px="10%"
                    borderColor="teal_custom"
                    color="teal_custom"
                    borderRadius="full"
                    fontWeight={500}
                    minW="120px"
                    onClick={onClose}
                  >
                    Batal
                  </Button>
                  <Button
                    isLoading={props.isSubmitting}
                    type="submit"
                    px="10%"
                    borderRadius="full"
                    bg="teal_custom"
                    _hover={{ bg: "teal_customdarker" }}
                    colorScheme="teal"
                    fontWeight={500}
                    minW="120px"
                  >
                    Tambah
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
